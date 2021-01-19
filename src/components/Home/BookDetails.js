import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { getBookById } from "../../actions/books";
import { PublicLayout } from "../Layout";
import BackdropComponent from "../BackdropComponent";

const useStyles = makeStyles(() => ({
  justifyCenter: {
    justifyContent: "center",
  },
}));

export default function BookDetails({ match: { params } }) {
  const classes = useStyles();
  const [book, setBook] = useState({});
  const [showBackDrop, setShowBackDrop] = useState(false);

  useEffect(() => {
    if (params && params.id) {
      setShowBackDrop(true);
      getBookById(params.id)
        .then((resp) => {
          if (resp?.data) {
            setBook(resp.data);
          }
          setShowBackDrop(false);
        })
        .catch((err) => {
          console.error(err);
          setShowBackDrop(false);
        });
    }
  }, [params]);

  return (
    <PublicLayout>
      <BackdropComponent
        showBackDrop={showBackDrop}
        setShowBackDrop={setShowBackDrop}
      />
      <Card>
        <CardActionArea>
          <CardHeader title={book.title} subheader={book.author} />
          <CardMedia
            component="img"
            alt={book.title}
            height="350"
            image={`https://source.unsplash.com/random`}
            title={book.title}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {book.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.justifyCenter}>
          <Button variant="contained" color="primary" component={Link} to="/">
            Go Back
          </Button>
        </CardActions>
      </Card>
    </PublicLayout>
  );
}
