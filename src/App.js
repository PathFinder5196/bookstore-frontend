import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import BooksDataTable from "./components/BooksDataTable";
import AddEditBook from "./components/Dialogs/AddEditBook";
import DeleteBook from "./components/Dialogs/DeleteBook";
import DrawerComponent from "./components/DrawerComponent";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
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
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();

  const [books, setBooks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setEditing(false);
    }, 500);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  useEffect(() => {
    getBooks();
  }, []);
  // Create
  const onSubmitBook = async (e) => {
    e.preventDefault();
    const { title, author, description } = e.target;
    debugger;
    if (
      title &&
      title.value &&
      author &&
      author.value &&
      description &&
      description.value
    ) {
      await axios.post("/api/books", {
        title: title.value,
        author: author.value,
        description: description.value,
      });
      title.value = "";
      author.value = "";
      description.value = "";
      getBooks();
    }
  };

  // Read
  const getBooks = async () => {
    const res = await axios.get("/api/books");
    const data = res.data;
    setBooks(data);
  };
  // Update
  const onSubmitEdits = async (e, id) => {
    e.preventDefault();
    const { title, author, description } = e.target;
    await axios.post(`/api/books/update/${id}`, {
      title: title.value,
      author: author.value,
      description: description.value,
    });
    setEditing(null);
    getBooks();
  };

  // Delete
  const deleteBook = async (bookToDelete) => {
    await axios({
      method: "DELETE",
      url: "/api/books/",
      data: {
        id: bookToDelete,
      },
    });
    await getBooks();
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
        <Toolbar />
        <Container>
          <Fab
            color="primary"
            aria-label="add"
            className={classes.fab}
            onClick={() => setOpen(true)}
          >
            <AddIcon />
          </Fab>
          <BooksDataTable
            books={books}
            setEditing={setEditing}
            setOpen={setOpen}
            setOpenDelete={setOpenDelete}
          />
          <AddEditBook
            open={open}
            handleClose={handleClose}
            editing={editing}
            onSubmitBook={onSubmitBook}
          />
          <DeleteBook
            openDelete={openDelete}
            handleDeleteClose={handleDeleteClose}
            deleteBook={deleteBook}
          />
        </Container>
      </main>
    </div>
  );
}
export default App;
