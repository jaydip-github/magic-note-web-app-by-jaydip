import { React, useState } from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import Note from "./Note";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

// 🔴🔺🔻🔺🔻🔺🔻🔺🔻🔺🔻🔺🔻🔺🔻 🔴
// i am eager for gain knowledge,if you have any suggestion about this project and fullstack dev,if you can give me it's really appriciate 🤯;

function App(props) {
  //use state for note
  const [note, newnote] = useState({
    title: "",
    content: "",
    fav: "false",
  });
  // <---------------------->

  //this is input function for store input value in state,it is call only on onChange method
  function noteinput(event) {
    newnote((preval) => {
      return {
        ...preval,
        [event.target.name]: event.target.value,
      };
    });
  }
  // <---------------------->

  //function for add note in database,it's include also validation
  function addnote() {
    //validation for fake data
    if (note.title === "") {
      alert("Plz Write a Title  👇 😄");
    } else if (note.title.length > 25) {
      alert("Plz Write a valid Title  👇 😄");
    } else if (note.content === "") {
      alert("Plz Write a Note  👇 😄");
    } else {
      //for store note in database
      const { title, content, fav } = note;
      const adddatadb = () => {
        console.log("add data in db");
        fetch("/adddatatodb", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            fav,
          }),
        });
      };
      adddatadb();

      //this function arrived from parent component,its job is fetch note from database and update state which is defined for store note.
      props.practice();

      //reset value of input field for simplicity and functionlity of project.
      newnote(() => {
        return {
          title: "",
          content: "",
          fav: "false",
        };
      });
    }
  }
  // <---------------------->

  //function for delete note from database and conformation
  async function deletenote(id) {
    const deleteornot = window.confirm("are you want to delete this note 😲");
    //conformation for delete note
    if (deleteornot === true) {
      window.location.reload();

      //delete note from database
      await axios.delete("/delete/" + id);

      //parent function for fetch note and update state
      await props.practice();
    }
  }
  // <---------------------->

  //function for update note value in database
  async function neweditval(newcontent, newtitle, id) {
    await axios.patch(`/updateval/${id}/${newtitle}/${newcontent}`);

    //parent function for fetch note and update state
    await props.practice();
  }
  // <---------------------->

  //function for set fav value 'true' in database
  async function isfavourite(id) {
    await axios.patch("/fav/" + id).then(console.log("updated"));

    //parent function for fetch note and update state
    await props.practice();
  }
  // <---------------------->

  //function for set fav value 'false' in databasee
  async function isunfavourite(id) {
    await axios.patch("/unfav/" + id).then(console.log("updated"));

    //parent function for fetch note and update state
    await props.practice();
  }
  // <---------------------->

  return (
    <>
      <div className="main_div">
        <div className="input_div" id="asset_div">
          <h1> magic-notes</h1>
          <input
            type="text"
            id="input_id"
            name="title"
            value={note.title}
            placeholder="Write a Title "
            onChange={noteinput}
            autoComplete="off"
            onPaste={(e) => {
              e.preventDefault();
              alert("you cannot paste");
            }}
          />
          <div className="form-floating">
            <textarea
              className="form-control"
              style={{ resize: "none", paddingTop: "7px" }}
              name="content"
              value={note.content}
              onChange={noteinput}
              onPaste={(e) => {
                e.preventDefault();
                alert("you cannot paste");
              }}
            ></textarea>
          </div>
          <div className="btndiv">
            <Tooltip title="Add Note">
              <Button variant="contained" onClick={addnote} color="default">
                <AddIcon color="primary"></AddIcon>
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="notes" id="notes">
          {props.dbnote.map((val, index) => {
            return (
              <Note
                noteval={val}
                key={index}
                id={val._id}
                delfunc={deletenote}
                takenewval={neweditval}
                fav={isfavourite}
                unfav={isunfavourite}
              ></Note>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
