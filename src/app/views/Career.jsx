import React, { useState, memo } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import IFrame from 'react-iframe';

import ExperienceCard from 'components/ExperienceCard';
import ClientsCard from 'components/ClientsCard';

const blankContent = {
  experience: {
    title: '',
    description: '',
    list: []
  },
  clients: {
    title: '',
    description: '',
    lists: [
      {
        title: '',
        description: '',
        list: []
      }
    ]
  },
  animations: {
    title: '',
    description: '',
    choices: []
  }
};

const clientList = (list, idx) => {
  return (
    <div style={{ paddingTop: idx === 0 ? 0 : 24 }} key={`client-list-${idx}`}>
      <Typography variant="h5">{list.title}</Typography>
      <Typography variant="body2">{list.description}</Typography>

      {list.list.map((subList, idx) => (
        <ClientsCard client={subList} idx={idx} key={'client-card-' + idx} />
      ))}
    </div>
  );
};

const Career = memo(props => {
  const { content, className, viewRef } = props;

  const useContent = content || blankContent;

  const anims = useContent.animations.choices;

  const [radioSelect, setRadioSelect] = useState('spin');

  const selectedAnim = anims.indexOf(radioSelect) + 1;

  return (
    <div className={className} ref={viewRef}>
      <Paper elevation={3}>
        <Typography variant="h4">{useContent.experience.title}</Typography>
        <Typography variant="body2">
          {useContent.experience.description}
        </Typography>
        {useContent.experience.list.map((job, idx) => (
          <ExperienceCard job={job} idx={idx} key={'experience-card-' + idx} />
        ))}
      </Paper>

      <Paper elevation={3}>
        <Typography variant="h4">{useContent.clients.title}</Typography>
        <Typography variant="body2">
          {useContent.clients.description}
        </Typography>
        {useContent.clients.lists.map((list, idx) => clientList(list, idx))}
      </Paper>

      <Paper elevation={3}>
        <Typography variant="h4">{useContent.animations.title}</Typography>
        <Typography
          component="div"
          variant="body2"
          dangerouslySetInnerHTML={{
            __html: useContent.animations.description
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
                {anims.map((item, idx) => (
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
      </Paper>
    </div>
  );
});

Career.propTypes = {
  className: PropTypes.string,
  content: PropTypes.object,
  viewRef: PropTypes.func
};

export default Career;
