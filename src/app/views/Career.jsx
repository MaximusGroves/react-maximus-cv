import React, { useState, memo } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';

import ExperienceCard from 'components/ExperienceCard';
import ClientsCard from 'components/ClientsCard';
import AnimationCard from 'components/AnimationCard';

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
        <ClientsCard
          title={subList.client}
          subtitle={subList.url}
          url={subList.url}
          desc={subList.description}
          idx={idx}
          key={'client-card-' + idx}
        />
      ))}
    </div>
  );
};

const Career = memo(props => {
  const { content, className, viewRef } = props;

  const useContent = content || blankContent;

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
        <Typography variant="h4">{useContent.projects.title}</Typography>
        <Typography variant="body2">
          {useContent.projects.description}
        </Typography>
        {useContent.projects.list.map((project, idx) => (
          <ClientsCard
            title={project.project}
            subtitle={project.url}
            url={project.url}
            source={project.source}
            desc={project.description}
            idx={idx}
            key={'client-card-' + idx}
          />
        ))}
        <AnimationCard anims={useContent.animations} />
      </Paper>

      <Paper elevation={3}>
        <Typography variant="h4">{useContent.clients.title}</Typography>
        <Typography variant="body2">
          {useContent.clients.description}
        </Typography>
        {useContent.clients.lists.map((list, idx) => clientList(list, idx))}
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
