import React from "react"
import PropTypes from "prop-types"
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components';
import { Hero } from 'react-bulma-components';
import { Container } from 'react-bulma-components';
import { Heading } from 'react-bulma-components';
import { Section } from 'react-bulma-components';

class Hello extends React.Component {
  render () {
    return (
      <Hero>
        <Hero.Body>
          <Container>
            <Heading>
              Outbreak Questionnaire Builder
            </Heading>
          </Container>
          <Container>
            <Section>
              Welcome to the Questionnaire Builder Tool!
            </Section>
            <Section>
              <p>Use this tool to build an outbreak questionnaire during an enteric disease outbreak investigation. In this tool, you will:</p>

              <p>(1) Complete an intake form with outbreak details</p>
              <p>(2) Select questions for each section of your outbreak questionnaire</p>
              <p>(3) Review draft questionnaire and make changes</p>
              <p>(4) Download your outbreak questionnaire</p>
            </Section>
            <Section>
              <p>This tool was developed by the Colorado Integrated Food Safety Center of Excellence. For more information, visit <a href="www.cofoodsafety.org">COFoodSafety.org</a>.</p>

              <p>Do you have a suggestion for how to improve this tool, or outbreak questionnaires you would like to share? Email us.</p>
            </Section>
          </Container>
          <Container>
            <Section>
              <div style={{padding: 10}}>
                <Button className="button is-info" renderAs="a" href="/admin/dashboard">
                  Admin Dashboard
                </Button>
              </div>
              <div style={{padding: 10}}>
                <Button className="button is-info" renderAs="a" href="/intake">
                  Begin Building
                </Button>
              </div>
            </Section>
          </Container>
        </Hero.Body>
        <Hero.Footer>
          <Container>

          </Container>
        </Hero.Footer>
    </Hero>
    );
  }
}

// HelloWorld.propTypes = {
//   greeting: PropTypes.string
// };
export default Hello
