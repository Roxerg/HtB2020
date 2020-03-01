import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Post from './Post.js'

const useStyles = makeStyles(theme => ({

    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function PostFeed(props) {

    const classes = useStyles();
    return (
        <div>
            <Post donated liked/>
        </div>
    );
}