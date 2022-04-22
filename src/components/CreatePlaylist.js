import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import {BsTextarea} from "react-icons/bs";
import { useStateProvider } from "../helper/StateProvider";
import { reducerCases } from "../helper/Constants";

export default function CreatePlaylist({ createPlaylistBackground }) {
  const [{ userInfo, token }, dispatch] = useStateProvider();
  const [newPlaylist, setNewPlaylist] = useState({
    "name": "",
    "description": "",
    "public": false
  })
  
  const createNewPlaylist = async () => {
    await axios({
      method: "POST",
      url: `https://api.spotify.com/v1/users/${userInfo.userId}/playlists`,
      data: newPlaylist,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
    await getPlaylistData()
    setNewPlaylist({
      "name": "",
      "description": "",
      "public": false
    })
  };

  const getPlaylistData = async () => {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/playlists",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const { items } = response.data;
    const playlists = items.map(({ name, id }) => {
      return { name, id };
    });
    dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setNewPlaylist({
      ...newPlaylist,
      [evt.target.name]: value
    });
  }

    return (
        <Container>
            <div className="row">
                <h1 className="title">Tambahkan Playlist</h1>
            </div>
            <div className="row">
                <div className="column">
                    <div className={"input_playlist"}>
                        <input 
                          name="name" 
                          placeholder={"nama playlist"}
                          onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="column">
                    <div className={"input_playlist"}>
                        <input 
                          name="description"
                          placeholder={"Deskripsi"}
                          onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="column">
                    <button onClick={createNewPlaylist}>ADD</button>
                </div>
            </div>
        </Container>
    );
}



const Container = styled.div`
  height: 50%;
  width: 50%;
  background-color: #181818;
  border-top: 1px solid #282828;
  display: grid;
  grid-template-columns: 10fr;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  margin-left: 20%;
  position: absolute;
  .input_playlist {
    background-color: white;
    width: 70%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    input {
      border: none;
      height: 2rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
  .row {
    display: flex;
    padding: 1px;
  }
  .column {
    flex: 100%;
    padding: 1px;
    height: 100%; 
  }
  .title {
    color: white;
  } 
`;