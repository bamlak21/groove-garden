import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { addSong, getSong } from "../state/songState";
import { useDispatch } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import Toast from "./Toast";
import { tab } from "../responsive";

const Form = styled.form`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  flex: 2;

  ${tab({ marginTop: "200px" })}
`;

const FormTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  text-align: center;
`;
const FormArtist = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  text-align: center;
`;
const FormUpload = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  text-align: center;
  padding-left: 100px;
`;

const Button = styled.button`
  border: none;
  outline: none;
  width: 120px;
  height: 30px;
  font-size: 18px;
  border-radius: 12px;
  background-color: #084868;
  color: white;
`;

const Label = styled.label``;
const Input = styled.input`
  border: none;
  outline: none;
  padding: 5px 10px;
  border-radius: 12px;
`;

const CreateForm = () => {
  const [toast, setToast] = useState({
    text: "",
    status: false,
    bg: "",
  });
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    if (toast.status) {
      setTimeout(() => {
        setToast({
          ...toast,
          status: false,
        });
      }, 4000);
    }
  }, [toast]);

  const handleClick = (e) => {
    e.preventDefault();
    if (file) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      setToast({
        text: "Adding Song Please wait ",
        status: true,
        bg: "#1845e7",
      });
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress >= 30 && progress <= 78) {
            const Progress = Math.round(progress);
            setToast({
              text: "Adding Song " + Progress + "%",
              status: true,
              bg: "#1845e7",
            });
          }
          console.log("Upload is " + progress + "% done");

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const song = { ...inputs, url: downloadURL };

            dispatch(addSong(song));
            dispatch(getSong());
            setToast({
              text: "Song Added Successfully!",
              status: true,
              bg: "#283034",
            });
          });
        }
      );
      setInputs(null);
    } else {
      console.log("no file selected");
      setToast({
        text: "no file selected!",
        status: true,
        bg: "#f11717",
      });
    }
  };

  return (
    <>
      {toast.status && <Toast text={toast.text} bg={toast.bg} />}
      <Form>
        <FormTitle>
          <Label htmlFor="title">Title</Label>
          <Input type="text" name="title" id="title" onChange={handleChange} />
        </FormTitle>
        <FormArtist>
          <Label htmlFor="artist">Artist</Label>
          <Input
            type="text"
            name="artist"
            id="artist"
            onChange={handleChange}
          />
        </FormArtist>
        <FormUpload>
          <Label htmlFor="song">Upload</Label>
          <Input
            type="file"
            name="song"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </FormUpload>
        {/* <Label htmlFor="art">Music art</Label>
      <Input type="file" name="art" id="art" /> */}
        <Button onClick={handleClick}>Add</Button>
      </Form>
    </>
  );
};

export default CreateForm;
