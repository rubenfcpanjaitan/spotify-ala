import React, { useEffect } from "react";
import Login from "./components/Login";
import Spotify from "./components/Spotify";
import { reducerCases } from "./helper/Constants";
import { useStateProvider } from "./helper/StateProvider";
import {setToken} from "./store/authSlice";

export default function App() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      if (token) {
        dispatch({ type: reducerCases.SET_TOKEN, token });
        window.localStorage.setItem('token', token);
        window.location.hash = '';
        dispatch(setToken(token));
      }
    }
    document.title = "Spotify-Gigih-Henny";
  }, [dispatch, token]);
  return <div>{token ? <Spotify /> : <Login />}</div>;
}
