import React from "react";
import PropTypes from "prop-types";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Heading } from 'react-bulma-components';
import { Form } from 'react-bulma-components';
import { Columns } from 'react-bulma-components';
import Checkbox from './form_elements/Checkbox.js'

class SubQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
  }

  handleCheckboxChange(e) {
    this.props.handleCheckboxChange(e)
  }

  render() {
    const checkboxes = this.props.subQuestion.options.map(option => (
      <div key={option[0]}>
          <Checkbox name={option[0]} checked={this.props.checkedTags.get(option[0])}
          checkedTags={this.props.checkedTags} handleCheckboxChange={this.handleCheckboxChange} subCheckboxes={option[1]} parent={this.props.parent} />
      </div>
    ))


    let text
    if (this.props.parent) {
      text =
        <Form.Field>
          <Form.Label>
            {this.props.subQuestion.text}
          </Form.Label>
          <Form.Control>
            <Columns>
              {checkboxes}
            </Columns>
          </Form.Control>
        </Form.Field>
    } else {
      text =
        <Form.Field>
          <Form.Label>
            {this.props.subQuestion.text}
          </Form.Label>
          <Form.Control>
            <Columns>
              {checkboxes}
            </Columns>
          </Form.Control>
        </Form.Field>
    }

    return(
      <div>
        {text}
      </div>
    )
  }
}

export default SubQuestion
