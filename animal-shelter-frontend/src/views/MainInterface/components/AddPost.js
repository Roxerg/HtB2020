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
import TextField from "@material-ui/core/TextField";

import { addPost } from "../../../utils";

const useStyles = makeStyles(theme => ({
    input: {
        display: "none"
    },
    root: {
        marginBottom: theme.spacing(2)
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
        backgroundColor: theme.palette.primary.light
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

const addFile = function(files, postData) {
    console.log(files);
    var uppy = window.Robodog.upload(files, {
        params: {
            // To avoid tampering, use Signature Authentication
            waitForEncoding: true,
            waitForMetadata: true,
            alwaysRunAssembly: false,
            auth: { key: "767c29efcda9405eab93e3988be1bca1" },
            template_id: "703021ed1a684c3282085de390059cdb"
        }
    })
        .then(async function(bundle) {
            console.log(bundle);
            let uploading = bundle.transloadit[0].ok;
            let r;
            while (uploading != "ASSEMBLY_COMPLETED") {
                console.log("transloadit", bundle.transloadit[0].assembly_ssl_url);
                r = await (await fetch(bundle.transloadit[0].assembly_ssl_url)).json();
                uploading = r.ok;
            }
            let img_url;
            console.log("r", r);
            if (!r.results.crop_thumbed || r.results.crop_thumbed.length == 0) {
                alert("Please upload a picture of a dog on its own!");
                return;
            } else {
                img_url = r.results.crop_thumbed[0].ssl_url;
            }
            addPost({
                transloadit_id: img_url,
                name: postData.name,
                text: postData.text
            });
        })
        .catch(console.error);
};

const AddPost = props => {
    const [expanded, setExpanded] = useState(false);
    const [postData, setPostData] = useState({});
    const classes = useStyles();
    console.log("addpost", props);
    if (!props.profile.is_organisation) {
        return null;
    }
    return (
        <Card className={classes.root}>
            <CardHeader title="Add Post" />
            <form>
                <CardContent>
                    <TextField label="Dog's name" onChange={e => setPostData({ ...postData, name: e.target.value })} value={postData.name} required fullWidth />
                    <TextField label="Description" onChange={e => setPostData({ ...postData, text: e.target.value })} value={postData.text} required fullWidth multiline />
                    <input accept="image/*" className={classes.input} id="contained-button-file" type="file" onChange={e => setPostData({ ...postData, files: e.target.files })} />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="primary" component="span">
                            Upload
                        </Button>
                    </label>
                </CardContent>
                <CardActions disableSpacing>
                    <div className={classes.boneCount}>
                        <Button
                            className={classes.regularButton}
                            type="submit"
                            onClick={e => {
                                e.preventDefault();
                                addFile(postData.files, postData);
                            }}
                        >
                            Add!
                        </Button>
                    </div>
                </CardActions>
            </form>
        </Card>
    );
};

export default AddPost;
