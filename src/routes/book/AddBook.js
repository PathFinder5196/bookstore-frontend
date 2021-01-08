import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

function AddBook() {
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
    // <main className={classes.content}>
    <Box component="span" m={1}>
      <Paper>
        <Grid spacing={3}>
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
      </Paper>
    </Box>
    // </main>
  );
}

export default AddBook;
