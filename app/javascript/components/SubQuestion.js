import React from "react";
import PropTypes from "prop-types";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import Checkbox from './form_elements/Checkbox.js'

class SubQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedItems: new Map()
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  }

  render() {
    const checkboxes = this.props.subQuestion.options.map(option => (
      <div key={option[0]}>
          <Checkbox name={option[0]} checked={this.state.checkedItems.get(option[0])} onChange={this.handleChange} subCheckboxes={option[1]} />
      </div>
    ))

    return(
      <div>
        {this.props.subQuestion.text}
        {checkboxes}
      </div>
    )
  }
}

export default SubQuestion
