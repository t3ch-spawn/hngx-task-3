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
        console.log(authUser);
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
    <div>
      {authUser ? (
        <>
          <p>{`Signed in as ${authUser.email}`}</p>
          <button onClick={()=>{
            handleSignOut()
            props.changeSuccess()
          }}>Sign out</button>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
}
