import React from "react";
import styled from "styled-components";
import { MdHomeFilled, MdSearch,MdSmartDisplay } from "react-icons/md";
import { IoLibrary,IoAdd } from "react-icons/io5";
import Playlists from "./Playlists";
export default function Sidebar() {
  return (
    <Container>
      <div className="top__links">
        <div className="logo">
          <MdSmartDisplay color={"white"} size={"100px"}></MdSmartDisplay>
          <span>
            <h1>Spotify-Gigih</h1>
          </span>
        </div>
        <ul>
          <li>
            <MdHomeFilled />
            <span>Home</span>
          </li>
          <li>
            <MdSearch />
            <span>Search</span>
          </li>
          <li>
            <IoAdd />
            <span>Create Playlist</span>
          </li>
          <li>
            <IoLibrary />
            <span>Your Playlist</span>
          </li>
        </ul>
      </div>
      <Playlists />
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .top__links {
    display: flex;
    flex-direction: column;
    .logo {
      text-align: center;
      margin: 1rem 0;
      img {
        max-inline-size: 80%;
        block-size: auto;
      }
    }
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      li {
        display: flex;
        gap: 1rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: white;
        }
      }
    }
  }
`;