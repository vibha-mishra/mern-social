import React from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./updateProfilePic.css";
import { useContext, useState } from "react";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";

export default function UpdateProfilePic() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdateProfilePic = async () => {
    if (file) {
      console.log(file);
      const data = new FormData();
      const fileName = file.name;
      data.append("name", fileName);
      data.append("file", file);

      console.log(fileName);
      // currentUser.profilePicture = fileName;
      const senduser = {
        userId: currentUser._id,
        profilePicture: file.name,
      };
      try {
        await axios.post("/upload", data);
      } catch (err) {}
      try {
        const newUser = await axios.put("/users/" + currentUser._id, senduser);
        setUser(newUser.data);
      } catch (err) {}
      window.location.reload();
      setOpen(false);
      // const sendinguser = JSON.parse(user);
      // sendinguser.profilePicture = file.name;
      // const newUser = JSON.stringify(sendinguser);
    }
  };

  return (
    <div>
      <span
        onClick={handleClickOpen}
        className="profileCameraSpan"
        style={{ backgroundColor: "white" }}
      >
        <CameraAltIcon
          style={{
            color: "#1775ee",
          }}
        />
      </span>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Profile Pic</DialogTitle>
        <DialogContent>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateProfilePic} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
