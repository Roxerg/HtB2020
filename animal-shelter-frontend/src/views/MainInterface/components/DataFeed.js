import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import DataPost from "./DataPost.js";
import AddPost from "./AddPost";
import { getPosts } from "../../../utils";
import SkeletonPost from "./SkeletonPost.js";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    header: {
        marginBottom: theme.spacing(1)
    },
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
            <Card className={classes.header}>
                <CardHeader title="Your top posts" />
                <CardContent>
                    <Typography variant="body">Here you can see your most loved and most sponsored puppers!</Typography>
                </CardContent>
            </Card>
            {posts.length > 0
                ? posts.map(el => {
                      return <DataPost donated {...el} setDirty={setDirty} />;
                  })
                : [...Array(5)].map(el => <SkeletonPost />)}
        </div>
    );
};

export default PostFeed;
