// useFirebase.js
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import initializeFirebase from "../Shared/Firebase/firebase.init";

// Initialize Firebase once
initializeFirebase();

const useFirebase = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const auth = getAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // 🔹 Google Sign-In
  const googleSignIn = async (navigate) => {
    const provider = new GoogleAuthProvider();
    setIsLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);

      if (!result.user) {
        Swal.fire("Error", "Google Sign-In failed: no user returned", "error");
        setIsLoading(false);
        return;
      }

      const userData = {
        displayName: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid,
      };

      // Only Gmail allowed
      if (!userData.email.endsWith("@gmail.com")) {
        Swal.fire("Error", "Only Gmail accounts allowed", "error");
        setIsLoading(false);
        return;
      }

      // Send to backend to save in MongoDB
      const res = await axios.post("http://localhost:5000/api/auth/google-register", userData, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.success) {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        Swal.fire("Success", "Registered successfully!", "success");
        navigate("/");
      } else {
        Swal.fire("Error", res.data.message || "Registration failed", "error");
      }
    } catch (err) {
      console.error("Google Sign-In error:", err);
      Swal.fire("Error", "Google Sign-In failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Phone/Password Login
  const loginWithPhoneAndPass = async (phoneNumber, password, navigate, location) => {
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { phoneNumber, password });

      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Welcome back!",
          timer: 2000,
          showConfirmButton: false,
        });

        const destination = location?.state?.from || "/";
        navigate(destination);
      } else {
        Swal.fire({ icon: "error", title: "Login Failed!", text: res.data.message });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Login Failed!", text: "Server error" });
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Logout
  const userLogOut = (navigate) => {
    signOut(auth)
      .then(() => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  return {
    user,
    isLoading,
    authError,
    loginWithPhoneAndPass,
    userLogOut,
    googleSignIn,
  };
};

export default useFirebase;
