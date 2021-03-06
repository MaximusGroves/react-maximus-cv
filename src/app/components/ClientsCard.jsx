import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { withStyles } from '@material-ui/core/styles';

const style = () => ({
  forceNoWrap: {
    whiteSpace: 'nowrap',
    marginTop: 'auto',
    marginBottom: 'auto'
  },

  playBtn: {
    marginLeft: -18,
    marginRight: 8
  },

  breakAll: {
    wordBreak: 'break-all'
  },

  // paperExpanded:{
  //   margin: 'auto!important'
  // },
  // expandedContent:{
  //   height: '100%!important',
  // },

  descriptionContent: {}
});

const unBubble = e => {
  e.stopPropagation();
  // e.preventDefault();
};

const ClientsCard = props => {
  const { client, idx, classes } = props;

  const hasUrl = client.url.indexOf('http') !== -1;

  return (
    <ExpansionPanel
      key={'client' + idx}
      TransitionProps={{ unmountOnExit: true }}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        {hasUrl /* just adding a disabled attribute didn't work */ ? (
          <a href={client.url} target="_blank">
            <IconButton
              onClick={unBubble}
              className={classes.playBtn}
              disabled={!hasUrl}
            >
              <ExitToAppIcon />
            </IconButton>
          </a>
        ) : (
          <IconButton onClick={unBubble} className={classes.playBtn} disabled>
            <ExitToAppIcon />
          </IconButton>
        )}

        <Grid container direction="column" justify="space-between">
          <Grid item xs={12} sm>
            <Typography variant="h6">{client.client}</Typography>

            <Typography variant="subtitle1" className={classes.breakAll}>
              {client.url}
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
          dangerouslySetInnerHTML={{ __html: client.description }}
          className={classes.descriptionContent}
        />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

ClientsCard.propTypes = {
  classes: PropTypes.object,
  client: PropTypes.object,
  idx: PropTypes.number
};

export default withStyles(style)(ClientsCard);
