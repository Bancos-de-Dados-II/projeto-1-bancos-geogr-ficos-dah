import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocalStorage } from "./useLocalStorage";

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItem } = useLocalStorage();

  const addUser = (user, token) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
    setItem("token", JSON.stringify(token));
  };

  const removeUser = () => {
    setUser(null);
    setItem("user", "");
    setItem("token", "");
  };

  return { user, addUser, removeUser, setUser };
};
