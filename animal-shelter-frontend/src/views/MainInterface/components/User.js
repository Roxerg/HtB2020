import React from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Link from "@material-ui/core/Link";
import { logout } from "../../../utils";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2)
    },
    text: {
        fontWeight: 500
    },
    profileImg: {
        height: 48,
        width: 48,
        borderRadius: 25,
        marginRight: 10
    },
    icon: {
        height: "100%",
        margin: theme.spacing(2)
    }
}));

const User = props => {
    console.log("user", props);
    const classes = useStyles();
    return (
        <>
            <img className={classes.profileImg} src={`https://api.adorable.io/avatars/${props.profile.uid}`} />
            <Typography variant="h6" className={classes.text}>
                {props.profile.name}
            </Typography>
            <ExitToAppIcon className={classes.icon} onClick={logout} />
        </>
    );
};

export default User;
