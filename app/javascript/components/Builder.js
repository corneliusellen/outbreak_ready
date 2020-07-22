import React from "react";
import PropTypes from "prop-types";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Container } from 'react-bulma-components';
import { Heading } from 'react-bulma-components';
import { Section } from 'react-bulma-components';
import { Button } from 'react-bulma-components';
import { Tabs } from 'react-bulma-components';
import Tab from './Tab.js'

class Builder extends React.Component {
  constructor(props) {
    super()
    this.state = {
      interview: {
        questions: props.questions.interview,
        selected: []
      },
      contact: {
        questions: props.questions.contact,
        selected: []
      },
      activeTab: [{name: "Interview", active: true},
                  {name: "Contact", active: false}],
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
      const activeTab = this.state.activeTab.filter(tab => tab.active)[0].name.toLowerCase();
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

    const tabData = this.state.activeTab.filter(tab => tab.active)[0].name.toLowerCase()

    return(
      <Section>
        <Tabs
          type="boxed"
          fullwidth={true}
          align="centered"

        >
          {tabs}
        </Tabs>
        <Tab key={tabData}
             questions={this.state[tabData].questions}
             selected={this.state[tabData].selected}
             handleSelectQuestion = {this.onSelectQuestion}
        />
      </Section>
    )
  }
}

export default Builder
