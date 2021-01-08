import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import DrawerComponent from "../../components/DrawerComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function AddBook() {
  const classes = useStyles();
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    fields[e?.target?.name] = e?.target?.value;
    setFields({ ...fields });
    validateForm(fields);
  };

  const validateForm = (fields) => {
    let errors = {};
    let formIsValid = true;
    if (!fields["title"]) {
      formIsValid = false;
      errors["title"] = "*Please enter title.";
    }

    if (!fields["author"]) {
      formIsValid = false;
      errors["author"] = "*Please provide author.";
    }

    setErrors(errors);
    return formIsValid;
  };

  const submitForm = () => {
    if (validateForm(fields)) {
      setFields({});
    }
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Book Store
          </Typography>
        </Toolbar>
      </AppBar>
      <DrawerComponent />

      <main className={classes.content}>
        <Box component="span" m={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} sm={12} lg={12}>
              <form noValidate autoComplete="off">
                <TextField
                  label="Title"
                  id="title"
                  name="title"
                  error={errors?.title}
                  style={{ margin: 8 }}
                  placeholder="Book Title"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleChange}
                  variant="outlined"
                  defaultValue={fields?.title}
                />
                <TextField
                  label="Author"
                  id="author"
                  name="author"
                  error={errors?.author}
                  style={{ margin: 8 }}
                  placeholder="Author"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  defaultValue={fields?.author}
                  onChange={handleChange}
                />
                <TextField
                  label="Description"
                  id="description"
                  name="description"
                  style={{ margin: 8 }}
                  placeholder="Description"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  multiline
                  rows={4}
                  defaultValue={fields?.description}
                  onChange={handleChange}
                />
              </form>
            </Grid>
            <Button color="primary">Cancel</Button>
            <Button variant="contained" color="primary" onClick={submitForm}>
              Save
            </Button>
          </Grid>
        </Box>
      </main>
    </div>
  );
}

export default AddBook;
