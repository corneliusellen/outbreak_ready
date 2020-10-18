import React from "react";
import PropTypes from "prop-types";
import { Container } from 'react-bulma-components';
import { Heading } from 'react-bulma-components';
import { Section } from 'react-bulma-components';
import { Form } from 'react-bulma-components';

class SearchBar extends React.Component {
  constructor() {
    super()
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value)
  }

  render() {
    return(
      <Form.Field kind="group">
        <Form.Input onChange={this.handleFilterTextChange} name="search" type="text" placeholder="Search for question..." value={this.props.filterText}>
        </Form.Input>
      </Form.Field>

    )
  }
}

export default SearchBar
