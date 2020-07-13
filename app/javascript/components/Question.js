import React from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Container } from 'react-bulma-components';
import { Heading } from 'react-bulma-components';
import { Box } from 'react-bulma-components';
import { Section } from 'react-bulma-components';
import { Button } from 'react-bulma-components';

class Question extends React.Component {
  render() {
    const provided = this.props.provided;
    const innerRef = this.props.innerRef;

    return (
      <div
        ref={innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <Section>
          <Box>
            <p>
              {this.props.question.text}
            </p>
          </Box>
        </Section>
      </div>
    )
  }
}

export default Question
