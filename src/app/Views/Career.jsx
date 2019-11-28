import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ExperienceCard from '../Components/ExperienceCard';
import ClientsCard from '../Components/ClientsCard';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Iframe from 'react-iframe';

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
  },
  animations:{
    title: "",
    description: "",
    choices: [ ]
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

  const { experience, content, className, viewRef, handleRadioSelect } = props;

  const useContent = content || blankContent;

  const anims = useContent.animations.choices;

  const [radioSelect, setRadioSelect] = useState('spin');

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

      <Paper elevation={3} >
        <Typography variant="h4" >
          {useContent.animations.title}
        </Typography>
        <Typography variant="body2">
          <div dangerouslySetInnerHTML={{ __html: useContent.animations.description }} />
        </Typography >



        <Grid container direction="column" spacing="8" justify="center" alignItems="center">

          <Grid item>
            <FormControl component="fieldset">
              <RadioGroup aria-label="position" name="position" value={radioSelect} onChange={e=>setRadioSelect(e.target.value)} row>
                {anims.map((item, idx)=>(
                  <FormControlLabel
                    value={item}
                    control={<Radio color="primary" />}
                    label={item}
                    labelPlacement="bottom"
                  />
                ))}

              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item style={{overflow:"hidden"}}>
          <Iframe
            url={`/animations/index${anims.indexOf(radioSelect)+1}.html`}
            width={360}
            height={360}
            style={{border:'none'}}
          />
          </Grid>



        </Grid>



      </Paper>
    </div>
  );
}



export default Career;
