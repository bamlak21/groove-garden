import React, { useRef, useState } from "react";
import { IoPauseCircleSharp, IoPlayCircleSharp } from "react-icons/io5";
import { FaStepBackward, FaStepForward } from "react-icons/fa";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import List from "./List";
import { big, med, mobile, tab } from "../responsive";
import Search from "./Search";

const rotate = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
`;

const Heading = styled.h2`
  margin-bottom: 10px;

  ${mobile({ marginLeft: "-30px", marginBottom: "20px" })}
`;

const PlayerContainer = styled.div`
  bottom: 10px;
  left: 0;
  position: fixed;
  width: 95%;
  display: flex;
  align-items: center;
  gap: 80px;
  padding: 10px 40px;
  margin-right: 30px;
  margin-left: 30px;
  background-color: #084868;
  color: white;
  border-radius: 22px;

  ${big({ marginLeft: "15px", gap: "20px" })}
`;

const SongContent = styled.div`
  display: flex;
  flex: 1;
  gap: 20px;
  align-items: center;
`;

const SongDetails = styled.div`
  font-size: 14px;
`;

const SongTitle = styled.h6`
  font-size: 16px;
`;
const SongArtist = styled.p`
  font-size: 12px;
  font-weight: light;
`;

const Img = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${rotate} 4s infinite linear;
  animation-play-state: ${(props) => props?.animate};

  ${tab({ display: "none" })}
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  gap: 10px;
`;

const PlayBack = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  margin: auto 0;

  button {
    border: none;
    outline: none;
    background: transparent;
  }
`;

const Progress = styled.div`
  background-color: rgba(35, 34, 34, 0.781);
  height: 5px;
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  ${mobile({ display: "none" })}
`;
const ProgressBar = styled.div`
  width: 0;
  height: 5px;
  background-color: #5dbff0;
  border-radius: 12px;

  &:hover {
    padding: 4px;
  }
  ${mobile({ display: "none" })}
`;

const Volume = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 150px;

  input[type="range"] {
    margin: 0 30px;
    width: inherit;
    height: 5px;
    border-radius: 12px;
  }

  ${med({ display: "none" })}
`;

const Player = ({
  animate,
  pic,
  audioElem,
  isPlaying,
  setIsPlaying,
  currentSong,
  setCurrentSong,
  volume,
  handleVolumeChange,
  songs,
  skipToNext,
  skipBack,
}) => {
  const clickRef = useRef();

  const [query, setQuery] = useState("");

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(query.toLowerCase())
  );

  function handlePlay() {
    setIsPlaying(!isPlaying);
  }

  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const divProgress = (offset / width) * 100;

    audioElem.current.currentTime = (divProgress / 100) * currentSong.length;
  };

  const playClick = (song) => {
    if (song === currentSong) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  return (
    <>
      <Search query={query} setQuery={setQuery} />
      <Heading>Tracks</Heading>
      <ListContainer>
        {filteredSongs &&
          filteredSongs.map((song) => {
            return <List song={song} playClick={playClick} key={song._id} />;
          })}
      </ListContainer>
      <PlayerContainer>
        <SongContent>
          <Img src={pic} alt="" animate={animate} />

          <SongDetails>
            <SongTitle>{currentSong?.title}</SongTitle>
            <SongArtist>{currentSong?.artist}</SongArtist>
          </SongDetails>
        </SongContent>

        <Controls>
          <PlayBack>
            <button onClick={() => console.log("click")}>
              <FaStepBackward size={30} color="white" onClick={skipBack} />
            </button>
            <button>
              {isPlaying ? (
                <IoPauseCircleSharp
                  size={34}
                  color="white"
                  onClick={handlePlay}
                />
              ) : (
                <IoPlayCircleSharp
                  size={34}
                  color="white"
                  onClick={handlePlay}
                />
              )}
            </button>
            <button>
              <FaStepForward size={30} color="white" onClick={skipToNext} />
            </button>
          </PlayBack>

          <Progress onClick={checkWidth} ref={clickRef}>
            <ProgressBar
              style={{ width: `${currentSong?.progress + "%"}` }}
            ></ProgressBar>
            <div st></div>
          </Progress>
        </Controls>

        <Volume>
          <HiOutlineSpeakerWave />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </Volume>
      </PlayerContainer>
    </>
  );
};

export default Player;
