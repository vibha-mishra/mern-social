import React from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useState, useRef, useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Feed from "../feed/Feed";
const ITEM_HEIGHT = 48;

export default function Delete({ post }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const userId = useRef();
  const [allPost, setAllPost] = useState([]);
  const { user } = useContext(AuthContext);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [dopen, setdOpen] = React.useState(false);

  const handleClickOpen = () => {
    setdOpen(true);
  };

  const handleClickClose = () => {
    setdOpen(false);
  };
  const handleClickYes = async () => {
    try {
      await axios.delete("/posts/" + post._id);
      //   const allPost = await axios.get("/profile/" + user.username);
      //   console.log(allPost);
    } catch (err) {}
    setdOpen(false);
    window.location.reload();
  };
  const handleClickNo = () => {
    setdOpen(false);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem key="delete" onClick={handleClose}>
          <Button onClick={handleClickOpen}>Delete</Button>
          <Dialog
            open={dopen}
            onClose={handleClickClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Delete Post"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure?You want to delete the post?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClickNo} color="primary">
                No
              </Button>
              <Button
                onClick={handleClickYes}
                color="primary"
                autoFocus
                ref={userId}
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </MenuItem>
      </Menu>
    </div>
  );
}
