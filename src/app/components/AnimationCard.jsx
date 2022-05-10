import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { withStyles } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import IFrame from 'react-iframe';
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

const AnimationCard = props => {
  const { idx, anims, classes } = props;

  const [radioSelect, setRadioSelect] = React.useState('spin');

  const selectedAnim = anims.choices.indexOf(radioSelect) + 1;

  return (
    <ExpansionPanel
      key={'client' + idx}
      TransitionProps={{ unmountOnExit: true }}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <a href={'https://github.com/ComcastroMax/logoTweens'} target="_blank">
          <IconButton onClick={unBubble} className={classes.playBtn}>
            {/* <ExitToAppIcon /> */}
            <GithubIcon />
          </IconButton>
        </a>

        <Grid container direction="column" justify="space-between">
          <Grid item xs={12} sm>
            <Typography variant="h6">Animation Demos</Typography>

            <Typography variant="subtitle1" className={classes.breakAll}>
              Transformations of my podcast logo
            </Typography>
          </Grid>
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails
        style={{ maxHeight: 'unset', overflow: 'hidden' }}
        onScroll={e => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <Typography
          component="div"
          dangerouslySetInnerHTML={{
            __html: anims.description
          }}
        />

        <Grid
          container
          direction="column"
          spacing={8}
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="position"
                name="position"
                value={radioSelect}
                onChange={e => setRadioSelect(e.target.value)}
                row
              >
                {anims.choices.map((item, idx) => (
                  <FormControlLabel
                    value={item}
                    control={<Radio color="primary" />}
                    label={item}
                    labelPlacement="bottom"
                    key={`radio-btn-${idx}`}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          {selectedAnim > 0 && (
            <Grid item style={{ overflow: 'hidden', position: 'relative' }}>
              <div
                style={{
                  width: 360,
                  height: 400,
                  position: 'absolute',
                  bottom: 0
                }}
              />
              <IFrame
                url={`/animations/index${selectedAnim}.html`}
                width={360}
                height={360}
                style={{ border: 'none' }}
              />
            </Grid>
          )}
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

AnimationCard.propTypes = {
  classes: PropTypes.object,
  anims: PropTypes.object,
  idx: PropTypes.number
};

export default withStyles(style)(AnimationCard);
