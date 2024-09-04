import { useNavigate } from "react-router-dom";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase.config";
import { User } from "../../globals/types";
import { useContext } from "react";
import { UserContext } from "../../App";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import Generic from "../../assets/generic.webp";

export default function Header() {
  const navigator = useNavigate();
  const { user, setUser } = useContext(UserContext);

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
  const logOut = async () => {
    const u: User = {
      userId: "",
      name: "",
      profilePhoto: "",
      isAuth: false,
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
          <Menu>
            <MenuButton>
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
            </MenuButton>
            <Transition
              enter="transition ease-out duration-75"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <MenuItems
                anchor="bottom end"
                className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
              >
                <MenuItem>
                  <button
                    onClick={() => {
                      logOut();
                    }}
                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                  >
                    Logout
                  </button>
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
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
