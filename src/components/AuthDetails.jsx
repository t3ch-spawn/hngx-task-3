import React from "react";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function AuthDetails(props) {
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        setAuthUser(newUser);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  function handleSignOut() {
    signOut(auth).then(() => {
      console.log("sign out successful");
    });
  }
  return (
    <div className="text-black">
      {authUser ? (
        <div className="flex gap-4 -350:flex-col">
          <p>{`Signed in as ${authUser.email}`}</p>
          <button
            className="underline"
          onClick={()=>{
            handleSignOut()
            props.changeSuccess()
          }}>Sign out</button>
        </div>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
}
