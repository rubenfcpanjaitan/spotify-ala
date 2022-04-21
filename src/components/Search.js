import React from 'react';
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

export default function Search({ searchBackground }) {
    return (
        <Container searchBackground={searchBackground}>
            <div className="search__bar">
                <FaSearch />
                <input type="text" placeholder="Artists, songs, or podcasts" />
            </div>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
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
`;