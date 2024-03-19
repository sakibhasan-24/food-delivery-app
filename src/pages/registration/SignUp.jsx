import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase/firebase.config";
// import useApiCall from "../../hooks/api/useApiCall";
import useAuth from "../../hooks/useAuth";
import GoogleSignUp from "../../component/GoogleSignUp";
export default function SignUp() {
  const { userLoading, userSignUp } = useAuth();
  const [formData, setFormData] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  //   console.log(formData);
  const handleImageUpload = async (e) => {
    // console.log("hello");
    // console.log(e.target.files[0]);
    const image = e.target.files[0];
    // const formData = new FormData();
    // formData.append("image", image);
    const storage = getStorage(app);
    const imageName = image.name + new Date().getTime();
    const storageRef = ref(storage, imageName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    // uploadTask.on();
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // if (imageUrl) {
        //   setUploadProgress(0);
        // }
        setUploadProgress(progress);
        // console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //   console.log("File available at", downloadURL);

          //   console.log("from", imageUrl);
          setFormData({ ...formData, image: downloadURL });
          setImageUrl(downloadURL);
        });
      }
    );
  };

  //   console.log(imageUrl);
  console.log(formData);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // const user = {
    //   userName: formData.name,
    //   email: formData.email,
    //   profilePicture: formData.image,
    //   password: formData.password,
    // };
    // console.log(user);
    const userInfo = await userSignUp(formData);
    // console.log(userInfo);
  };
  return (
    <div className="w-full sm:max-w-2xl mx-auto p-6 sm:p-12">
      <h1 className="font-semibold text-3xl text-slate-300 tracking-widest text-center">
        Please Sign UP
      </h1>
      <div>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-300"
            >
              Name
            </label>
            <div className="mt-1">
              <input
                placeholder="name"
                required
                type="text"
                id="userName"
                // onChange={handleInputChange}
                onChange={(e) =>
                  setFormData({ ...formData, userName: e.target.value })
                }
                className="w-full mt-1 px-3 py-2 placeholder-slate-300 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-300"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                placeholder="email"
                required
                type="email"
                id="email"
                // onChange={handleInputChange}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full mt-1 px-3 py-2 placeholder-slate-300 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-300"
            >
              password
            </label>
            <div className="mt-1">
              <input
                placeholder="password"
                required
                type="password"
                id="password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                // onChange={handleInputChange}
                className="w-full mt-1 px-3 py-2 placeholder-slate-300 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              />
            </div>
          </div>
          <input
            // onChange={handleInputChange}
            onChange={handleImageUpload}
            id="image"
            name="image"
            type="file"
            className="my-6"
          />

          <div>
            {uploadProgress > 0 && uploadProgress < 100 && (
              <p className="text-center text-teal-400">
                image uploading {uploadProgress} %
              </p>
            )}
            {uploadProgress === 100 && imageUrl && (
              <p className="text-center text-green-600">image uploaded</p>
            )}
            {imageUrl && (
              <img src={imageUrl} alt="image" className="w-[80px] h-[80px]" />
            )}
            {imageUrl && (
              <p
                className="text-4xl cursor-pointer"
                onClick={() => setImageUrl(null)}
              >
                ❌
              </p>
            )}
          </div>
          <input
            type="submit"
            value={"signUp"}
            className="w-full bg-slate-700 rounded-md px-4 py-2 font-bold text-slate-50  hover:bg-slate-600 cursor-pointer"
          />
          <GoogleSignUp />
        </form>
      </div>
    </div>
  );
}
