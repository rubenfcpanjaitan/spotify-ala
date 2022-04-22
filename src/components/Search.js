import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { getSongList } from "../service/spotify";
import { useEffect, useRef, useState } from "react";
import { AiFillClockCircle, AiOutlineMenu, AiFillPlusCircle } from "react-icons/ai";
import axios from 'axios';
import { useStateProvider } from "../helper/StateProvider";
import { reducerCases } from "../helper/Constants";


export default function Search({ searchBackground }) {
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [{ token, selectedPlaylistId }, dispatch] = useStateProvider();
  const [track, setTrack] = useState({
    uris: [],
    position: 0
  })

    const handleSubmit = e => {
      if(e.keyCode == 13){
        var value = e.target.value
        var token = window.localStorage.getItem("token");
    
        getSongList(token, value).then((res) => {
          const tes = {
            id: res.id,
            name: res.name,
            tracks: res.tracks.items.map(( track ) => ({
              id: track.id,
              name: track.name,
              artists: track.artists.map((artist) => artist.name),
              image: track.album.images[2].url,
              duration: track.duration_ms,
              album: track.album.name,
              context_uri: track.album.uri,
              track_uri: track.uri,
              track_number: track.track_number,
            })),
          };
          setSelectedPlaylist(tes)
        });
     }
    };

    useEffect(() => {
      track.uris.length && addItemToPlaylist()
    },[track]);

    const addItemToPlaylist = async () => {
      const response =  await axios({
        method: "POST",
        url: `https://api.spotify.com/v1/playlists/${selectedPlaylistId}/tracks`,
        data: track,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })

      if (response.snapshot_id) {
        await getPlaylistData()
      }
    }

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
          
    const msToMinutesAndSeconds = (ms) => {
      var minutes = Math.floor(ms / 60000);
      var seconds = ((ms % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    };

    const handleTrack = (uri) => {
      setTrack({
        ...track,
        uris: [
          ...track.uris,
          uri
        ]
      })
    }
  
    return (
        <Container searchBackground={searchBackground}>
            <div className="search__bar">
                <FaSearch />
                <input type="text" placeholder="Artists, songs, or podcasts" onKeyDown={handleSubmit}/>
            </div>
            {selectedPlaylist && (
              <>
                <div className="list">
                  <div className="header-row">
                    <div className="col">
                      <span>#</span>
                    </div>
                    <div className="col">
                      <span>TITLE</span>
                    </div>
                    <div className="col">
                      <span>ALBUM</span>
                    </div>
                    <div className="col">
                      <span>
                        <AiFillClockCircle />
                      </span>
                    </div>
                    <div className="col">
                      <span>ADD TO PLAYLIST</span>
                    </div>
                  </div>
                  <div className="tracks">
                    {selectedPlaylist.tracks.map(
                      (
                        {
                          id,
                          name,
                          artists,
                          image,
                          duration,
                          album,
                          track_uri,
                        },
                        index
                      ) => {
                        return (
                          <div
                            className="row"
                            key={id}
                            // onClick={() =>
                            //   playTrack(
                            //     id,
                            //     name,
                            //     artists,
                            //     image,
                            //     context_uri,
                            //     track_number
                            //   )
                            // }
                          >
                            <div className="col">
                              <span>{index + 1}</span>
                            </div>
                            <div className="col detail">
                              <div className="image">
                                <img src={image} alt="track" />
                              </div>
                              <div className="info">
                                <span className="name">{name}</span>
                                <span>{artists}</span>
                              </div>
                            </div>
                            <div className="col">
                              <span>{album}</span>
                            </div>
                            <div className="col">
                              <span>{msToMinutesAndSeconds(duration)}</span>
                            </div>
                            <div className="col-center">
                                <span
                                  onClick={() => handleTrack(track_uri)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <AiFillPlusCircle size={24}/>
                                </span>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </>
            )}
        </Container>
    );
}

const Container = styled.div`
  display: block;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 5vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${({ navBackground }) =>
    navBackground ? "rgba(0,0,0,0.7)" : "none"};
  .search__bar {
    background-color: white;
    width: 30%;
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
  .list {
    .header-row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.3fr 1fr;
      margin: 1rem 0 0 0;
      color: #dddcdc;
      position: sticky;
      top: 15vh;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
      background-color: ${({ headerBackground }) =>
        headerBackground ? "#000000dc" : "none"};
    }
    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 2fr 0.3fr 1fr;
        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          img {
            height: 40px;
            width: 40px;
          }
        }
        .detail {
          display: flex;
          gap: 1rem;
          .info {
            display: flex;
            flex-direction: column;
          }
        }
        .col-center {
          color: #dddcdc;
          text-align: center;
          align-self: center;
        }
      }
    }
  }
`;