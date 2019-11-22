import React from 'react';
import Paper from '@material-ui/core/Paper';
// import {Link} from 'react-router-dom';
// import Mailto from 'react-protected-mailto';
import Typography from '@material-ui/core/Typography';

import ProfileCard from '../Components/ProfileCard';


import ResumePdf from '../../assets/data/MaxGrovesResume2019.pdf';

const blankContent = {
  coverLetter: {
    title: "",
    description: "",
    repo: "",
    repoHost: "",
    body: [ ]
  },
  aboutMe: {
    title: "",
    description: []
  },
  toDo: {
    title: "",
    list: [ ]
  }
}


const CoverLetter = props => {
  const { classes, ProfileCardProps, content, email, className, viewRef } = props;

  const useContent = content || blankContent;
  const {repo} = useContent.coverLetter;

  return (
    <div className={className} ref={viewRef} >
      <ProfileCard {...ProfileCardProps} email={email} repo={repo} />
      <Paper elevation={3} >
        <Typography variant="h4" >
          {useContent.coverLetter.title}
        </Typography>

        <Typography variant="body2">
          {useContent.coverLetter.description}
        </Typography>

        <Typography variant="body2">
          You may view the source for this page at <a href={useContent.coverLetter.repo} target="_blank">{useContent.coverLetter.repoHost}</a>
        </Typography>

        {useContent.coverLetter.body.map(text=>(
          <Typography variant="body2">
            {text}
          </Typography>
        ))}

        <Typography variant="body2">
          Reach out at <a href={`mailto:${email}`} >{email}</a>
        </Typography>

        <Typography variant="body2">
          <a href={ResumePdf} target="_blank" >Download Resume</a>
        </Typography>



      </Paper>

      {/*<Paper elevation={3} >*/}
        {/*<Typography variant="h4" >*/}
          {/*{useContent.aboutMe.title}*/}
        {/*</Typography>*/}

        {/*{useContent.aboutMe.description.map(text=>(*/}
          {/*<Typography variant="body2">*/}
            {/*{text}*/}
          {/*</Typography>*/}
        {/*))}*/}

        {/*<Typography variant="body2">*/}
          {/*Please reach out for any reason to <a href={`mailto:${email}`} >{email}</a>*/}
        {/*</Typography>*/}


      {/*</Paper>*/}

      <Paper elevation={3} >
        <Typography variant="h4" >
          {useContent.toDo.title}
        </Typography>

        {useContent.toDo.list.map(item=>(
          <Typography variant="body2">
            {item}
          </Typography>
        ))}


      </Paper>
    </div>
  );
};


export default CoverLetter;
