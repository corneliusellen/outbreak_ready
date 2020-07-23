import React from "react";
import PropTypes from "prop-types";
import 'react-bulma-components/dist/react-bulma-components.min.css';
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
        <Answer type={this.props.question.answer_type} options={this.props.question.answer_options} id={this.props.question.id} />
      </div>
    )
  }
}

export default GroupedQuestion
