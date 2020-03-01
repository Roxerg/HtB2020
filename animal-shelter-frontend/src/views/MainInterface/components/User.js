import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircle from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/AlternateEmail";
import PlusIcon from "@material-ui/icons/Add";
import WithdrawIcon from "@material-ui/icons/TransitEnterexit";
import DecriptionIcon from "@material-ui/icons/Notes";
import LocationIcon from "@material-ui/icons/LocationOn";
import Link from "@material-ui/core/Link";
import { logout } from "../../../utils";
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import BoneIcon from '../images/bone-active.png';
import Button from '@material-ui/core/Button';

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
        marginRight: -5,
        border: '2px solid #FFFFFF',
        padding: '2px'
    },
    icon: {
        height: "100%",
        margin: theme.spacing(2)
    },
    profileOverview: {
        zIndex: '10000'
    },
    profileContainer: {
        padding: theme.spacing(4),
        minWidth: '20vw',
        maxWidth: '30vw'
    },
    typography: {
        margin: 0,
        float: 'left'
    }
}));

const User = props => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const classes = useStyles();

    const handleClick = newPlacement => event => {
        setAnchorEl(event.currentTarget);
        setOpen(prev => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };
    return (
        <div>
            <Popper open={open} anchorEl={anchorEl} placement={placement} transition className={classes.profileOverview}>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper className={classes.profileContainer}>
                            <div style={{ display: 'flex' }}>
                                <AccountCircle style={{ float: 'left', marginRight: '7px' }} /><h3 className={classes.typography}>{props.profile.name}</h3>
                            </div>
                            <div style={{ display: 'flex', marginTop: '7px' }}>
                                <EmailIcon style={{ float: 'left', marginRight: '7px' }} /><p className={classes.typography}>{props.profile.email}</p>
                            </div>
                            <div style={{ display: 'flex', marginTop: '7px' }}>
                                <LocationIcon style={{ float: 'left', marginRight: '7px' }} /><p className={classes.typography}>{props.profile.location}</p>
                            </div>
                            <div style={{ display: 'flex', marginTop: '7px' }}>
                                <DecriptionIcon style={{ float: 'left', marginRight: '7px' }} /><p className={classes.typography}>{props.profile.description}</p>
                            </div>
                            <Divider style={{ marginTop: '7px' }} />
                            <div onClick={() => console.log('yo')} style={{ display: 'flex', marginTop: '7px', cursor: 'pointer' }}>
                                <img src={BoneIcon} style={{ float: 'left', marginRight: '7px', height: '22px' }} /><p className={classes.typography} style={{ color: '#e2aa42' }}>{props.profile.balance || 0} Smackeroonies </p>
                                {
                                    props.profile.is_organisation ? (
                                        <WithdrawIcon style={{ color: '#e2aa42', position: 'absolute', right: '32', marginTop: '-2px' }} />
                                    ) : (
                                            <PlusIcon style={{ color: '#e2aa42', position: 'absolute', right: '32', marginTop: '-2px' }} />
                                        )
                                }
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '12px', marginBottom: '-16px' }}>
                                <Button
                                    onClick={() => logout()}
                                    variant="contained"
                                    color="default"
                                    className={classes.button}
                                    startIcon={<ExitToAppIcon />}
                                >
                                    Logout
                            </Button>
                            
                            </div>
                        </Paper>
                    </Fade>
                )}
            </Popper>

            <a style={{cursor: "pointer"}} onClick={handleClick('bottom-end')}><img className={classes.profileImg} src={`https://api.adorable.io/avatars/${props.profile.uid}`} /></a>
        </div>
    );
};

export default User;
