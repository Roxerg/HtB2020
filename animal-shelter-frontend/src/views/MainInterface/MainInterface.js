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
import DataFeed from "./components/DataFeed";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import PropTypes from "prop-types";

function ScrollTop(props) {
    const { children, window } = props;
    const classes = useStyles();
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100
    });

    const handleClick = event => {
        const anchor = (event.target.ownerDocument || document).querySelector("#back-to-top-anchor");

        if (anchor) {
            anchor.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.scrollToTop}>
                {children}
            </div>
        </Zoom>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func
};

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
    },
    scrollToTop: {
        position: "fixed",
        bottom: theme.spacing(3),
        left: "calc(50vw - 50px)"
    },
    topToolbar: {
        height: 0,
        minHeight: 0
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
                    <User profile={props.profile} banking={props.banking} />
                </Toolbar>
            </AppBar>
            <Toolbar className={classes.topToolbar} id="back-to-top-anchor" />
            <div className={classes.mainContent}>
                <Container maxWidth={props.profile.is_organisation ? "md" : "sm"}>
                    {props.profile["is_organisation"] ? (
                        <Grid container spacing={3}>
                            <Grid item xs={8}>
                                <PostFeed profile={props.profile} />
                            </Grid>
                            <Grid item xs={4}>
                                <DataFeed profile={props.profile} />
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <PostFeed profile={props.profile} />
                            </Grid>
                        </Grid>
                    )}
                </Container>
            </div>
            <ScrollTop {...props}>
                <Fab color="primary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </Grid>
    );
}
