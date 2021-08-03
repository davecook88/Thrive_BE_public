import React from 'react';
import PropTypes from 'prop-types';

export const Header = (props:'') => (
   <div>{props}</div>
);
Header.propTypes = {
  props: PropTypes.string
};