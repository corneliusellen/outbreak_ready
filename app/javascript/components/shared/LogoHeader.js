import React from "react";
import PropTypes from "prop-types";
import { Hero } from 'react-bulma-components';
import { Container } from 'react-bulma-components';
import { Heading } from 'react-bulma-components';
import { Section } from 'react-bulma-components';
import { Columns } from 'react-bulma-components';
import { Image } from 'react-bulma-components';

class LogoHeader extends React.Component {
  render() {
    return(
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
    )
  }
}

export default LogoHeader
