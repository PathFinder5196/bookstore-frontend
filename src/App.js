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
import BackdropComponent from "./components/BackdropComponent";

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
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [bookToEdit, setBookToEdit] = useState({});
  const [showBackDrop, setShowBackDrop] = useState(false);
  const [bookToDelete, setBookToDelete] = useState({});

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setEditing(false);
      setBookToEdit({});
    }, 500);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  useEffect(() => {
    getBooks();
  }, []);
  // Create
  const onSubmitBook = async (fields) => {
    const { title, author, description, _id } = fields;
    if (title && author && description) {
      if (editing) {
        await axios.post(`/api/books/update/${_id}`, {
          title,
          author,
          description,
        });
        setEditing(false);
        setOpen(false);
        setBookToEdit({});
        getBooks();
      } else {
        await axios.post("/api/books", {
          title,
          author,
          description,
        });
        getBooks();
        setOpen(false);
      }
    }
  };

  // Read
  const getBooks = async () => {
    setShowBackDrop(true);
    const res = await axios.get("/api/books");
    const data = res.data;
    setBooks(data);
    setShowBackDrop(false);
  };

  // Delete
  const deleteBook = async () => {
    if (bookToDelete) {
      await axios({
        method: "DELETE",
        url: "/api/books/",
        data: {
          id: bookToDelete,
        },
      });
      setOpenDelete(false);
      setBookToDelete(null);
      await getBooks();
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
      <BackdropComponent
        showBackDrop={showBackDrop}
        setShowBackDrop={setShowBackDrop}
      />

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
            setEditing={(book) => {
              setBookToEdit(book);
              setEditing(true);
            }}
            setOpen={setOpen}
            setOpenDelete={(id) => {
              setBookToDelete(id);
              setOpenDelete(true);
            }}
          />
          <AddEditBook
            open={open}
            handleClose={handleClose}
            editing={editing}
            onSubmitBook={onSubmitBook}
            book={bookToEdit}
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
