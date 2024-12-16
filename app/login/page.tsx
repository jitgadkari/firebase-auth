"use client";
import React, { useState } from "react";
import { auth } from "../../firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function LoginPage() {
  // State to handle email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Function to set a cookie
  const setCookie = (name:string, value:string, days:number) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000); // Expiry time
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      console.log("localStorage before:", JSON.stringify(localStorage)); // Log before sign-in

      const result = await signInWithPopup(auth, provider);

      console.log(result.user); // User details
      const accessToken = await result.user.getIdToken(); // Firebase ID Token
      setCookie("accessToken", accessToken, 7); // Set cookie for 7 days

      console.log(result);
      console.log("localStorage after:", JSON.stringify(localStorage)); // Log after sign-in
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setError("Failed to sign in with Google");
    }
  };

  // Email/Password Sign-In
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("Email/Password User signed in:", result.user);
    } catch (error: any) {
      console.error("Email/Password Sign-In Error:", error.message);
      setError("Failed to sign in with email and password");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>

      {/* Email/Password Form */}
      <form onSubmit={handleEmailSignIn}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Sign in with Email</button>
      </form>

      {/* Error Display */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <hr />

      {/* Google Sign-In */}
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
}
