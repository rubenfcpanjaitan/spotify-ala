import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { createPlaylist } from "../service/spotify";
import { useStateProvider } from "../helper/StateProvider";


export default function CreatePlaylist({ createPlaylistBackground }) {
    const [{ token, selectedPlaylistId, userInfo }, dispatch] = useStateProvider();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = e => {
      if(e.keyCode === 13){
        let id = userInfo?.userId
        let payload = {
          name: name,
          description: description,
        };
        createPlaylist(id, token, payload).then((res) => console.log(res))
      }
    }

    return (
        <Container>
            <div className="row">
                <h1>Tambahkan Playlist</h1>
            </div>
            <div className="row">
                <div className="column">
                    <div className={"input_playlist"}>
                        <input name="playlist" placeholder={"nama playlist"} onChange={e => setName(e.target.value)} />
                    </div>
                </div>
                <div className="column">
                    <div className={"input_playlist"}>
                        <input name={"deskripsi"} placeholder={"Deskripsi"} onChange={e => setDescription(e.target.value)} onKeyDown={handleSubmit} /> 
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