import axios from "axios";
// import { auth, googleProvider } from "@/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebaseConfig";

// Existing API calls
export function UserSignUp(signUpData: any) {
  let BaseUrl = "http://127.0.0.1:5000/user/signup";
  return axios.post(BaseUrl, signUpData).then((response) => {
    return response.data;
  });
}

export function UserSignIn(data: any) {
  let BaseUrl = "http://127.0.0.1:5000/user/signin";
  return axios.post(BaseUrl, data).then((response) => {
    return response.data;
  });
}

// New Firebase functions
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In failed:", error);
    throw error;
  }
};

export const signUpWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // You might want to create a new user in your backend if needed
    return result.user;
  } catch (error) {
    console.error("Google Sign-Up failed:", error);
    throw error;
  }
};
