import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Post from "./Post.js";
import AddPost from "./AddPost";
import { getPosts } from "../../../utils";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary
    }
}));

const PostFeed = props => {
    const [posts, setPosts] = useState([]);
    const [isDirty, setDirty] = useState(true);

    console.log("postfeed", props);

    if (isDirty) {
        getPosts(setPosts, setDirty);
    }

    const classes = useStyles();
    return (
        <div>
            {props.profile.is_organisation ? <AddPost profile={props.profile} /> : null}
            {posts.map((el, key) => {
                return <Post donated {...el} setDirty={setDirty} key={key} />;
            })}
        </div>
    );
};

export default PostFeed;
