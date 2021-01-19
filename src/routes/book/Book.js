import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import BooksDataTable from "../../components/BooksDataTable";
import DeleteBook from "../../components/Dialogs/DeleteBook";
import BackdropComponent from "../../components/BackdropComponent";
import WithAuth from "../../components/WithAuth";
import { getAllBooks, removeBook } from "../../actions/books";

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

function Book() {
  const classes = useStyles();
  const history = useHistory();

  const [books, setBooks] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [showBackDrop, setShowBackDrop] = useState(false);
  const [bookToDelete, setBookToDelete] = useState({});

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    setShowBackDrop(true);
    const resp = await getAllBooks();
    const data = resp.data;
    setBooks(data);
    setShowBackDrop(false);
  };

  const deleteBook = async () => {
    if (bookToDelete) {
      await removeBook(bookToDelete);
      setOpenDelete(false);
      setBookToDelete(null);
      await getBooks();
    }
  };
  return (
    <>
      <BackdropComponent
        showBackDrop={showBackDrop}
        setShowBackDrop={setShowBackDrop}
      />
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={() => history.push("/books/new")}
      >
        <AddIcon />
      </Fab>
      <BooksDataTable
        books={books}
        setOpenDelete={(id) => {
          setBookToDelete(id);
          setOpenDelete(true);
        }}
      />
      <DeleteBook
        openDelete={openDelete}
        handleDeleteClose={handleDeleteClose}
        deleteBook={deleteBook}
      />
    </>
  );
}

export default WithAuth(Book);
