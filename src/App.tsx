import { Route, Routes } from "react-router-dom";

import KanbanPage from "./pages/KanbanPage/KanbanPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import Header from "./components/general/Header";
import { createContext, useState } from "react";
import { User } from "./globals/types";

export const UserContext = createContext<{
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}>({
  user: {
    userId: "",
    name: null,
    profilePhoto: null,
    isAuth: false,
  },
  setUser: () => {},
});

function App() {
  const router = [
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/kanban",
      element: <KanbanPage />,
    },
  ];
  const [user, setUser] = useState((): User => {
    const p = localStorage.getItem("user");

    if (p != null) {
      return JSON.parse(p);
    } else {
      return {
        userId: "",
        profilePhoto: "",
        name: "",
        isAuth: false,
      };
    }
  });

  const userProviderValue = {
    user,
    setUser,
  };
  return (
    <UserContext.Provider value={userProviderValue}>
      <div className="flex flex-col max-w-screen w-full h-screen bg-indigo-900">
        <Header />
        <Routes>
          {router.map((r) => {
            return <Route path={r.path} element={r.element}></Route>;
          })}
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
