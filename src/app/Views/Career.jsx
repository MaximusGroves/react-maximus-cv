import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ExperienceCard from '../Components/ExperienceCard';
import ClientsCard from '../Components/ClientsCard';



const blankContent = {
  experience:{
    title: "",
    description: "",
    list: [ ]
  },
  clients:{
    title: "",
    description: "",
    lists: [
      {
        title:"",
        description:"",
        list: [ ],
      }
    ]
  }
};

const clientList = (list, idx) => {

  return (
    <div style={{paddingTop:idx===0 ? 0 : 24}}>
      <Typography variant="h5" >
        {list.title}
      </Typography>
      <Typography variant="body2">
        {list.description}
      </Typography >

      {list.list.map((subList, idx)=>(

        <ClientsCard
          client={subList}
          idx={idx}
          key={'clientCard'+idx}
        />

      ))}
    </div>
  )
}

const Career = props => {

  const { experience, content, className, viewRef } = props;

  const useContent = content || blankContent;

  return (
    <div className={className} ref={viewRef} >
      <Paper elevation={3} >
        <Typography variant="h4" >
          {useContent.experience.title}
        </Typography>
        <Typography variant="body2">
          {useContent.experience.description}
        </Typography>
        {useContent.experience.list.map((job, idx) =>(
          <ExperienceCard
            job={job}
            idx={idx}
            key={'experienceCard'+idx}
          />
        ))}
      </Paper>

      <Paper elevation={3} >
        <Typography variant="h4" >
          {useContent.clients.title}
        </Typography>
        <Typography variant="body2">
          {useContent.clients.description}
        </Typography >
        {useContent.clients.lists.map((list, idx) =>
          clientList(list, idx)
        )}
      </Paper>
    </div>
  );
}



export default Career;
