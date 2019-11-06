import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ExperienceCard from '../Components/ExperienceCard';



const Career = props => {

  const { experience, content, className, viewRef } = props;

  return (
    <div className={className} ref={viewRef} >
      <Paper elevation={3} >
        <Typography variant="h4" >
          {content ? content.experience.title : ''}
        </Typography>
        <Typography variant="body2">
          {content ? content.experience.description : ''}
        </Typography>
        {experience.map((job, idx) =>
          <ExperienceCard
            job={job}
            idx={idx}
            key={'experienceCard'+idx}
          />
        )}
      </Paper>

      <Paper elevation={3} >
        <Typography variant="h4" >
          {content ? content.clients.title : ''}
        </Typography>
        <Typography variant="body2">
          {content ? content.clients.description : ''}
        </Typography >
        {experience.map((job, idx) =>
          <ExperienceCard
            job={job}
            idx={idx}
            key={'clientCard'+idx}
          />
        )}
      </Paper>
    </div>
  );
}



export default Career;
