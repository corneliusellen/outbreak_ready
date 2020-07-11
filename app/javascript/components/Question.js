import React from "react";
import PropTypes from "prop-types";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Container } from 'react-bulma-components';
import { Heading } from 'react-bulma-components';
import { Box } from 'react-bulma-components';
import { Section } from 'react-bulma-components';
import { Button } from 'react-bulma-components';

class Question extends React.Component {
  render() {
    return (
      <Section>
        <Box>
          <p>
            {this.props.question.text}
          </p>
        </Box>
      </Section>
    )
  }
}

export default Question
