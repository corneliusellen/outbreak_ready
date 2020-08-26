import React from "react"
import PropTypes from "prop-types"
import { Button } from 'react-bulma-components';
import { Hero } from 'react-bulma-components';
import { Container } from 'react-bulma-components';
import { Columns } from 'react-bulma-components';
import { Heading } from 'react-bulma-components';
import { Section } from 'react-bulma-components';
import { Image } from 'react-bulma-components';

class Hello extends React.Component {
  render () {
    return (
      <Hero color="primary" gradient>
        <Hero.Body>
          <Container>
          <Columns className="is-vcentered">
            <Columns.Column>
              <Heading>
                Outbreak Questionnaire Builder
              </Heading>
            </Columns.Column>
            <Columns.Column align='right'>
              <Container style={{ width: 120 }}>
                <Image src={this.props.img_src} />
              </Container>
            </Columns.Column>
          </Columns>
          </Container>
          <Container>
            <Section>
              Welcome to the Outbreak Questionnaire Builder Tool!
            </Section>
            <Section>
              <p>Use this tool to build an outbreak questionnaire during an enteric disease outbreak investigation. In this tool, you will:</p>

              <p>(1) Complete an intake form with outbreak details</p>
              <p>(2) Select questions for each section of your outbreak questionnaire</p>
              <p>(3) Review draft questionnaire and make changes</p>
              <p>(4) Download your outbreak questionnaire</p>
            </Section>
            <Section>
              <p>This tool was developed by the Colorado Integrated Food Safety Center of Excellence. For more information, visit <a href="https://coloradosph.cuanschutz.edu/research-and-practice/centers-programs/foodsafety">COFoodSafety.org</a>.</p>

              <p>Do you have a suggestion for how to improve this tool, or outbreak questionnaires you would like to share? <a href="mailto: alice.white@cuanschutz.edu">Email us.</a></p>
            </Section>
          </Container>
          <Container>
            <Section>
              <div style={{padding: 10}}>
                <Button className="button" color="primary" renderAs="a" href="/intake">
                  Begin Building
                </Button>
              </div>
              <br/>
              <br/>
              <br/>
              <br/>
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

export default Hello
