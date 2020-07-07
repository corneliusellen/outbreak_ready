import React from "react"
import PropTypes from "prop-types"
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Container } from 'react-bulma-components';
import { Heading } from 'react-bulma-components';
import { Section } from 'react-bulma-components';
import { Form, Checkbox } from 'react-bulma-components';
import RadioGroup from './form_elements/RadioGroup.js';
import SubQuestion from './SubQuestion.js';

class QuestionGroup extends React.Component {
  constructor() {
    super()
    this.state = {
      logic: undefined
    };

    this.handleSubQuestionsAppear = this.handleSubQuestionsAppear.bind(this)
  }

  handleSubQuestionsAppear(subQuestionIndex) {
    this.setState({
      logic: subQuestionIndex
    })
  }

  render () {
    const index = this.state.logic
    let showSubQuestion

    if (index !== undefined) {
      showSubQuestion = <SubQuestion subQuestion={this.props.subQuestions[index]}/>;
    } else {
      showSubQuestion = null
    }

    return (
      <Container>
        <Heading>
          {this.props.text}
        </Heading>
        <Form.Field>
          <RadioGroup options={this.props.options} onSubQuestionsAppear={this.handleSubQuestionsAppear}/>
        </Form.Field>
        <Form.Field>
          {showSubQuestion}
        </Form.Field>
      </Container>
    )
  }
}

export default QuestionGroup
