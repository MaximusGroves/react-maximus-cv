import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import { withStyles} from '@material-ui/core/styles';

const style = theme => ({

  forceNoWrap:{
    whiteSpace: 'nowrap',
    marginTop: 'auto',
    marginBottom: 'auto'
  },

  // paperExpanded:{
  //   margin: 'auto!important'
  // },
  // expandedContent:{
  //   height: '100%!important',
  // },
});

const ExperienceCard = props => {
  const {
    job,
    idx,
    classes
  } = props;


  return (


    <ExpansionPanel
      key={'job' + idx}
      TransitionProps={{ unmountOnExit: true }}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Grid container direction="row" alignItems="center" justify="space-between" >

          <Grid item xs={12} sm>

            <Typography variant="h6">
              {job.employer}
            </Typography>

            <Typography variant="subtitle1">
              {job.title}
            </Typography>

          </Grid>

          <Grid item >
            <Typography variant="subtitle2" className={classes.forceNoWrap}>
              {job.range}
            </Typography>
          </Grid>
        </Grid>

      </ExpansionPanelSummary>
      <ExpansionPanelDetails onScroll={e => {e.stopPropagation(); e.preventDefault();}} >
        <Typography >
          {job.description}
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default withStyles(style)(ExperienceCard);
