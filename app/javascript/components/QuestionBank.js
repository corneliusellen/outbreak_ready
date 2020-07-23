import React from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Container } from 'react-bulma-components';
import { Heading } from 'react-bulma-components';
import { Section } from 'react-bulma-components';
import { Form } from 'react-bulma-components';
import { Button } from 'react-bulma-components';
import SearchBar from './SearchBar.js'
import QuestionList from './QuestionList.js'

class QuestionBank extends React.Component {
  constructor() {
    super()
    this.state = {
      filterText: ''
    }
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(filterText){
    this.setState({
      filterText: filterText
    })
  }

  render() {
    return(
      <Section className='dude'>
        <Heading size={4}>
          Question Bank
        </Heading>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />
        <Droppable droppableId="droppable">
          {(provided) => (
            <QuestionList
              filterText={this.state.filterText}
              questions={this.props.questions}
              provided={provided}
              innerRef={provided.innerRef}
            />
          )}
        </Droppable>
      </Section>
    )
  }
}

export default QuestionBank
