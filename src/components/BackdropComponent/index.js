import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function BackdropComponent({ showBackDrop, setShowBackDrop }) {
  const classes = useStyles();
  return (
    <Backdrop
      className={classes.backdrop}
      open={showBackDrop}
      onClick={() => setShowBackDrop(false)}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default BackdropComponent;
