import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { addBook } from "../../actions/books";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  buttonSpacing: {
    margin: theme.spacing(0, 2, 0),
  },
}));

function AddBook() {
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});

  const classes = useStyles();
  const history = useHistory();

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

  const onSubmitBook = async (fields) => {
    const { title, author, description } = fields;
    const bookDetails = {
      title,
      author,
      description,
    };
    if (title && author && description) {
      await addBook(bookDetails);
      history.push("/");
    }
  };

  const submitForm = () => {
    if (validateForm(fields)) {
      onSubmitBook(fields);
      setFields({});
    }
  };

  return (
    <Box component="span" m={1}>
      <Grid item xs={12} md={12} sm={12} lg={12}>
        <Container>
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
            <Grid
              container
              xs={12}
              md={12}
              sm={12}
              lg={12}
              className={classes.submit}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Button
                color="primary"
                component={Link}
                to={"/"}
                className={classes.buttonSpacing}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={submitForm}
                className={classes.buttonSpacing}
              >
                Save
              </Button>
            </Grid>
          </form>
        </Container>
      </Grid>
    </Box>
  );
}

export default AddBook;
