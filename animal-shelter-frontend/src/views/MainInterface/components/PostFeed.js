import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Post from "./Post.js";
import AddPost from "./AddPost";
import { getPosts } from "../../../utils";
import SkeletonPost from './SkeletonPost.js';

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
            <div style={{margin: '16px'}}>
            {
                posts.length > 0 ? (
                    posts.map(el => {
                        return <Post donated {...el} setDirty={setDirty} />;
                    })
                ) : (
                        [...Array(5)].map(el => (
                            <SkeletonPost />
                        ))
                    )
            }
</div>
        </div>
    );
};

export default PostFeed;
