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
    this.state = {
      checkedItems: new Map()
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  }

  render() {
    const checkboxes = this.props.subQuestion.options.map(option => (
      <div key={option[0]}>
          <Checkbox name={option[0]} checked={this.state.checkedItems.get(option[0])} onChange={this.handleChange} subCheckboxes={option[1]} />
      </div>
    ))

    let text
    if (this.props.parent) {
      text = <div><Heading>{this.props.subQuestion.text}</Heading><Columns><Form.Field>{checkboxes}</Form.Field></Columns></div>
    } else {
      text = <div>{this.props.subQuestion.text}<Columns>{checkboxes}</Columns></div>
    }

    return(
      <div>
        {text}
      </div>
    )
  }
}

export default SubQuestion
