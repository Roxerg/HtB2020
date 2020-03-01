import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "./images/logo.png";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import PostFeed from "./components/PostFeed";
import User from "./components/User";
import AddPost from "./components/AddPost";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © Animal Shelter Social Media "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },

    title: {
        flexGrow: 1,
        fontWeight: 500
    },
    logo: {
        height: "35px",
        marginRight: theme.spacing(1)
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary
    },
    mainContent: {
        padding: theme.spacing(2),
        width: "100%"
    }
}));

export default function MainInterface(props) {
    console.log(props);
    const classes = useStyles();
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <img src={Logo} className={classes.logo} />
                    <Typography variant="h6" className={classes.title}>
                        PawPals
                    </Typography>
                    <User profile={props.profile} />
                </Toolbar>
            </AppBar>
            <div className={classes.mainContent}>
                <Container maxWidth="md">
                    {props.profile["is_organisation"] ? (
                        <Grid container spacing={3}>
                            <Grid item xs={8}>
                                <PostFeed />
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className={classes.paper}>Secondary Area</Paper>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <PostFeed />
                            </Grid>
                        </Grid>
                    )}
                </Container>
            </div>
            <AddPost is_organisation={props.profile.is_organisation} />
        </Grid>
    );
}
