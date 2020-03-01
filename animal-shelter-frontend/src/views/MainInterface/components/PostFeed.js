import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Post from "./Post.js";
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

    if (posts.length == 0) {
        getPosts(setPosts);
    }

    const classes = useStyles();
    return (
        <div>
            {posts.map(el => {
                return <Post donated {...el} />;
            })}
        </div>
    );
};

export default PostFeed;
