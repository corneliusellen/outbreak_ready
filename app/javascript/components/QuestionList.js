import React from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Container } from 'react-bulma-components';
import { Heading } from 'react-bulma-components';
import { Section } from 'react-bulma-components';
import { Form } from 'react-bulma-components';
import Question from './Question.js';

class QuestionList extends React.Component {
  constructor() {
    super()
  }

  render() {
    const { provided, innerRef } = this.props;

    const filteredQuestions = this.props.questions.filter(question =>
      question.text.toLowerCase().indexOf(this.props.filterText.toLowerCase()) !== -1
    )

    const questionBlocks = filteredQuestions.map((question,index) => (
      <Draggable
        key={question.id}
        draggableId={String(question.id)}
        index={index}
      >
        {provided => (
          <Question key={question.id} question={question} provided={provided} innerRef={provided.innerRef}/>
        )}
      </Draggable>
    ))

    return(
      <div {...provided.droppableProps} ref={innerRef}>
        {questionBlocks}
        {provided.placeholder}
      </div>
    );
  }
}

export default QuestionList
