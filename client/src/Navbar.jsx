import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

// 🔴 🔺🔻🔺🔻🔺🔻🔺🔻🔺🔻🔺🔻🔺🔻 🔴
// i am eager for gain knowledge,if you have any suggestion about this project and fullstack,if you can give me it's really appriciate 🤯;

function Navbar(props) {
  //style for navbar
  const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },

    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: "3rem",
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      marginLeft: "0.5rem",
      [theme.breakpoints.up("md")]: {
        width: "25ch",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  }));
  const classes = useStyles();
  // <---------------------->

  return (
    <>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Magic-Notes By JD
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon id="searchicon" />
              </div>
              <InputBase
                onPaste={(e) => {
                  e.preventDefault();
                  alert("you cannot paste");
                }}
                onChange={(e) => {
                  //search bar function and validation
                  if (props.dbnote.length === 0) {
                    e.target.value = "";
                    alert("please 🙏 add some note ");
                  } else {
                    props.dbnote.forEach((val) => {
                      let content = val.content;
                      let title = val.title;
                      if (
                        content.includes(e.target.value) ||
                        title.includes(e.target.value)
                      ) {
                        document.getElementById(
                          `card${val._id}`
                        ).style.display = "block";
                      } else {
                        document.getElementById(
                          `card${val._id}`
                        ).style.display = "none";
                      }
                    });
                  }
                  if (e.target.value.length > 0) {
                    document.getElementById("show_fav").style.display = "none";
                  } else {
                    document.getElementById("show_fav").style.display = "block";
                  }
                }}
                placeholder="Search By Note-Content"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                id="searchbar"
              />
            </div>
            <div className={classes.grow} />
            <FavoriteBorderIcon
              id="show_fav"
              style={{ cursor: "pointer" }}
              onClick={() => {
                //function for show a favourite notes
                document.getElementById("searchbar").style.display = "none";
                document.getElementById("searchicon").style.display = "none";

                props.dbnote.forEach((val) => {
                  if (val.fav === "false") {
                    document.getElementById(`card${val._id}`).style.display =
                      "none";
                  }
                });

                //style
                document.getElementById("show_all").style.display = "block";
                document.getElementById("show_fav").style.display = "none";
                document.getElementById("asset_div").style.display = "none";
              }}
            />

            <FavoriteIcon
              id="show_all"
              style={{ display: "none", cursor: "pointer" }}
              onClick={() => {
                //function for show all notes
                document.getElementById("searchbar").style.display = "block";
                document.getElementById("searchicon").style.display = "block";

                props.dbnote.forEach((val) => {
                  document.getElementById(`card${val._id}`).style.display =
                    "block";
                });

                //style
                document.getElementById("show_all").style.display = "none";
                document.getElementById("asset_div").style.display = "flex";
                document.getElementById("show_fav").style.display = "block";
              }}
            />
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
export default Navbar;
