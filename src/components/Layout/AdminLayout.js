import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DrawerComponent from "../DrawerComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function AdminLayout({ window, children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <DrawerComponent window={window} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={classes.paper}>{children}</Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default AdminLayout;
