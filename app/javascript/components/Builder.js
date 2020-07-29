import React from "react";
import PropTypes from "prop-types";
import { Container } from 'react-bulma-components';
import { Heading } from 'react-bulma-components';
import { Section } from 'react-bulma-components';
import { Button } from 'react-bulma-components';
import { Message } from 'react-bulma-components';
import { Footer } from 'react-bulma-components';
import { Tabs } from 'react-bulma-components';
import axios from 'axios';
import Tab from './Tab.js'

class Builder extends React.Component {
  constructor(props) {
    super()
    this.state = {
      title: null,
      contact: {
        questions: [],
        selected: []
      },
      introduction: {
        questions: [],
        selected: []
      },
      screening: {
        questions: [],
        selected: []
      },
      other: {
        questions: [],
        selected: []
      },
      symptoms: {
        questions: [],
        selected: []
      },
      onset_duration: {
        questions: [],
        selected: []
      },
      outcomes: {
        questions: [],
        selected: []
      },
      demographics: {
        questions: [],
        selected: []
      },
      exposure: {
        questions: [],
        selected: []
      },
      activeTab: [{name: "Contact", active: true},
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

  componentDidMount() {
    axios.get(`/questions?id=${this.props.id}`).then(
      response => {
        this.setState({ title: response.data.title,
                        contact: { questions: response.data.questions.contact || [], selected: []  },
                        introduction: { questions: response.data.questions.introduction || [], selected: []  },
                        screening: { questions: response.data.questions.screening || [], selected: [] },
                        other: { questions: response.data.questions.other || [], selected: [] },
                        symptoms: { questions: response.data.questions.symptoms || [], selected: []  },
                        onset_duration: { questions: response.data.questions.onset_duration || [], selected: [] },
                        outcomes: { questions: response.data.questions.outcomes || [], selected: []  },
                        demographics: { questions: response.data.questions.demographics || [] , selected: [] },
                        exposure: { questions: response.data.questions.exposure || [], selected: []  }
                     })
      }
    );
  }

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

  onSubmit = (e) => {
    const selected = {
                       contact: this.state.contact.selected,
                       introduction: this.state.introduction.selected,
                       screening: this.state.screening.selected,
                       other: this.state.other.selected,
                       symptoms: this.state.symptoms.selected,
                       onset_duration: this.state.onset_duration.selected,
                       outcomes: this.state.outcomes.selected,
                       demographics: this.state.demographics.selected,
                       exposure: this.state.exposure.selected,
                     }
    axios.put(`/questionnaire/${this.props.id}`, selected)
      .then((result) => {
        return;
      })
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
        <Message color="primary">
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
             title={this.state.title}
        />
        <Container align='right'>
          <Button onClick={this.onSubmit} fullwidth={false} className="button is-primary" renderAs="a" href={`/questionnaire/${this.props.id}`}>Review Questionnaire</Button>
        </Container>
      </Section>
    )
  }
}

export default Builder
