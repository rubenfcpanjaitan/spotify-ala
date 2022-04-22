import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import Footer from "./Footer";
import Navbar from "./Navbar";
import axios from "axios";
import { useStateProvider } from "../helper/StateProvider";
import Body from "./Body";
import { reducerCases } from "../helper/Constants";
import Search from "./Search";
import CreatePlaylist from "./CreatePlaylist";

export default function Spotify() {
  const [{ token }, dispatch] = useStateProvider();
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const [homeBackground, setHomeBackground] = useState(true);
  const [searchBackground, setSearchBackground] = useState(false);
  const [createPlaylistBackground, setCreatePlaylistBackground] = useState(false);

  const bodyRef = useRef();
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 268
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  };
  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const userInfo = {
        userId: data.id,
        userUrl: data.external_urls.spotify,
        name: data.display_name,
      };
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
  }, [dispatch, token]);

  useEffect(() => {
    const getPlaybackState = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me/player", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: reducerCases.SET_PLAYER_STATE,
        playerState: data.is_playing,
      });
    };
    getPlaybackState();
  }, [dispatch, token]);

  function handleHome(){
    console.log("Menu Home")
    setHomeBackground(true);
    setSearchBackground(false)
    setCreatePlaylistBackground(false)
  }

  function handlePlaylist(){
    console.log("Menu Playlist")
    setHomeBackground(true);
    setSearchBackground(false)
    setCreatePlaylistBackground(false)
  }

  function handleSearch(){
    console.log("Menu Search")
    setHomeBackground(false);
    setSearchBackground(true)
    setCreatePlaylistBackground(false)
  }

  function handleCreatePlaylist(){
    console.log("Menu Create PlayList")
    setHomeBackground(false);
    setSearchBackground(false)
    setCreatePlaylistBackground(true)
  }

  return (
    <Container>
      <div className="spotify__body">
        <Sidebar handleHome={handleHome} handlePlaylist={handlePlaylist} handleSearch={handleSearch} handleCreatePlaylist={handleCreatePlaylist}/>
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <Navbar navBackground={navBackground} />
          <div className="body__contents">
            {homeBackground? <Body homeBackground={true} />:null}
            {searchBackground ?<Search searchBackground={true}/>:null}
            {createPlaylistBackground ?<CreatePlaylist handleSearch={handleSearch} createPlaylistBackground={true}/>:null}
          </div>
        </div>
      </div>
      <div className="spotify__footer">
        <Footer />
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
  .spotify__body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(170, 39, 43);
    .body {
      height: 100%;
      width: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0.7rem;
        max-height: 2rem;
        &-thumb {
          background-color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
`;
