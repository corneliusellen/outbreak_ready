import React from "react";
import PropTypes from "prop-types";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Container } from 'react-bulma-components';
import { Heading } from 'react-bulma-components';
import { Section } from 'react-bulma-components';
import { Form } from 'react-bulma-components';
import { Button } from 'react-bulma-components';
import axios from 'axios';
import QuestionGroup from './QuestionGroup.js';
import SubQuestion from './SubQuestion.js';

class Intake extends React.Component {
  constructor() {
    super()
    this.state = {
      email: ''
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit = (e) => {
    const { email } = this.state;
    axios.post('/intake', { email })
      .then((result) => {
        return;
      });
  }

  render () {
    return(
      <div>
        <Section>
          <Container>
            <Heading>
              Intake Form
            </Heading>
            <Heading subtitle>
              Input your outbreak details into the following form. Your questionnaire will populate with instructions and questions based on the information you put into the form.
            </Heading>
          </Container>
        </Section>
        <Section>
          <Container>
            <QuestionGroup text='1. Do you have a suspect or confirmed etiology?'
                           options={ [['Yes', 0, 1], ['No', 1, 2]] }
                           type= 'RadioGroup'
                           subQuestions={ [
                                            { text: '1a. Suspected etiology - select all that apply:',
                                              options: [['Bacteria', ['Campylobacter jejuni','Clostridium botulinum','E. Coli','E. coli 0157:H7','Listeria monocytogenes','Salmonella','Shigella','Vibro parahaemolyticus','Vibro vulnificus']], ['Viral', ['Norovirus','Hepatitis A']], ['Parasite',['Cryptosporidium','Cyclospora cayetanensis','Giardia lamblia']], ['Toxin', ['Bacillus cereus','Clostridium perfringens','Staphyloccocus aureus']], ['Chemical'], ['Other']],
                                              type: 'Checkbox',
                                              logic: 0
                                            },
                                            { text: '1a. Suspected transmission route - select all that apply:',
                                              options: [['Foodborne'], ['Waterborne',['Drinking Water','Recreational water']], ['Person-to-person'], ['Sexual'], ['Animal', ['Poultry','Reptiles','Amphibians','Mouse/rat','Zoo','Farm','Hatchery','Feeder rodents','Petting zoo','Dogs']], ['Environmental'], ['Unknown']],
                                              type: 'Checkbox',
                                              logic: 1
                                            }
                                          ]
                                        }
              />
            </Container>
          </Section>
          <Section>
            <Container>
              <QuestionGroup text='2. Which of the following best describes the type of outbreak you are investigating?'
                           options={ [["A localized outbreak associated with an event or single setting (e.g., potluck, wedding, petting zoo, camp, hospital)", 0, 3], ["A dispersed outbreak likely associated with a widely distributed food or product", 1, 4]] }
                           type= 'RadioGroup'
                           subQuestions={ [
                                            { text: '2a. Suspected setting-select all that apply:',
                                              options: [['Restaurant',['Type - Sit-down','Type - Buffet','Type - Fast food','Type - Mobile food truck','Style - American','Style - Sushi','Style - Italian','Style - Mexican','Style - Sandwich or deli','Style - Brunch','Style - Tavern','Style - Pizzeria','Style - Burger']], ['School or childcare', ['Childcare/preschool','Elementary','Middle school/high school','College']], ['Camp'],['Campground'],['Farm'],['Institution', ['Long-term care facility','Hospital','Prison','Homeless shelter']],['Event',['Professionally catered','Wedding','Potluck','Picnic','Barbeque','Sporting','Fair/festival','Conference/meeting']],['Adult arcades and bath houses'],['Stock show']],
                                              type: 'Checkbox',
                                              logic: 0
                                            },
                                            { text: '2a. Do you suspect any specific foods or dietary patterns? (check all that apply)',
                                              options: [['Fish',['Sushi']],['Shellfish',['Oysters']],['Dairy',['Cheese','Fluid milk']],['Game'],['Meat',['Pork','Poultry - general','Chicken','Turkey']],['Eggs'],['Fruit'],['Vegetables'],['Grains'],['Beans'],['Nuts/seeds'],['Raw cookie dough/flour'],['Smoothies'],['BBQ'],['Mexican'],['Health supplements'],['Caramel apples'],['Healthy eater'],['Toddler foods']],
                                              type: 'Checkbox',
                                              logic: 1
                                            }
                                          ]
                                        }
            />
          </Container>
        </Section>
        <Section>
          <Container>
            <SubQuestion subQuestion={ { text: "3. Do you want to include additional questions on any of the following topics? (check all that apply)",
                  options: [['Cannabis use'],['Sexual history'],['Illicit drug use']],
                  type: 'Checkbox',
                  logic: 1
                } } parent={true}/>
          </Container>
        </Section>
        <Section>
          <Container>
            <Form.Field>
              <Form.Label>
                4. Enter a name for your outbreak questionnaire:
              </Form.Label>
              <Form.Control>
                <Form.Input onChange={this.onChange} name="email" type="email" placeholder="My amazing questionnaire" value={this.state.email}/>
              </Form.Control>
            </Form.Field>
            </Container>
          </Section>
          <Section>
            <Container>
              <Form.Field kind="group">
                <Form.Control>
                  <Button>Cancel</Button>
                </Form.Control>
                <Form.Control>
                  <Button onClick={this.onSubmit} className="button is-info" renderAs="a" href="/builder">Submit</Button>
                </Form.Control>
              </Form.Field>
            </Container>
          </Section>
      </div>
    )
  }
}

export default Intake
