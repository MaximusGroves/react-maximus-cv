import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Moment from 'react-moment';

import { withStyles } from '@material-ui/core/styles';

const style = theme => ({

  forceNoWrap: {
    whiteSpace: 'nowrap',
    marginTop: 'auto',
    marginBottom: 'auto'
  },

  mediumContent: {
    // "fontSize": 20,
    "fontFamily": 'roboto',

    '& figure': {
      '& img': {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '100%'
      }
    }
  }

});

const MediumCard = props => {
  const {
    classes,
    story,
    idx,
  } = props;

  return (

    <ExpansionPanel
      key={'story' + idx}
      TransitionProps={{ unmountOnExit: true }}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Grid container direction="row" alignItems="center" justify="space-between" >

          <Grid item xs={12} sm>

            <Typography variant="h6">
              {story.title}
            </Typography>

            <Typography variant="subtitle1">
              {story.category && story.category.join(', ')}
            </Typography>

          </Grid>

          <Grid item >
            <Typography variant="subtitle2" className={classes.forceNoWrap}>
              <Moment
                format="MMMM D YYYY"
                date={story.pubDate[0]}
              />
            </Typography>
          </Grid>
        </Grid>

      </ExpansionPanelSummary>
      <ExpansionPanelDetails onScroll={e => {e.stopPropagation(); e.preventDefault();}} >

        <Typography dangerouslySetInnerHTML={{ __html: story["content:encoded"] }} className={classes.mediumContent}/>

      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default withStyles(style)(MediumCard);
