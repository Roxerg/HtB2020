import React, { useState } from "react";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(theme => ({
    fab: {
        position: "absolute",
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
    return expanded ? null : (
        <Fab className={classes.fab} color="primary" onClick={e => setExpanded(true)}>
            +
        </Fab>
    );
};

export default AddPost;
