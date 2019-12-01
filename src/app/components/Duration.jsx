import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

const pad = string => {
  return ('0' + string).slice(-2);
};

const format = seconds => {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
};

const Duration = props => {
  const { className, seconds } = props;

  return (
    <time dateTime={`P${Math.round(seconds)}S`} className={className}>
      {format(seconds)}
    </time>
  );
};

Duration.propTypes = {
  className: PropTypes.string,
  seconds: PropTypes.number
};

export default Duration;
