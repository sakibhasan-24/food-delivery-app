import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
// import { FileInput } from "flowbite-react";
import { FileInput } from "flowbite-react";
import { FaTrash } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import app from "../../../firebase/firebase.config";
import Spinner from "../../../component/spinner/Spinner";
import useCreateItem from "../../../hooks/useCreateItem";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const categoryItems = [
  "appetizer",
  "main-course",
  "dessert",
  "soup",
  "salad",
  "side-dish",
  "couple-package",
  "family-package",
  "student-package",
  "breakfast",
  "lunch",
  "dinner",
  "snack",
  "drink",
  "spice",
];
// console.log(categoryItems);
export default function AddMenu() {
  const { currentUser } = useSelector((state) => state.user);
  const [ingredientsInput, setIngredientsInput] = useState(1);
  const [imageUploadingLoading, setImgaeUploadLoading] = useState(false);
  const [imagesFiles, setImagesFiles] = useState([]);
  const [imageMessageError, setImageMessageError] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  //   console.log(imagesFiles.length);

  const { createItem, setItem, errorCreate: error, loading } = useCreateItem();
  const [ingredientItem, setIngredientItem] = useState([]);
  const [isOffer, setIsOffer] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    offer: "no",

    offerPrice: 0,
    price: 0,
    category: "",
    ingredients: ingredientItem,
    image: [],
    description: "",
  });

  const handleFormData = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("ingredients-")) {
      const index = parseInt(name.split("-")[1]);
      // console.log(index);
      const newIngredientItem = [...ingredientItem];
      newIngredientItem[index] = value;
      setIngredientItem(newIngredientItem);
      setFormData({ ...formData, ingredients: newIngredientItem });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  //   console.log(formData);

  useEffect(() => {
    setIsOffer(formData.offer === "yes" ? true : false);
  }, [formData?.offer]);
  const uploadImage = () => {
    setImgaeUploadLoading(true);
    setImageMessageError(false);
    if (
      imagesFiles.length > 0 &&
      imagesFiles.length + formData.image.length < 7
    ) {
      const promises = [];
      for (let i = 0; i < imagesFiles.length; i++) {
        promises.push(storeImage(imagesFiles[i]));
      }
      Promise.all(promises)
        .then((url) => {
          setFormData({
            ...formData,
            image: formData.image.concat(url),
          });
          setImageMessageError(false);
        })
        .catch((e) => {
          setImageMessageError(
            "image upload failed,need less than 2 mb per images"
          );
        });
    } else {
      setImageMessageError("Maximum 6 images allowed and less than 2 mb");
    }
    // setImageMessageError(false);
    setImgaeUploadLoading(false);
  };
  const storeImage = (files) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + files.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, files);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.trunc(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setImageUploadProgress(progress);
          // setUploadProgress(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            //   console.log("File available at", downloadURL);
            resolve(downloadURL);
            setImageMessageError(false);
          });
        }
      );
    });
  };

  const handleImageDelete = (id) => {
    const newImagesFiles = formData.image.filter((item, index) => index !== id);
    setImagesFiles(newImagesFiles);
    setFormData({ ...formData, image: newImagesFiles });
  };
  // console.log(imageMessageError);
  if (imageUploadProgress > 0 && imageUploadProgress < 100) {
    return <Spinner />;
  }
  const handleCreateItem = async (e) => {
    e.preventDefault();
    // console.log(formData);
    const items = {
      ...formData,
      userId: currentUser?._id,
      userEmail: currentUser?.email,
      isOffer: isOffer,
      offerPercentage: isOffer && formData.offerPrice,
    };
    console.log(items);
    const result = await createItem(items);
    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Item Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    // console.log("result", result);
  };
  // console.log(formData);

  return (
    <div
      className={`w-full mx-auto opa rounded-md  bg-slate-800 ${
        imageUploadProgress > 0 && imageUploadProgress < 100 && "opacity-25"
      }`}
    >
      <h1 className=" font-semibold text-center text-4xl ">
        Add <span className="text-amber-600 font-bold font-serif">Items</span>
      </h1>
      <div>
        <div>
          <form
            onSubmit={handleCreateItem}
            className="w-full  p-6 my-10  mx-auto"
          >
            <div
              className={`flex flex-row gap-2 ${isOffer && "justify-evenly"}`}
            >
              <div
                className={`w-full 
                  ${isOffer ? "w-full " : "sm:w-2/3"}
                 mb-4 flex flex-col gap-2`}
              >
                <label
                  htmlFor="name"
                  className="block text-gray-200 text-md font-semibold"
                >
                  item Name
                </label>
                <input
                  placeholder="item name"
                  type="text"
                  name="name"
                  id="name"
                  className="w-full  text-orange-800 bg-slate-50 focus:border-0 rounded-lg px-2 py-2  border-gray-200 border-2"
                  onChange={handleFormData}
                />
              </div>
              <div
                className={`w-full 
                  ${
                    isOffer ? "w-full " : "sm:w-3/4"
                  }  mb-4 flex flex-col gap-2`}
              >
                <label
                  htmlFor="name"
                  className="block text-gray-200 text-md font-semibold"
                >
                  offer
                </label>
                <select
                  id="offer"
                  name="offer"
                  value={formData.offer}
                  onChange={handleFormData}
                  className={`${
                    isOffer ? "w-full " : "sm:w-1/4"
                  }  text-orange-800 bg-slate-50 focus:border-0 rounded-lg px-2 py-2  border-gray-200 border-2`}
                >
                  <option disabled value="select offer">
                    select offer
                  </option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              {isOffer && (
                <div className="w-full flex flex-col gap-2">
                  <div className="w-full sm:w-2/5 flex flex-col gap-2">
                    <label
                      htmlFor="offerPrice"
                      className="block text-gray-200 text-md font-semibold"
                    >
                      offer Price
                    </label>
                  </div>
                  <div>
                    <select
                      name="offerPrice"
                      id="offerPrice"
                      onChange={handleFormData}
                      className="w-full   text-orange-800 bg-slate-50 focus:border-0 rounded-lg px-2 py-2  border-gray-200 border-2"
                    >
                      <option value="select offer">select offer</option>
                      <option value="5">5%</option>
                      <option value="10">10%</option>
                      <option value="15">15%</option>
                      <option value="20">20%</option>
                      <option value="25">25%</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
            <div className="w-full  flex flow-row sm:flex-row gap-2">
              <div className="w-full sm:w-2/5 flex flex-col gap-2">
                <label
                  htmlFor="price"
                  className="block text-gray-200 text-md font-semibold"
                >
                  Price
                </label>
                <input
                  onChange={handleFormData}
                  placeholder="price"
                  type="number"
                  name="price"
                  id="price"
                  className="w-full  text-orange-800 bg-slate-50 focus:border-0 rounded-lg px-2 py-2  border-gray-200 border-2"
                />
              </div>
              <div className="w-full sm:w-2/5 flex flex-col gap-2">
                <label
                  htmlFor="category"
                  className="block text-gray-200 text-md font-semibold"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  onChange={handleFormData}
                  value={formData.category}
                  className="w-full   text-orange-800 bg-slate-50 focus:border-0 rounded-lg px-2 py-2  border-gray-200 border-2"
                >
                  <option value="select category">select category</option>
                  {categoryItems.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full  flex flow-row sm:flex-row gap-2">
              <div className="w-full sm:w-3/4 flex flex-col gap-2">
                <label
                  htmlFor="ingredients"
                  className="block text-gray-200 text-md font-semibold"
                >
                  Ingredients
                </label>
                {[...Array(ingredientsInput)].map((_, index) => (
                  <div key={index} className="flex flex-row gap-2 ">
                    <input
                      type="text"
                      placeholder={`ingredient ${index + 1}`}
                      id={`ingredients-${index}`}
                      name={`ingredients-${index}`}
                      className="w-2/3  text-orange-800 bg-slate-50 focus:border-0 rounded-lg px-2 py-2  border-gray-200 border-2"
                      onChange={handleFormData}
                    />
                    {index === ingredientsInput - 1 && (
                      <div
                        type="button"
                        className="bg-slate-700 w-[60px] flex items-center justify-between text-slate-50 font-bold py-1 px-2 rounded-lg"
                      >
                        <span
                          onClick={() =>
                            setIngredientsInput(ingredientsInput + 1)
                          }
                          className="cursor-pointer text-2xl hover:text-orange-500"
                        >
                          +
                        </span>
                        {ingredientsInput > 1 && (
                          <span
                            onClick={() =>
                              setIngredientsInput(ingredientsInput - 1)
                            }
                            className="cursor-pointer text-2xl hover:text-red-500"
                          >
                            -
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full  flex flow-row sm:flex-row gap-2">
              <div className="w-full sm:w-3/4 flex flex-col gap-2">
                <label
                  htmlFor="description"
                  className="block text-gray-200 text-md font-semibold"
                >
                  description
                </label>
                <textarea
                  className="w-full  text-orange-800 bg-slate-50 focus:border-0 rounded-lg px-2 py-2  border-gray-200 border-2"
                  placeholder="description"
                  name="description"
                  id="description"
                  rows={4}
                  cols={50}
                  onChange={handleFormData}
                />
              </div>
            </div>
            <div className="border-2 my-6 p-6 border-dashed rounded-lg border-orange-700">
              <div className="w-full flex flex-col gap-2">
                <p>upload Image</p>
              </div>
              <div className="w-full flex flex-col gap-2">
                <FileInput
                  type="file"
                  id="image"
                  name="image"
                  className="w-full "
                  multiple
                  accept="image/*"
                  onChange={(e) => setImagesFiles(e.target.files)}
                />
                <button
                  type="button"
                  className="w-full bg-slate-900 py-2 px-2 rounded-lg text-white"
                  onClick={uploadImage}
                  disabled={loading || (imageUploadingLoading ? true : false)}
                >
                  {loading ||
                    (imageUploadingLoading ? "loading......." : "upload image")}
                </button>
                {imageUploadProgress > 0 && imageUploadProgress < 100 && (
                  <p className="text-xl font-semibold text-center text-orange-700">
                    {imageUploadProgress}% uploaded
                  </p>
                )}
                {imageUploadProgress === 100 && formData.image.length > 0 && (
                  <p className="text-xl font-semibold text-center text-green-700">
                    image uploaded successfully
                  </p>
                )}
                {formData.image.length === 0 && ""}
                <div className="flex gap-1 flex-nowrap ">
                  {formData.image.map((image, idx) => (
                    <div key={idx} className=" flex   gap-2">
                      <div className="relative">
                        <img
                          src={image}
                          alt=""
                          className="w-[100px]  h-[100px]"
                        />
                        <FaTrash
                          onClick={() => handleImageDelete(idx)}
                          className="absolute right-2 top-2 text-slate-50 text-2xl cursor-pointer"
                        />
                      </div>
                    </div>
                  ))}
                  {imageMessageError && (
                    <p className="text-red-900 text-center">
                      {imageMessageError}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <input
              type="submit"
              value={`${loading ? "creating..." : "create items"} `}
              className="w-full bg-slate-700 text-white py-2 px-2 rounded-lg cursor-pointer hover:bg-slate-500"
            />

            {/*  */}
          </form>
        </div>
      </div>
    </div>
  );
}
