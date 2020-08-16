import React from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Container } from 'react-bulma-components';
import { Heading } from 'react-bulma-components';
import { Box } from 'react-bulma-components';
import { Section } from 'react-bulma-components';
import { Button } from 'react-bulma-components';
import { Columns } from 'react-bulma-components';

class Question extends React.Component {
  render() {
    const provided = this.props.provided;
    const innerRef = this.props.innerRef;

    const tags = this.props.question.tags.map(function(tag, index) {
      if (tag == 'universal') {
        return (<Columns.Column></Columns.Column>)
      } else {
        return(
          <Columns.Column>
            <Box className='tag' key={index} radius='small'>
              <p>
                {tag}
              </p>
            </Box>
          </Columns.Column>
        )
      }
    })

    return (
      <div
        ref={innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <div style={{paddingTop: 20}}>
          <Box className={`${this.props.question.mandatory == "mandatory" ? "default-question" : ""}`}>
            <p>
              {this.props.question.text}
            </p>
            <Columns>
              {tags}
            </Columns>
          </Box>
        </div>
      </div>
    )
  }
}

export default Question
