import React from "react"
import PropTypes from "prop-types"
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Form } from 'react-bulma-components';

class RadioGroup extends React.Component {
  constructor() {
    super()
    this.state = {
      selected: undefined
    }
  }

  onChange = (value, e) => {
    this.setState({
      selected: e.target.value,
    });
    this.props.onSubQuestionsAppear(value)
  }

  render() {
    const radio_buttons = []

    this.props.options.forEach((option, index) => {
      radio_buttons.push(
        <Form.Radio key={option[1]} onChange={(e) => this.onChange(option[1], e)} checked={this.state.selected === option[0]} value={option[0]} name="question">
          {option[0]}
        </Form.Radio>
      )
    })

    return (
      <Form.Control>
        {radio_buttons}
      </Form.Control>
    );
  }

}

export default RadioGroup
