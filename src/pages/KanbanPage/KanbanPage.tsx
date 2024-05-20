import { useContext } from "react";
import Kanban from "../../components/Kanban";
import { UserContext } from "../../App";
import { Navigate } from "react-router-dom";

export default function KanbanPage() {
  const { user } = useContext(UserContext);
  if (user.isAuth) {
    return <Kanban />;
  } else {
    return <Navigate to={"/"} />;
  }
}
