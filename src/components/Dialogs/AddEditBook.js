import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

function AddEditBook({ open, handleClose, editing, onSubmitBook }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {editing ? "Edit" : "Add New"} Book
      </DialogTitle>
      <DialogContent>
        <Box component="span" m={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} sm={12} lg={12}>
              <form>
                <TextField
                  label="Title"
                  id="title"
                  style={{ margin: 8 }}
                  placeholder="Book Title"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
                <TextField
                  label="Author"
                  id="author"
                  style={{ margin: 8 }}
                  placeholder="Author"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
                <TextField
                  label="Description"
                  id="description"
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
                />
              </form>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={onSubmitBook}>
          {editing ? `Update` : `Add`}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddEditBook;
