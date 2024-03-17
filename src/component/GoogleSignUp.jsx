import React, { useState } from "react";
import app from "../firebase/firebase.config";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import useAuth from "../hooks/useAuth";
import { logInSuccess } from "../redux/user/userSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function GoogleSignUp() {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const { googleSignIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const googleProvider = new GoogleAuthProvider();
  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      //   console.log(result.user);
      // save in db
      const userInfo = {
        userName: result?.user?.displayName,
        email: result?.user?.email,
        profilePicture: result?.user?.photoURL,
      };
      const response = await googleSignIn(userInfo);
      //   console.log(response);
      if (response.success) {
        Swal.fire({
          title: "welcome back",
          text: "you have successfully logged in",
          timer: 1500,
        });
      }
      dispatch(logInSuccess(response.user));
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <button
        onClick={handleGoogleSignUp}
        type="button"
        disabled={loading}
        className="w-full px-4 py-2 bg-green-800 text-white font-bold rounded-md"
      >
        {loading ? "loading............" : " Sign In With Google"}
      </button>
    </div>
  );
}
