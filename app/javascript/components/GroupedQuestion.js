import React from "react";
import PropTypes from "prop-types";
import { Form } from 'react-bulma-components';
import Answer from './Answer.js'

class GroupedQuestion extends React.Component {
  constructor() {
    super()
  };

  render() {
    return(
      <div style={{paddingTop: 10}}>
        {this.props.question.text}
        <Answer type={this.props.question.answer_type} choices={this.props.question.answer_choices} id={this.props.question.id} children={this.props.question.children}/>
      </div>
    )
  }
}

export default GroupedQuestion
