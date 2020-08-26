import React from "react";
import PropTypes from "prop-types";
import { Container } from 'react-bulma-components';
import { Heading } from 'react-bulma-components';
import { Section } from 'react-bulma-components';
import { Button } from 'react-bulma-components';
import { Message } from 'react-bulma-components';
import { Footer } from 'react-bulma-components';
import { Tabs } from 'react-bulma-components';
import { Hero } from 'react-bulma-components';
import { Columns } from 'react-bulma-components';
import { Image } from 'react-bulma-components';
import { Loader } from 'react-bulma-components';
import axios from 'axios';
import Tab from './Tab.js'

class Builder extends React.Component {
  constructor(props) {
    super()
    this.state = {
      loading: false,
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
                        contact: { questions: response.data.questions.contact?.recommended || [], selected: response.data.questions.contact?.mandatory || []  },
                        introduction: { questions: response.data.questions.introduction?.recommended || [], selected: response.data.questions.introduction?.mandatory || []  },
                        screening: { questions: response.data.questions.screening?.recommended || [], selected: response.data.questions.screening?.mandatory || [] },
                        other: { questions: response.data.questions.other?.recommended || [], selected: response.data.questions.other?.mandatory || [] },
                        symptoms: { questions: response.data.questions.symptoms?.recommended || [], selected: response.data.questions.symptoms?.mandatory || [] },
                        onset_duration: { questions: response.data.questions.onset_duration?.recommended || [], selected: response.data.questions.onset_duration?.mandatory || [] },
                        outcomes: { questions: response.data.questions.outcomes?.recommended || [], selected: response.data.questions.outcomes?.mandatory  || [] },
                        demographics: { questions: response.data.questions.demographics?.recommended || [] , selected: response.data.questions.demographics?.mandatory || [] },
                        exposure: { questions: response.data.questions.exposure?.recommended || [], selected: response.data.questions.exposure?.mandatory  || [] }
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
    this.setState({loading: true})
    const selected = { questionnaire_questions: [
                        this.state.contact.selected,
                        this.state.introduction.selected,
                        this.state.screening.selected,
                        this.state.other.selected,
                        this.state.symptoms.selected,
                        this.state.onset_duration.selected,
                        this.state.outcomes.selected,
                        this.state.demographics.selected,
                        this.state.exposure.selected,
                        ]
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
        <Hero color="primary" gradient>
          <Hero.Body style={{padding: 15}} >
            <Columns className="is-vcentered">
              <Columns.Column>
                <Heading>
                  Outbreak Questionnaire Builder
                </Heading>
              </Columns.Column>
              <Columns.Column size="one-fifth">
                <Container style={{ width: 120 }}>
                  <Image src={this.props.img_src} />
                </Container>
              </Columns.Column>
            </Columns>
          </Hero.Body>
        </Hero>
        <Section>
          <Message color="primary">
            <Columns className="is-vcentered">
              <Columns.Column size="two-thirds">
                <Message.Header>
                  Directions:
                </Message.Header>
                <Message.Body>
                  <li>
                    Build your questionnaire by dragging and dropping the <em>Recommended Questions</em> into each section on the right. If a section is left blank it will not be included.
                  </li>
                  <li>
                    Items highlighted in gray are standard questions and are already included on your questionnaire.
                  </li>
                  <li>
                    Some questions have tags (highlighted in green) which indicate a question's relevance.
                  </li>
                </Message.Body>
              </Columns.Column>
              <Columns.Column align='right'>
                {this.state.loading ? <Loader style={{ width: 50, height: 50, margin: 30}}/> : <Button style={{margin: 15}} onClick={this.onSubmit} fullwidth={false} className="button is-dark" renderAs="a" href={`/questionnaire/${this.props.id}`}>
                  Finished? Export Questionnaire
                </Button>}
              </Columns.Column>
            </Columns>
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
        </Section>
      </Section>
    )
  }
}

export default Builder
