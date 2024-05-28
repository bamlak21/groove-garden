import React, { useRef, useState, useEffect } from "react";
import Player from "../Components/Player";
import pic from "../Assets/disc.png";
import { useDispatch, useSelector } from "react-redux";
import { getSong } from "../state/songState";
import styled from "@emotion/styled";

const Container = styled.div`
  margin-left: 160px;
`;

const Home = () => {
  const songs = useSelector((state) => state.songs.songs);
  const [animate, setAnimate] = useState("paused");
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(""); // Initialize with the URL of the first song
  const [volume, setVolume] = useState(0.5); // Add state for volume

  const audioElem = useRef();

  useEffect(() => {
    if (isPlaying) {
      audioElem.current.play();
      setAnimate("running");
    } else {
      audioElem.current.pause();
      setAnimate("paused");
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    dispatch(getSong());
  }, []);

  useEffect(() => {
    setCurrentSong(songs[0]);
  }, [songs]);

  function onPlaying() {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;

    setCurrentSong({
      ...currentSong,
      progress: (ct / duration) * 100,
      length: duration,
    });
  }

  function handleVolumeChange(event) {
    const newVolume = event.target.value;
    setVolume(newVolume);
    audioElem.current.volume = newVolume; // Update audio volume
    console.log(newVolume);
  }
  const skipToNext = () => {
    const index = songs.findIndex((x) => x.title === currentSong.title);

    if (index === songs.length - 1) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong(songs[index + 1]);
    }
    audioElem.current.currentTime = 0;
  };
  const skipBack = () => {
    const index = songs.findIndex((x) => x.title === currentSong.title);
    if (index === 0) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong(songs[index - 1]);
    }
    audioElem.current.currentTime = 0;
  };

  return (
    <Container>
      <audio
        src={currentSong?.url}
        ref={audioElem}
        onTimeUpdate={onPlaying}
        onEnded={skipToNext}
      />
      <Player
        pic={pic}
        audioElem={audioElem}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        volume={volume}
        setVolume={setVolume}
        handleVolumeChange={handleVolumeChange}
        songs={songs}
        animate={animate}
        setAnimate={setAnimate}
        skipToNext={skipToNext}
        skipBack={skipBack}
      />
    </Container>
  );
};

export default Home;
