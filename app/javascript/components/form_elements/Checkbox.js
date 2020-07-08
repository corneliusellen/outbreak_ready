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
      checkedSubCheckboxes: new Map()
    }
    this.handleSubClick = this.handleSubClick.bind(this)
  }

  onChange = (e) => {
    this.props.onChange;
    if (this.props.subCheckboxes) {
      this.setState({subCheckboxes: !this.state.subCheckboxes})
    }
  }

  handleSubClick(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedSubCheckboxes: prevState.checkedSubCheckboxes.set(item, isChecked) }));
  }

  render() {
    let subCheckboxes

    if (this.state.subCheckboxes) {
      subCheckboxes = this.props.subCheckboxes.map(option => (
        <div key={option}>
          <SubCheckbox name={option} checked={this.state.checkedSubCheckboxes.get(option)} onChange={this.handleSubClick}/>
        </div>
      ))
    }

    return(
      <Columns.Column>
        <label>
          <input type='checkbox' name={this.props.name} checked={this.props.checked} onChange={this.onChange} />
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
