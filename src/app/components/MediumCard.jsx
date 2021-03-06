import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { withStyles } from '@material-ui/core/styles';

import Moment from 'react-moment';

const style = () => ({
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
  const { classes, story, idx } = props;

  return (
    <ExpansionPanel
      key={'story' + idx}
      TransitionProps={{ unmountOnExit: true }}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <Grid item xs={12} sm>
            <Typography variant="h6">{story.title}</Typography>

            <Typography variant="subtitle1">
              {story.category && story.category.join(', ')}
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="subtitle2" className={classes.forceNoWrap}>
              <Moment format="MMMM D YYYY" date={story.pubDate[0]} />
            </Typography>
          </Grid>
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails
        onScroll={e => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <Typography
          component="div"
          dangerouslySetInnerHTML={{ __html: story['content:encoded'] }}
          className={classes.mediumContent}
        />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

MediumCard.propTypes = {
  classes: PropTypes.object,
  idx: PropTypes.number,
  story: PropTypes.object
};

export default withStyles(style)(MediumCard);
