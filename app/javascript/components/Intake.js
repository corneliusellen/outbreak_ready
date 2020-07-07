import React from "react"
import PropTypes from "prop-types"
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Container } from 'react-bulma-components';
import { Heading } from 'react-bulma-components';
import { Section } from 'react-bulma-components';
import QuestionGroup from './QuestionGroup.js';

class Intake extends React.Component {
  render () {
    return(
      <div>
        <Container>
          <Heading>
            Intake Form
          </Heading>
        </Container>
        <Container>
          <Section>
            Input your outbreak details into the following form. Your questionnaire will populate with instructions and questions based on the information you put into the form.
          </Section>
        </Container>
        <QuestionGroup text='1. Do you have a suspect or confirmed etiology?'
                       options={ [['Yes', 0], ['No', 1]] }
                       type= 'RadioGroup'
                       subQuestions={ [
                                        { text: '1a. Suspected etiology - select all that apply:',
                                          options: ['Bacteria', 'Viral', 'Parasite', 'Toxin', 'Chemical', 'Other'],
                                          type: 'Checkbox',
                                          logic: 0
                                        },
                                        { text: '1a. Suspected transmission route - select all that apply:',
                                          options: ['Foodborne', 'Waterborne', 'Person-to-person', 'Sexual', 'Animal', 'Environmental', 'Unknown'],
                                          type: 'Checkbox',
                                          logic: 1
                                        }
                                      ]
                                    }
        />
      </div>
    )
  }
}

export default Intake
