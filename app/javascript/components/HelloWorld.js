import React from "react"
import PropTypes from "prop-types"
class HelloWorld extends React.Component {
  render () {
    return (
      <p>
      Welcome to the Questionnaire Builder Tool!

      Use this tool to build an outbreak questionnaire during an enteric disease outbreak investigation. In this tool, you will:
      (1) Complete an intake form with outbreak details
      (2) Select questions for each section of your outbreak questionnaire
      (3) Review draft questionnaire and make changes
      (4) Download your outbreak questionnaire

      This tool was developed by the Colorado Integrated Food Safety Center of Excellence. Foqr more information, visit COFoodSafety.org.

      Do you have a suggestion for how to improve this tool, or outbreak questionnaires you would like to share? Email us.
      </p>
    );
  }
}

// HelloWorld.propTypes = {
//   greeting: PropTypes.string
// };
export default HelloWorld
