import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
export default function EditPofile() {
  const [open, setOpen] = React.useState(false);

  const { user: currentUser, dispatch } = useContext(AuthContext);
  // const [u, setUser] = useState();
  const [desc, setDesc] = useState();
  const [city, setCity] = useState();
  const [from, setFrom] = useState();
  const [relationship, setRelationship] = useState();
  const handleRelationshipStatus = (event) => {
    setRelationship(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = async () => {
    try {
      const newUser = await axios.put("/users/" + currentUser._id, senduser);
      // console.log(newUser.data);
      // setUser(newUser.data);
    } catch (err) {}
    window.location.reload();
    setOpen(false);
  };
  const handleEditCity = async (e) => {
    const city = e.target.value;
    setCity(city);
  };
  const handleEditDesc = async (e) => {
    const desc = e.target.value;
    setDesc(desc);
  };
  const handleEditFrom = async (e) => {
    const from = e.target.value;
    setFrom(from);
  };
  const senduser = {
    userId: currentUser._id,
    desc: desc,
    city: city,
    from: from,
    relationship: relationship,
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        style={{ backgroundColor: "#1775ee", color: "white" }}
      >
        Edit Profile
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="text"
            fullWidth
            disabled
            defaultValue={currentUser.username}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            type="text"
            fullWidth
            onChange={handleEditDesc}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="City"
            type="text"
            fullWidth
            onChange={handleEditCity}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="From"
            type="text"
            fullWidth
            onChange={handleEditFrom}
          />
          <InputLabel id="demo-simple-select-label">Relationship</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            fullWidth
            value={relationship}
            onChange={handleRelationshipStatus}
          >
            <MenuItem value={1}>Single</MenuItem>
            <MenuItem value={2}>Married</MenuItem>
            <MenuItem value={3}>-</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
