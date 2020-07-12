import React from "react";
import PropTypes from "prop-types";
import { Container } from 'react-bulma-components';
import { Section } from 'react-bulma-components';
import { Columns } from 'react-bulma-components';
import SubCheckbox from './SubCheckbox.js';

class Checkbox extends React.Component {
  constructor() {
    super()
    this.state = {
      subCheckboxes: false,
    }
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubCheckboxChange = this.handleSubCheckboxChange.bind(this);
  }

  handleCheckboxChange(e) {
    this.props.handleCheckboxChange(e);
    if (this.props.subCheckboxes) {
      this.setState({subCheckboxes: !this.state.subCheckboxes})
    }
  }

  handleSubCheckboxChange(e) {
    this.props.handleCheckboxChange(e);
  }

  render() {
    let subCheckboxes
    if (this.state.subCheckboxes) {
      subCheckboxes = this.props.subCheckboxes.map(option => (
        <div key={option}>
          <SubCheckbox name={option} checked={this.props.checkedTags.get(option)} onChange={this.handleSubCheckboxChange}/>
        </div>
      ))
    }

    const checkbox = <input type='checkbox'
                        name={this.props.name}
                        checked={this.props.checked}
                        onChange={this.handleCheckboxChange} />


    return(
      <Columns.Column>
        <label>
          {checkbox}
          {this.props.name}
        </label>
        <div>
          {subCheckboxes}
        </div>
      </Columns.Column>
    )
  }
}

export default Checkbox;
