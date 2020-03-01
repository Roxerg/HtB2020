import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import BoneIconGray from "../images/bone-outline.png";
import BoneIconActive from "../images/bone-active.png";

import { addLike, removeLike } from "../../../utils";

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(2)
    },
    media: {
        height: 0,
        paddingTop: "90%"
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: "rotate(180deg)"
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        width: theme.spacing(7),
        height: theme.spacing(7)
    },
    avatarImg: {
        width: "100%"
    },
    boneCount: {
        marginLeft: "auto"
    },
    likeIcon: {
        marginRight: "7px"
    },
    regularButton: {
        color: "#757575"
    },
    boneIcon: {
        marginRight: "7px",
        height: "20px"
    },
    boneButtonActive: {
        color: "#e2aa42"
    }
}));

export default function Post(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar}>
                        <img src={props.transloadit_id} className={classes.avatarImg} />
                    </Avatar>
                }
                title={<Typography variant="h7">{props.name}</Typography>}
            />
            <CardContent>
                <Typography variant="body" color="textSecondary" component="p">
                    {props.text}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button color={props.has_liked ? "secondary" : "default"} className={!props.has_liked && classes.regularButton} disabled>
                    <FavoriteIcon className={classes.likeIcon} />
                    {props.total_likes}
                </Button>
                <div className={classes.boneCount}>
                    <Button className={props.donated ? classes.boneButtonActive : classes.regularButton} disabled>
                        <img className={classes.boneIcon} src={props.donated ? BoneIconActive : BoneIconGray} /> {props.balance}
                    </Button>
                </div>
            </CardActions>
        </Card>
    );
}
