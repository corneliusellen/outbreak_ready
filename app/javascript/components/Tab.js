import React from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Container } from 'react-bulma-components';
import { Heading } from 'react-bulma-components';
import { Section } from 'react-bulma-components';
import { Form } from 'react-bulma-components';
import { Button } from 'react-bulma-components';
import { Columns } from 'react-bulma-components';
import { Box } from 'react-bulma-components';
import { Tabs } from 'react-bulma-components';
import QuestionBank from './QuestionBank.js';
import Answer from './Answer.js';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

class Tab extends React.Component {
  constructor() {
    super()
    this.handleSelectQuestion = this.handleSelectQuestion.bind(this)
  };

  handleSelectQuestion(newState) {
    this.props.handleSelectQuestion(newState)
  }

  id2List = {
    droppable: 'questions',
    droppable2: 'selected'
  };

  // getList = id => this.state[this.id2List[id]];
  getList = id => this.props[this.id2List[id]];

  onDragEnd = result => {
      const { source, destination } = result;

      // dropped outside the list
      if (!destination) {
          return;
      }

      if (source.droppableId === destination.droppableId) {
        if (source.droppableId === 'droppable') {
          return;
        }
          const items = reorder(
              this.getList(source.droppableId),
              source.index,
              destination.index
          );

          let state = { selected: items };

          // this.setState(state);
          this.handleSelectQuestion(state);
      } else {
          const result = move(
              this.getList(source.droppableId),
              this.getList(destination.droppableId),
              source,
              destination
          );

          // this.setState({
          //     questions: result.droppable,
          //     selected: result.droppable2
          // });
          this.handleSelectQuestion({
              questions: result.droppable,
              selected: result.droppable2
          });
      }
  };

  render() {
    return(
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Columns>
          <Columns.Column
            size="one-third"
            style={{backgroundColor: "#f2f2f2"}}>
            <QuestionBank questions={this.props.questions}/>
          </Columns.Column>
          <Columns.Column
            size="two-thirds"
          >
          <Heading size={4}>
            {this.props.title}
          </Heading>
          <Heading subtitle size={5}>
            <em>{this.props.section}</em>
          </Heading>
          <div style={{border: "1px solid"}}>
            <Section>
              <Droppable droppableId="droppable2">
                {(provided) => (
                    <div
                        ref={provided.innerRef}>
                        {this.props.selected.map((question, index) => (
                            <Draggable
                              key={question.id}
                              draggableId={String(question.id)}
                              index={index}
                            >
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}>
                                    <div style={{padding: 20}}>
                                      <Box className={`${question.mandatory == "mandatory" ? "default-question" : ""}`}>
                                        <p>
                                          {question.text}
                                        </p>
                                          <Answer
                                            type={question.answer_type}
                                            choices={question.answer_choices}
                                            id={question.id}
                                            children={question.children}
                                          />
                                      </Box>
                                    </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                      {provided.placeholder}
                      </div>
                  )}
                </Droppable>
              </Section>
            </div>
          </Columns.Column>
        </Columns>
      </DragDropContext>
    )
  }
}

export default Tab
