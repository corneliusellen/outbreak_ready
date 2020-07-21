import React from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Container } from 'react-bulma-components';
import { Heading } from 'react-bulma-components';
import { Section } from 'react-bulma-components';
import { Form } from 'react-bulma-components';
import { Button } from 'react-bulma-components';
import { Columns } from 'react-bulma-components';
import { Box } from 'react-bulma-components';
import { Tabs } from 'react-bulma-components';
import QuestionBank from './QuestionBank.js';

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
  constructor(props) {
    super()
    this.state = {
      questions: props.questions,
      selected: []
    }
  };

  id2List = {
    droppable: 'questions',
    droppable2: 'selected'
  };

  getList = id => this.state[this.id2List[id]];

  onDragEnd = result => {
      const { source, destination } = result;

      // dropped outside the list
      if (!destination) {
          return;
      }

      if (source.droppableId === destination.droppableId) {
          const items = reorder(
              this.getList(source.droppableId),
              source.index,
              destination.index
          );

          let state = { questions: items };

          if (source.droppableId === 'droppable2') {
              state = { selected: items };
          }

          this.setState(state);
      } else {
          const result = move(
              this.getList(source.droppableId),
              this.getList(destination.droppableId),
              source,
              destination
          );

          this.setState({
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
            size="one-third">
            <QuestionBank questions={this.state.questions}/>
          </Columns.Column>
          <Columns.Column
            size="two-thirds"
          >
            <Section>
              <Droppable droppableId="droppable2">
                {(provided) => (
                    <div
                        ref={provided.innerRef}>
                        {this.state.selected.map((question, index) => (
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
                                    <Section>
                                      <Box>
                                        <p>
                                          {question.text}
                                        </p>
                                        <p>
                                          {question.answer_options[0]}
                                        </p>
                                      </Box>
                                    </Section>
                                </div>
                            )}
                          </Draggable>
                        ))}
                    {provided.placeholder}
                    </div>
                )}
              </Droppable>
            </Section>
          </Columns.Column>
        </Columns>
      </DragDropContext>
    )
  }
}

export default Tab
