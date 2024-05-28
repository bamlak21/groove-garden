import React, { useEffect, useRef } from "react";
import { BsPlayFill } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { deleteSong, getSong } from "../state/songState";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { tab } from "../responsive";

const SongListContainer = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 12px;
  align-items: center;
  padding: auto 0;
  gap: 50px;
  margin-top: -5px;
  margin-bottom: 20px;
  transition: 0.2s ease;
  height: 50px;
  width: 700px;
  cursor: pointer;
  background-color: #1f2c32;

  ${tab({ marginLeft: "-50px", width: "550px" })}
`;

const SongDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
  &:hover {
    color: #084868;
  }

  &:active {
    color: #084868;
  }
`;

const SongTitle = styled.h4``;
const SongArtist = styled.h5``;
const Edit = styled(Link)`
  text-decoration: none;
  color: aliceblue;
`;

const EditIcon = styled(CiEdit)`
  color: white;

  &:hover {
    color: blue;
  }
`;

const DeleteIcon = styled(MdOutlineDelete)`
  color: white;

  &:hover {
    color: red;
  }
`;

const List = ({ song, playClick, playingRef }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteSong(id));
  };

  useEffect(() => {
    dispatch(getSong());
  }, []);

  return (
    <SongListContainer ref={playingRef}>
      <SongDetails onClick={() => playClick(song)}>
        <SongTitle>{song?.title}</SongTitle>
        <SongArtist>By {song?.artist}</SongArtist>
      </SongDetails>
      <span>{song.length}</span>
      <Edit to={`/song/${song?._id}`}>
        <EditIcon size={25} />
      </Edit>
      <DeleteIcon size={25} onClick={() => handleDelete(song._id)} />
    </SongListContainer>
  );
};

export default List;
