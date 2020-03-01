import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import DataPost from "./DataPost.js";
import AddPost from "./AddPost";
import { getCurrentUserPosts } from "../../../utils";
import SkeletonPost from "./SkeletonPost.js";
import BoneIconActive from "../images/bone-active.png";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles(theme => ({
    header: {
        marginBottom: theme.spacing(1)
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary
    },
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    inline: {
        display: "inline"
    },
    likeIcon: {
        marginRight: "3px",
        height: "10px",
        width: "10px",
        color: theme.palette.secondary.main
    },
    dogIcon: {
        marginRight: "3px",
        height: "10px",
        width: "10px"
    }
}));

const PostFeed = props => {
    const [posts, setPosts] = useState([]);
    const [isDirty, setDirty] = useState(true);

    console.log("postfeed", props);

    if (isDirty) {
        getCurrentUserPosts(setPosts, setDirty);
    }

    const classes = useStyles();
    return (
        <div>
            <Card className={classes.header}>
                <CardHeader title="Your top posts" />
                <div style={{ padding: "16px", paddingTop: "0px" }}>
                    <Typography variant="body">Here you can see your most loved and most sponsored puppers!</Typography>
                </div>
                <List className={classes.root}>
                    {posts.length > 0
                        ? posts.map(el => (
                              <div>
                                  <Divider variant="inset" component="li" />

                                  <ListItem alignItems="flex-start">
                                      <ListItemAvatar>
                                          <Avatar alt={el.name} src={el.transloadit_id} />
                                      </ListItemAvatar>
                                      <ListItemText
                                          primary={el.name}
                                          secondary={
                                              <React.Fragment>
                                                  <p style={{ margin: 0 }}>
                                                      <FavoriteIcon className={classes.likeIcon} />
                                                      <span style={{ color: "#dc004e" }}>{el.total_likes}, &nbsp; </span>
                                                      <img className={classes.dogIcon} src={BoneIconActive} />
                                                      <span style={{ color: "#e2aa42" }}>{el.balance}</span>
                                                  </p>
                                              </React.Fragment>
                                          }
                                      />
                                  </ListItem>
                              </div>
                          ))
                        : [...Array(5)].map(el => <SkeletonPost />)}
                </List>
            </Card>
        </div>
    );
};

export default PostFeed;
