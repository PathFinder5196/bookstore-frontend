import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { PublicLayout } from "../Layout";
import { makeStyles } from "@material-ui/core/styles";
import BookCard from "./BookCard";
import { getAllBooks } from "../../actions/books";
import BackdropComponent from "../BackdropComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function Home() {
  const classes = useStyles();
  const [books, setBooks] = useState([]);
  const [showBackDrop, setShowBackDrop] = useState(false);

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

  return (
    <PublicLayout>
      <BackdropComponent
        showBackDrop={showBackDrop}
        setShowBackDrop={setShowBackDrop}
      />
      <div className={classes.root}>
        <Grid container spacing={3}>
          {books.map((book, index) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
              <BookCard book={book} index={index} />
            </Grid>
          ))}
        </Grid>
      </div>
    </PublicLayout>
  );
}

export default Home;
