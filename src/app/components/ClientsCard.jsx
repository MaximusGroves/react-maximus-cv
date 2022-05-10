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
import GithubIcon from '../../assets/images/GithubIcon';

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
  const { title, subtitle, source, url, desc, idx, classes } = props;

  const hasUrl = url.indexOf('http') !== -1;

  return (
    <ExpansionPanel
      key={'client' + idx}
      TransitionProps={{ unmountOnExit: true }}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        {hasUrl /* just adding a disabled attribute didn't work */ ? (
          <a href={url} target="_blank">
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

        {source && (
          <a href={source} target="_blank">
            <IconButton
              onClick={unBubble}
              className={classes.playBtn}
              disabled={!hasUrl}
            >
              <GithubIcon />
            </IconButton>
          </a>
        )}
        <Grid container direction="column" justify="space-between">
          <Grid item xs={12} sm>
            <Typography variant="h6">{title}</Typography>

            <Typography variant="subtitle1" className={classes.breakAll}>
              {subtitle}
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
          dangerouslySetInnerHTML={{ __html: desc }}
          className={classes.descriptionContent}
        />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

ClientsCard.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  source: PropTypes.string,
  subtitle: PropTypes.string,
  url: PropTypes.string,
  desc: PropTypes.string,
  idx: PropTypes.number
};

export default withStyles(style)(ClientsCard);
