import React from "react";
import { useState } from "react";
import App from "./App";
import Navbar from "./Navbar";
import axios from "axios";
import { useEffect } from "react";

// 🔴 🔺🔻🔺🔻🔺🔻🔺🔻🔺🔻🔺🔻🔺🔻 🔴
// i am agog for gain knowledge,if you have any suggestion about this project and fullstack,if you can give me it's really appriciate 🤯;

function Mgn() {
  //state for store note which is fetch from database
  const [dbnote, newdbnote] = useState([]);
  // <---------------------->

  //function for fetch note from database and stored in state
  const practice = async () => {
    let rawdata = await axios.get("/data");
    let finaldata = await rawdata.data;
    await newdbnote(finaldata);
  };
  // <---------------------->

  //use effect for fetch note from database when dom will be render
  useEffect(() => {
    practice();
  }, []);
  // <---------------------->

  //use effect for favourite note
  useEffect(() => {
    //this function is only for favnote so in this we only fetch note from database and run forEach on it,no need for state update
    const showfavicon = async () => {
      let rawdata = await axios.get("/data");
      let finaldata = await rawdata.data;
      await finaldata.forEach((val, index) => {
        if (val.fav === "true") {
          document.getElementById(`fav${val._id}`).style.display = "block";
          document.getElementById(`unfav${val._id}`).style.display = "none";
        }
      });
    };
    //call function for favourite note showed
    showfavicon();
  }, []);
  // <---------------------->

  return (
    <>
      <Navbar practice={practice} dbnote={dbnote}></Navbar>
      <App practice={practice} dbnote={dbnote} />
    </>
  );
}

export default Mgn;
