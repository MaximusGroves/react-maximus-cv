import React, { useState, memo } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';



const blankContent = {
  coverLetter: {
    title: '',
    description: '',
    repo: '',
    repoHost: '',
    body: []
  },
  aboutMe: {
    title: '',
    description: []
  },
  toDo: {
    title: '',
    description: []
  }
};

const style = theme => ({
  itemDone: {
    textDecoration: 'line-through',
    color: theme.palette.primary.main
  },

  itemPending: {},

  pushRight: {
    marginRight: 'auto'
  },
  pushLeft: {
    marginLeft: 'auto'
  },

  listPaper: {
    maxWidth: 800,
    margin: '0 auto',
    padding: 0
  },

  inputField: {
    width: '100%',
    display: 'block',
    maxWidth: 800,
    margin: '30px auto'
  },

  centerBtn: {
    display: 'block',
    margin: '0 auto'
  },

  itemText: {
    maxWidth: 'calc( 100% - 140px )',
    textAlign: 'center'
  }
});

const Video = memo(props => {
  const { classes, className, viewRef } = props;

  // const useContent = content || blankContent;

  return (
    <div className={className} ref={viewRef}>
      <Paper elevation={3}>
        <Typography variant="h4">{'Video'}</Typography>
      </Paper>
    </div>
  );
});

Video.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  viewRef: PropTypes.func
};
export default withStyles(style)(Video);
