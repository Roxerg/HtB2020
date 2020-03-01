import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Fab from "@material-ui/core/Fab";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

const useStyle = makeStyles(theme => ({
    fab: {
        position: "fixed",
        bottom: 25,
        right: 25
    }
}));

const AddPost = props => {
    const [expanded, setExpanded] = useState(false);
    const classes = useStyle();
    if (!props.is_organisation) {
        return null;
    }
    return (
        <>
            <Dialog onClose={e => setExpanded(false)} open={expanded}>
                <DialogTitle>Add Post</DialogTitle>
            </Dialog>
            <Fab className={classes.fab} color="primary" onClick={e => setExpanded(true)}>
                +
            </Fab>
        </>
    );
};

export default AddPost;
