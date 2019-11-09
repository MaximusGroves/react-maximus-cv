import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ProfileCard from '../Components/ProfileCard';


const CoverLetter = props => {
  const { classes, ProfileCardProps, content, className, viewRef } = props;

  const toDoList = [

    "Make interactive toDo list",
    "Write welcome cover letter explaining mission and technology stack in this site",
    "Write introduction/bios for each view/tab/section",
    "Write bio for each past job",
    "Compile list of subcontracted jobs worth showing off",
    "Add section in 'Comedy' for video editing",
    "Implement serverless CMS to host interactive content",
    "Move Shopify api calls into netlify's lambda functions",
    "Select color palette for 'Villain' theme",
    "Write logic to prevent selection of nonexisting product variants",
    "Add buttons & functionality for podcast playback speed",
    "size iframe content responsively",
    "alter image crossfader to wait for onload event before performing fade",
    "decouple tabState from view position to prevent excessive rendering",
    "setup transition listeners for list filtering to animate their adding/removing",
    "add graphics to the sides to appear when there's no new view to scroll to",
    "create animation trail for content appearing first time you enter a tab or on api load",
    "display 'loading' spinner when waiting for api calls",

    
  ];

  return (
    <div className={className} ref={viewRef} >
      <ProfileCard {...ProfileCardProps} />
      <Paper elevation={3} >
        <Typography variant="h4" >
          {content ? content.coverLetter.title : ''}
        </Typography>

        <Typography variant="body2">
          {content ? content.coverLetter.description : ''}
        </Typography>
      </Paper>

      <Paper elevation={3} >
        <Typography variant="h4" >
          ToDo:
        </Typography>

        {toDoList.map(item=>(
          <Typography variant="body2">
            {item}
          </Typography>
        ))}


      </Paper>
    </div>
  );
};


export default CoverLetter;
