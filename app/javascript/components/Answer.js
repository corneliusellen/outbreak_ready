import React from "react";
import PropTypes from "prop-types";
import { Form } from 'react-bulma-components';
import GroupedQuestion from './GroupedQuestion.js';

class Answer extends React.Component {
  constructor() {
    super()
  };

  render() {
    let answer = []

    if (this.props.type == 'radio') {
      this.props.choices.forEach((choice, index) => {
        answer.push(
          <Form.Radio key={this.props.id + choice} readOnly={true} name={choice}>{choice}</Form.Radio>
        )
      })
    }

    if (this.props.type == 'text') {
      answer.push (
          <Form.Input readOnly={true} type="text" name="blank_input"></Form.Input>
      )
    }

    if (this.props.children.length > 0) {
      this.props.children.forEach((child) => {
        answer.push (
          <GroupedQuestion question={child} />
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
