import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase/firebase.config";
export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  //   console.log(formData);
  const handleImageUpload = async (e) => {
    // console.log("hello");
    // console.log(e.target.files[0]);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
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
        if (imageUrl) {
          setUploadProgress(0);
        }
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
          setImageUrl(downloadURL);
          setFormData({ ...formData, image: imageUrl });
        });
      }
    );
  };

  console.log(formData);
  //   useEffect(() => {
  //     //   setFormData({ ...formData, image: imageUrl });
  //     handleImageUpload();
  //   }, []);
  const handleFormSubmit = (e) => {
    e.preventDefault();
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
                id="name"
                name="name"
                // onChange={handleInputChange}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
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
                name="email"
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
                name="password"
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
        </form>
      </div>
    </div>
  );
}
