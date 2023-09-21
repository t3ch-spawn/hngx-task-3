import React from "react";
import { useRef, useState, useEffect } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import Home from "./Home";

export default function SignIn() {
  // states
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, passwd)
      .then((userCred) => {
        setSuccess(true);
      })
      .catch((error) => {
        setSuccess(false);
        setErrorMsg("invalid username or password");
      });

    setErrorMsg("");
    setEmail("");
    setPasswd("");
  }
  function changeSuccess() {
    setSuccess(false);
  }

  return (
    <>
      {success ? (
        <Home changeSuccess={changeSuccess} />
      ) : (
        <>
          <h1 className="text-white mb-7 text-4xl  text-center -600:text-3xl">Welcome back to Galleri 😊</h1>

          {/* // container for sign in page */}
          <section className="bg-white text-black w-[80%] max-w-[500px] p-8 -350:p-4 -350:py-6 flex-col flex gap-4 rounded-lg">
            {success ? "" : <p className="text-red-700">{errorMsg}</p>}

            <h1 className="text-left text-3xl font-bold">Sign in</h1>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 items-start w-[100%]"
            >
              {/*email container  */}
              <div className="flex flex-col items-start gap-2 w-[100%]">
                <label htmlFor="email">Email</label>
                <input
                  className="border-black border-2"
                  type="text"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              {/* password container */}
              <div className="flex flex-col items-start gap-2 w-[100%]">
                <label htmlFor="passwd">Password</label>
                <input
                  className="border-black border-2"
                  type="password"
                  id="passwd"
                  placeholder="Enter your password"
                  value={passwd}
                  onChange={(e) => {
                    setPasswd(e.target.value);
                  }}
                />
              </div>

              <button className="btn-action mt-2 border-black border-2 w-[80%] max-w-[100px] p-2 rounded-3xl">
                <p className="text-1">Sign In</p>
                <p className="text-2">Sign In</p>
              </button>
            </form>

            {/* link to sign up form container */}
            <div className="bg-black rounded-md text-white max-w-[250px] p-4">
              <p>Don't have an account?</p>
              <Link to={"/signup"}>
                <p className="underline">Sign Up</p>
              </Link>
            </div>
          </section>
        </>
      )}
    </>
  );
}
