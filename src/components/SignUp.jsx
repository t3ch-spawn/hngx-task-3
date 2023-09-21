import React from "react";
import { useRef, useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

export default function SignUp() {
  // states
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSignUp(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, passwd)
      .then((userCred) => {
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <h1 className="text-white mb-7 text-4xl text-center">Sign Up for Galleri 😉</h1>

      {/* // container for sign up form */}
      <section className="bg-white text-black w-[90%] max-w-[500px] p-8 -350:p-3 -350:py-6 flex-col flex gap-4 rounded-lg">
        {success ? (
          <p className="text-green font-bold text-2xl text-green-700">
            SIGN UP SUCCESSFUL
          </p>
        ) : (
          <></>
        )}

        <h1 className="text-left text-3xl font-bold">Sign Up</h1>

        <form
          onSubmit={handleSignUp}
          className="flex flex-col gap-2 items-start w-[100%]"
        >
          {/*email container  */}
          <div className="flex flex-col items-start gap-2 w-[100%]">
            <label htmlFor="email-up">Email</label>
            <input
              className="border-black border-2"
              type="email"
              id="email-up"
              placeholder="Enter your email"
              value={email}
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          {/* password container */}
          <div className="flex flex-col items-start gap-2 w-[100%]">
            <label htmlFor="passwd-up">Password</label>
            <input
              className="border-black border-2"
              type="password"
              id="passwd-up"
              placeholder="Enter your password"
              value={passwd}
              required
              onChange={(e) => {
                setPasswd(e.target.value);
              }}
            />
          </div>

          <button className="btn-action mt-2 border-black border-2 w-[80%] max-w-[100px] p-2 rounded-3xl">
            <p className="text-1">Sign Up</p>
            <p className="text-2">Sign Up</p>
          </button>
        </form>

        {/* link to sign up form container */}
        <div className="bg-black rounded-md text-white max-w-[250px] p-4">
          <p>Already have an account?</p>
          <Link to={"/"}>
            <p className="underline">Sign In</p>
          </Link>
        </div>
      </section>
    </>
  );
}
