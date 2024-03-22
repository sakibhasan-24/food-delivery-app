import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import handleUploadImage from "../../../helper/imageUpload";
import useUser from "../../../hooks/useUser";
import { toast } from "react-toastify";
import {
  updateUserStart,
  updateUserSuccess,
} from "../../../redux/user/userSlice";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  console.log(currentUser);
  const { userUpdate, loading } = useUser();
  const [imageUrl, setImageUrl] = useState(null);
  const [formData, setFormData] = useState({});
  const imageChange = async (e) => {
    const image = e.target.files[0];
    console.log(image);
    try {
      const url = await handleUploadImage(image);
      setImageUrl(url);
      setFormData({ ...formData, profilePicture: url });
    } catch (error) {
      console.log(error);
    }
  };
  const handleFormData = async (e) => {
    // e.prventDefault();

    dispatch(updateUserStart());
    e.preventDefault();
    // if(formData.keys.length===0){

    // }
    if (Object.keys(formData).length === 0) {
      return toast.success("Nothing to change here");
    }
    const response = await userUpdate(formData);
    console.log(response.updatedUser);
    if (response.success && Object.keys(formData).length !== 0) {
      dispatch(updateUserSuccess(response?.updatedUser));
      toast.success("Profile updated successfully");
    }
  };

  // console.log(currentUser?.profilePicture);
  return (
    <div className="my-12 w-full sm:max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Profile</h1>
      <div>
        <form
          onSubmit={handleFormData}
          className="max-w-xl flex flex-col items-center justify-center"
        >
          <div>
            <input type="file" ref={fileRef} hidden onChange={imageChange} />
            <img
              src={imageUrl || currentUser?.profilePicture}
              alt="image"
              onChange={imageChange}
              onClick={() => fileRef.current.click()}
              className="w-[60px] cursor-pointer h-[60px] rounded-full object-cover border-4 border-white"
            />
          </div>
          <input
            type="text"
            defaultValue={currentUser?.userName}
            className="w-full rounded-md p-2 text-black font-semibold mt-4"
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
            }
          />
          <input
            type="email"
            defaultValue={currentUser?.email}
            className="w-full rounded-md p-2 text-black font-semibold mt-4"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="************"
            className="w-full rounded-md p-2 text-black font-semibold mt-4"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <input
            type="submit"
            value="update"
            className="my-6 w-full px-1 py-2 font-semibold  text-xl rounded-lg cursor-pointer  bg-green-800 hover:bg-green-600"
          />
        </form>
      </div>
    </div>
  );
}
