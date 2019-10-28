import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ProfileCard from '../Components/ProfileCard';


const CoverLetter = props => {
  const { classes, ProfileCardProps, content, scrollRef } = props;

  const handleScroll = (e) => {
    console.log('scroll');
  }

  return (
    <div onScroll={handleScroll} onClick={handleScroll} ref={scrollRef}>
      <ProfileCard {...ProfileCardProps} />
      <Paper elevation={3} >
        <Typography variant="h4" >
          {content ? content.coverLetter.title : ''}
        </Typography>

        <Typography variant="body2">
          {content ? content.coverLetter.description : ''}
        </Typography>
      </Paper>
    </div>
  );
};


export default CoverLetter;
