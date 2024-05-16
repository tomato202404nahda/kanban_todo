import { useNavigate } from "react-router-dom";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase.config";
import { User } from "../../globals/types";
import { createRef, useContext, useState } from "react";
import { UserContext } from "../../App";

import Generic from "../../assets/generic.webp";

export default function Header() {
  const navigator = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [dropdownPopovershow, setDropdownPopoverShow] = useState(false);

  const signInWithGoogle = async () => {
    const response = await signInWithPopup(auth, provider);
    const u: User = {
      userId: response.user.uid,
      name: response.user.displayName,
      profilePhoto: response.user.photoURL,
      isAuth: true,
    };
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  return (
    <div className="flex flex-row align-middle p-4 gap-4 justify-between">
      <h1
        onClick={() => {
          navigator("/");
        }}
        className="text-3xl text-slate-100"
      >
        TODO List
      </h1>
      <div className="">
        {user.isAuth ? (
          <div className="flex flex-row flex-grow-0 w-[5rem] h-auto rounded-full bg-white">
            <img
              src={
                user.profilePhoto === "" || user.profilePhoto === null
                  ? Generic
                  : user.profilePhoto
              }
              className="w-[3rem] h-auto rounded-full"
            />
          </div>
        ) : (
          <button
            onClick={() => signInWithGoogle()}
            className="bg-slate-100 rounded-lg font-bold hover:scale-105 hover:text-slate-100 hover:bg-black hover:border hover:border-slate-50 transition-all duration-200 ease-in-out py-2 px-8"
            type="button"
          >
            Sign In With Google
          </button>
        )}
      </div>
    </div>
  );
}
