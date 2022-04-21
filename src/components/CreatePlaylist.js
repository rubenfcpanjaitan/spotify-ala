import React from 'react';
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import {BsTextarea} from "react-icons/bs";

export default function CreatePlaylist({ createPlaylistBackground }) {
    return (
        <Container>
            <div className="row">
                <h1>Tambahkan Playlist</h1>
            </div>
            <div className="row">
                <div className="column">
                    <div className={"input_playlist"}>
                        <input name="playlist" placeholder={"nama playlist"}></input>
                    </div>
                </div>
                <div className="column">
                    <div className={"input_playlist"}>
                        <input name={"deskripsi"} placeholder={"Deskripsi"}></input>
                    </div>
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
`;