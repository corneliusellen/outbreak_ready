import React from "react";
import PropTypes from "prop-types";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Container } from 'react-bulma-components';
import { Heading } from 'react-bulma-components';
import { Section } from 'react-bulma-components';
import { Button } from 'react-bulma-components';
import { Message } from 'react-bulma-components';
import { Footer } from 'react-bulma-components';
import { Tabs } from 'react-bulma-components';
import Tab from './Tab.js'

class Builder extends React.Component {
  constructor(props) {
    super()
    this.state = {
      contact: {
        questions: props.questions.contact,
        selected: []
      },
      instructions: {
        questions: props.questions.instructions,
        selected: []
      },
      introduction: {
        questions: props.questions.introduction,
        selected: []
      },
      screening: {
        questions: props.questions.screening,
        selected: []
      },
      other: {
        questions: props.questions.other,
        selected: []
      },
      symptoms: {
        questions: props.questions.symptoms,
        selected: []
      },
      onset_duration: {
        questions: props.questions.onset_duration,
        selected: []
      },
      outcomes: {
        questions: props.questions.outcomes,
        selected: []
      },
      demographics: {
        questions: props.questions.demographics,
        selected: []
      },
      exposure: {
        questions: props.questions.exposure,
        selected: []
      },
      activeTab: [{name: "Contact", active: true},
                  {name: "Instructions", active: false},
                  {name: "Introduction", active: false},
                  {name: "Screening", active: false},
                  {name: "Exposure", active: false},
                  {name: "Other", active: false},
                  {name: "Symptoms", active: false},
                  {name: "Onset Duration", active: false},
                  {name: "Outcomes", active: false},
                  {name: "Demographics", active: false},
                 ]
    }

    this.onSelectQuestion = this.onSelectQuestion.bind(this)
  };

  onTabClick = (e) => {
    const clicked = e.target.innerText;

    const state = this.state.activeTab.map(function(tab) {
      if (tab.name == clicked) {
        return {name: tab.name, active: true}
      } else {
        return {name: tab.name, active: false}
      }
    });

    this.setState({activeTab: state});
  }

  onSelectQuestion = (newState) => {
    const stuffs = newState;

    this.setState(function(prevState) {
      const activeTab = this.state.activeTab.filter(tab => tab.active)[0].name.toLowerCase().replace(' ', '_');
      const state = prevState;
      if (newState.questions == undefined) {
        state[activeTab]['selected'] = newState['selected'];
        return state
      } else {
        state[activeTab] = newState;
        return state
      }
    });
  }

  render() {
    const tabs = this.state.activeTab.map((tab, index)=> (
      <Tabs.Tab
        active={tab.active}
        key={index}
        onClick={this.onTabClick}
      >
        {tab.name}
      </Tabs.Tab>
    ))

    const tabData = this.state.activeTab.filter(tab => tab.active)[0].name.toLowerCase().replace(' ', '_')

    const section = this.state.activeTab.filter(tab => tab.active)[0].name

    return(
      <Section>
        <Message color="info">
          <Message.Header>
            Build your questionnaire by dragging and dropping questions into each section. If a section is left blank it will not be included.
          </Message.Header>
        </Message>
        <Tabs
          type="boxed"
          fullwidth={true}
          align="centered"
        >
          {tabs}
        </Tabs>
        <Tab key={tabData}
             section={section}
             questions={this.state[tabData].questions}
             selected={this.state[tabData].selected}
             handleSelectQuestion = {this.onSelectQuestion}
        />
        <Container align='right'>
          <Button fullwidth={false} className="button is-info" renderAs="a" href="/builder">Review Questionnaire</Button>
        </Container>
      </Section>
    )
  }
}

export default Builder
