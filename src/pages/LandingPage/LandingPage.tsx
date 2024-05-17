import { useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const { user, setUser } = useContext(UserContext);
  const navigator = useNavigate();

  useEffect(() => {
    console.log(import.meta.env.VITE_FIREBASE_API_KEY);
  }, []);
  return (
    <>
      {user.isAuth && (
        <div className="flex flex-col h-screen justify-center items-center">
          <button
            onClick={() => {
              navigator("/kanban");
            }}
            className="text-center py-2 px-4 bg-indigo-500 rounded-full ]"
          >
            Go to Kanban
          </button>
        </div>
      )}
    </>
  );
}
