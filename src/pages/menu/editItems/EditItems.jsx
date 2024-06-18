import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { FileInput } from "flowbite-react";
import { FaTrash } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import app from "../../../firebase/firebase.config";
import Spinner from "../../../component/spinner/Spinner";
import { useParams } from "react-router-dom";
import useApiCall from "../../../hooks/api/useApiCall";
import useCreateItem from "../../../hooks/useCreateItem";

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
// console.log(ingredientsItem);
export default function EditItems() {
  const { id } = useParams();
  // console.log(id);
  const [item, setItem] = useState([]);
  const axiosPublic = useApiCall();
  const { updateItem } = useCreateItem();
  const [ingredientsInput, setIngredientsInput] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [imagesFiles, setImagesFiles] = useState([]);
  const [imageMessageError, setImageMessageError] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  //   console.log(imagesFiles.length);

  const [ingredientItem, setIngredientItem] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    offer: "no",
    offerPrice: 0,
    price: "",
    category: "",
    ingredients: ingredientItem,
    image: [],
    description: "",
  });
  useEffect(() => {
    const callApi = async () => {
      const res = await axiosPublic.get(`/api/food/get-items?itemId=${id}`);
      setFormData(res.data.items[0]);
      setItem(res.data.items[0]);
    };
    callApi();
  }, [id]);
  // console.log(formData.isOffer);
  // console.log(formData);
  const handleFormData = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("ingredients-")) {
      const index = parseInt(name.split("-")[1]);
      console.log(index);
      const newIngredientItem = [...ingredientItem];
      newIngredientItem[index] = value;
      setIngredientItem(newIngredientItem);
      setFormData({ ...formData, ingredients: newIngredientItem });
    } else {
      console.log(name, value);
      setFormData({ ...formData, [name]: value });
    }
  };

  const [isOffer, setIsOffer] = useState(false);

  useEffect(() => {
    setIsOffer(formData.offer === "yes" ? true : false);
  }, [formData?.offer]);
  const uploadImage = () => {
    // console.log("image....");
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
  const handleEdit = async (e) => {
    e.preventDefault();
    const updatedFormData = { ...formData, isOffer: isOffer ? "yes" : "no" };
    if (isOffer) {
      updatedFormData.offerPrice = formData.offerPrice;
    }
    console.log("Updated Form Data:", updatedFormData); // Add this line
    const res = await updateItem(id, updatedFormData);
    console.log("Response from backend:", res); // Add this line
  };

  if (imageUploadProgress > 0 && imageUploadProgress < 100) {
    return <Spinner />;
  }
  if (!item) {
    return <Spinner />;
  }
  return (
    <div
      className={`w-full mx-auto opa rounded-md  bg-slate-800 ${
        imageUploadProgress > 0 && imageUploadProgress < 100 && "opacity-25"
      }`}
    >
      <h1 className=" font-semibold text-center text-4xl ">
        Update{" "}
        <span className="text-amber-600 font-bold font-serif">Items</span>
      </h1>
      <div>
        <div>
          <form onSubmit={handleEdit} className="w-full  p-6 my-10  mx-auto">
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
                  defaultValue={formData.name}
                  className="w-full  text-orange-800 bg-slate-50 focus:border-0 rounded-lg px-2 py-2  border-gray-200 border-2"
                  onChange={handleFormData}
                />
              </div>
              {/* <div
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
                  defaultValue={item.isOffer}
                  onChange={handleFormData}
                  className={`${
                    item.isOffer ? "w-full " : "sm:w-1/4"
                  }  text-orange-800 bg-slate-50 focus:border-0 rounded-lg px-2 py-2  border-gray-200 border-2`}
                >
                  <option disabled value="select offer">
                    select offer
                  </option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div> */}
              {/* {item.isOffer && (
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
                      value={item.offerPercentage}
                      onChange={handleFormData}
                      className="w-full   text-orange-800 bg-slate-50 focus:border-0 rounded-lg px-2 py-2  border-gray-200 border-2"
                    >
                      <option value="select offer">select offer</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                      <option value="25">25</option>
                    </select>
                  </div>
                </div>
              )} */}
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
                  defaultValue={formData?.price}
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
                  // defaultValue={formData.category}
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
              {/* <div className="w-full sm:w-3/4 flex flex-col gap-2">
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
              </div> */}
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
                  defaultValue={formData.description}
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
                >
                  Upload Image
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
                {formData?.image?.length === 0 && ""}
                <div className="flex gap-1 flex-nowrap ">
                  {formData?.image?.map((image, idx) => (
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
              value={`Update items`}
              className="w-full bg-slate-700 text-white py-2 px-2 rounded-lg cursor-pointer hover:bg-slate-500"
            />

            {/*  */}
          </form>
        </div>
      </div>
    </div>
  );
}
