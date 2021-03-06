import React from "react";
import PropTypes from "prop-types";
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
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
  }

  handleSubQuestionsAppear(subQuestionIndex) {
    this.setState({
      logic: subQuestionIndex
    })
  }

  handleCheckboxChange(e) {
    this.props.handleCheckboxChange(e)
  }

  render () {
    const index = this.state.logic
    let showSubQuestion

    if (index !== undefined) {
      showSubQuestion = <SubQuestion subQuestion={this.props.subQuestions[index]}
                                     handleCheckboxChange={this.handleCheckboxChange} checkedTags={this.props.checkedTags} />;
    } else {
      showSubQuestion = null
    }

    return (
      <Form.Field>
        <Form.Label>
          {this.props.text}
        </Form.Label>
        <Form.Control>
          <RadioGroup options={this.props.options} onSubQuestionsAppear={this.handleSubQuestionsAppear}/>
          <Section>
            {showSubQuestion}
          </Section>
        </Form.Control>
      </Form.Field>
    )
  }
}

export default QuestionGroup
