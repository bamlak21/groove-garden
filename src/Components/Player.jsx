import React, { useRef } from "react";
import { css } from "@emotion/css";
import { IoPauseCircleSharp, IoPlayCircleSharp } from "react-icons/io5";
import { FaStepBackward, FaStepForward } from "react-icons/fa";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import List from "./List";
import { med } from "../responsive";

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
`;

const Heading = styled.h2`
  margin-bottom: 10px;
`;

const PlayerContainer = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 80px;
  padding: 10px 20px;
  background-color: #084868;
  color: white;
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

const SongTitle = styled.p`
  font-size: 20px;
`;
const SongArtist = styled.p`
  font-size: 16px;
`;

const Img = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${rotate} 4s infinite linear;
  animation-play-state: ${(props) => props?.animate};

  ${med({ display: "none" })}
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
`;
const ProgressBar = styled.div`
  width: 0;
  height: 5px;
  background-color: #5dbff0;
  border-radius: 12px;

  &:hover {
    padding: 4px;
  }
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
  music,
  audioElem,
  isPlaying,
  setIsPlaying,
  currentSong,
  setCurrentSong,
  volume,
  setVolume,
  handleVolumeChange,
  songs,
  setSongs,
  skipToNext,
  skipBack,
  setAnimate,
}) => {
  const clickRef = useRef();
  const playingRef = useRef();

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
    setCurrentSong(song);
    setIsPlaying(!isPlaying);
    playingRef.current.style.color = "#084868";
  };

  return (
    <>
      <Heading>Tracks</Heading>
      <ListContainer>
        {songs &&
          songs.map((song) => {
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
