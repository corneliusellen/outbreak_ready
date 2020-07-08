import React from 'react';
import PropTypes from 'prop-types';

const SubCheckbox = ({ type = 'checkbox', name, checked = false, onChange }) => (
  <label>
    <input type={type} name={name} checked={checked} onChange={onChange} />
    {name}
  </label>
);

SubCheckbox.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

export default SubCheckbox;
