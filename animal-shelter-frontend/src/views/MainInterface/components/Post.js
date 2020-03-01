import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import Button from '@material-ui/core/Button'
import BoneIconGray from '../images/bone-outline.png'
import BoneIconActive from '../images/bone-active.png'

const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: '90%', 
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
  },
  avatarImg: {
      width: '100%'
  },
  boneCount: {
      marginLeft: 'auto',
  },
  likeIcon: {
      marginRight: '7px'
  },
  regularButton: {
      color:"#757575"
  },
  boneIcon: {
    marginRight: '7px',
    height: '20px'
}, 
boneButtonActive: {
    color: '#e2aa42'
}
}));

export default function Post(props) {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            <img src={'https://api.adorable.io/avatars/' + '41e77d96d4a541919c0306ed8e1e6a21'} className={classes.avatarImg} />
          </Avatar>
        }
        title="Drake the Doggo"
        subheader="The Fabulous Dog Shelter"
      />
      <CardMedia
        className={classes.media}
        image="http://storage.googleapis.com/prismatic-cider-223805-vcm/doggos/41e77d96d4a541919c0306ed8e1e6a21"
        title="Doggo"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This is a loving kind dog who is doing his absolute best to find a loving friend.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button color={props.liked ? "secondary" : "default"} className={!props.liked && classes.regularButton}><FavoriteIcon className={classes.likeIcon} />4.4k</Button>
        <div className={classes.boneCount}>
        <Button  className={props.donated? classes.boneButtonActive : classes.regularButton}><img className={classes.boneIcon} src={props.donated ? BoneIconActive : BoneIconGray} /> 1.2k</Button>
        </div>
      </CardActions>
    </Card>
  );
}
