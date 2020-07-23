import React from "react";
import PropTypes from "prop-types";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Form } from 'react-bulma-components';
import GroupedQuestion from './GroupedQuestion.js';

class Answer extends React.Component {
  constructor() {
    super()
  };

  render() {
    let answer = []

    if (this.props.type == 'radio') {
      this.props.options.forEach((option, index) => {
        answer.push(
          <Form.Radio key={this.props.id + option} readOnly={true} name={option}>{option}</Form.Radio>
        )
      })
    }

    if (this.props.type == 'text') {
      answer.push (
          <Form.Input readOnly={true} type="text" name="blank_input"></Form.Input>
      )
    }

    if (this.props.type == 'parent') {
      this.props.options.forEach((option) => {
        answer.push (
          <GroupedQuestion question={option} />
        )
      })
    }

    return(
      <div>
        {answer}
      </div>
    )
  }
}

export default Answer
