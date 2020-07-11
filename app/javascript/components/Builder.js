import React from "react";
import PropTypes from "prop-types";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Container } from 'react-bulma-components';
import { Heading } from 'react-bulma-components';
import { Section } from 'react-bulma-components';
import { Form } from 'react-bulma-components';
import { Button } from 'react-bulma-components';
import { Columns } from 'react-bulma-components';
import QuestionBank from './QuestionBank.js'

class Builder extends React.Component {
  constructor() {
    super()
  }

  render() {
    return(
      <Columns>
        <Columns.Column>
          <QuestionBank questions={this.props.questions}/>
        </Columns.Column>
        <Columns.Column>
          <div></div>
        </Columns.Column>
      </Columns>
    )
  }
}

export default Builder
