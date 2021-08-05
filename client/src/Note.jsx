import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { blue } from "@material-ui/core/colors";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CheckIcon from "@material-ui/icons/Check";
import { useState } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

// 🔴 🔺🔻🔺🔻🔺🔻🔺🔻🔺🔻🔺🔻🔺🔻 🔴
// i am eager for gain knowledge,if you have any suggestion about this project and fullstack dev,if you can give me it's really appriciate 🤯;

function Note(props) {
  //state for content editable html element
  const [editable, neweditable] = useState("false");
  // <---------------------->

  //style for note component
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: "280px",
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 1rem 3rem rgba(0,0,0,.175)",
      },
    },
    media: {
      height: 0,
    },
    avatar: {
      backgroundColor: blue[500],
    },
  }));
  const classes = useStyles();
  // <---------------------->

  //note component
  return (
    <Card className={classes.root} id={`card${props.id}`}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <EventNoteIcon />
          </Avatar>
        }
        title={
          <p
            onPaste={(e) => {
              e.preventDefault();
              alert("you cannot paste");
            }}
            className="paragraph"
            contentEditable={editable}
            suppressContentEditableWarning={true}
            id={`editabletitle${props.id}`}
          >
            <strong>{props.noteval.title}</strong>
          </p>
        }
        subheader={"TODO or NOTE is here ⬇️"}
      />

      <CardContent>
        <p
          onPaste={(e) => {
            //preventation for copy paste
            e.preventDefault();
            alert("you cannot paste");
          }}
          className="paragraph"
          contentEditable={editable}
          suppressContentEditableWarning={true}
          id={`editablecontent${props.id}`}
        >
          {props.noteval.content}
        </p>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          id={`edit${props.id}`}
          onClick={() => {
            document.getElementById(`edit${props.id}`).style.display = "none";
            document.getElementById(`save${props.id}`).style.display = "block";

            //style for deletebtn when is edit btn is click,
            var delhide = document.querySelectorAll(".delbtn");
            for (let i = 0; i < delhide.length; i++) {
              delhide[i].style.display = "none";
            }

            //change value of content editable state
            neweditable("true");

            //some basic style for basic userinterface
            let editcontent = document.getElementById(
              `editablecontent${props.id}`
            );
            editcontent.style.border = "solid 2px black";
            editcontent.style.borderRadius = "4px";
            let edittitle = document.getElementById(`editabletitle${props.id}`);
            edittitle.style.border = "solid 2px black";
            edittitle.style.borderRadius = "4px";
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          id={`save${props.id}`}
          style={{ display: "none" }}
          onClick={() => {
            //style for editicon and title and content
            document.getElementById(`save${props.id}`).style.display = "none";
            document.getElementById(`edit${props.id}`).style.display = "block";
            neweditable("false");
            document.getElementById(`editablecontent${props.id}`).style.border =
              "none";
            document.getElementById(`editabletitle${props.id}`).style.border =
              "none";

            //style for deletebtn when is save btn is click,
            var delshow = document.querySelectorAll(".delbtn");
            for (let i = 0; i < delshow.length; i++) {
              delshow[i].style.display = "block";
            }

            //get value from input so we can pass it to parent component
            let newcontent = document.getElementById(
              `editablecontent${props.id}`
            ).innerText;
            let newtitle = document.getElementById(
              `editabletitle${props.id}`
            ).innerText;

            //parent function for update data in database

            props.takenewval(newcontent, newtitle, props.id);
          }}
        >
          <CheckIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            //parent function for delete note from database
            props.delfunc(props.id);
          }}
        >
          <DeleteIcon className="delbtn" />
        </IconButton>
        <FavoriteBorderIcon
          className="favborder"
          style={{ color: "rgb(117,117,117,1)", marginLeft: "3rem" }}
          id={`unfav${props.id}`}
          onClick={() => {
            //parent function for set fav value 'true'
            props.fav(props.id);

            //style for icon
            document.getElementById(`unfav${props.id}`).style.display = "none";
            document.getElementById(`fav${props.id}`).style.display = "block";
          }}
        />
        <FavoriteIcon
          className="favfull"
          id={`fav${props.id}`}
          style={{
            display: "none",
            marginLeft: "3rem",
            color: "rgb(239 21 97)",
          }}
          onClick={() => {
            //parent function for set fav value 'true'
            props.unfav(props.id);

            //style for icon
            document.getElementById(`unfav${props.id}`).style.display = "block";
            document.getElementById(`fav${props.id}`).style.display = "none";
          }}
        />
      </CardActions>
    </Card>
  );
}

export default Note;
