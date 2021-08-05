require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const noteschema = require("./models/noteschema");

const app = express();
const PORT=process.env.PORT ||3001;
mongoose
  .connect(process.env.DB_LINK,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("connnection suceesful"));
  // <---------------------->


// 🔴 🔺🔻🔺🔻🔺🔻🔺🔻🔺🔻🔺🔻🔺🔻 🔴
// i am agog for gain knowledge,if you have any suggestion about this project and fullstack,if you can give me it's really appriciate 🤯;

app.use(express.json());

//method for add note to database
app.post("/adddatatodb", (req, res) => {
  let notedata = new noteschema({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    content: req.body.content,
    fav: req.body.fav,
  });
  notedata.save().then((out) => console.log(out));
});
  // <---------------------->


//method for fetch note from database
app.get("/data", (req, res) => {
  noteschema.find({}).then((data) => res.send(data));
});
  // <---------------------->


//method for delete note from database
app.delete("/delete/:id", (req, res) => {
  noteschema.findOneAndDelete({ _id: req.params.id }).then((res) => {
    console.log(res);
  });
});
  // <---------------------->


//method for update note value in database
app.patch("/fav/:id", (req, res) => {
  console.log(req.params.id);
  noteschema
    .findByIdAndUpdate({ _id: req.params.id }, { $set: { fav: "true" } })
    .then((result) => res.send(result));
});
  // <---------------------->


//method for update fav val 'true'
app.patch("/unfav/:id", (req, res) => {
  console.log(req.params.id);
  noteschema
    .findByIdAndUpdate({ _id: req.params.id }, { $set: { fav: "false" } })
    .then((result) => res.send(result));
});
  // <---------------------->


//method for update fav val 'false'
app.patch("/updateval/:id/:title/:content", (req, res) => {
  console.log(req.params.id);
  noteschema
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: `${req.params.title}`,
          content: `${req.params.content}`,
        },
      }
    )
    .then((result) => res.send(result));
});
  // <---------------------->


//production logic
if(process.env.NODE_ENV=='production'){
  app.use(express.static('client/build'));
}


app.listen(PORT);
