import React from "react";
import PropTypes from "prop-types";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Container } from 'react-bulma-components';
import { Heading } from 'react-bulma-components';
import { Section } from 'react-bulma-components';
import { Form } from 'react-bulma-components';
import { Button } from 'react-bulma-components';
import Question from './Question.js';

class QuestionList extends React.Component {
  constructor() {
    super()
  }

  render() {
    const filteredQuestions = this.props.questions.filter(question =>
      question.text.toLowerCase().indexOf(this.props.filterText.toLowerCase()) !== -1
    )

    const questionBlocks = filteredQuestions.map(question =>
      <Question question={question}/>
    )

    return(
      <div>
        {questionBlocks}
      </div>
    );
  }
}

export default QuestionList
