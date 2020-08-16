import React from "react";
import PropTypes from "prop-types";
import { Container } from 'react-bulma-components';
import { Heading } from 'react-bulma-components';
import { Section } from 'react-bulma-components';
import { Form } from 'react-bulma-components';
import { Button } from 'react-bulma-components';
import { Hero } from 'react-bulma-components';
import { Columns } from 'react-bulma-components';
import { Image } from 'react-bulma-components';
import axios from 'axios';
import QuestionGroup from './QuestionGroup.js';
import SubQuestion from './SubQuestion.js';

class Intake extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      checkedTags: new Map()
    }
    this.onCheckboxChange = this.onCheckboxChange.bind(this)
  }

  onTitleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onCheckboxChange = (e) => {
    const tag = e.target.name;
    const isChecked = e.target.checked;

    this.setState(prevState => ({ checkedTags: prevState.checkedTags.set(tag, isChecked) }));
  }

  onSubmit = (e) => {
    const { title, checkedTags } = this.state;
    const tags = []
    const filterCheckedTags = function(value,key,map){if (value == true) { tags.push(key) }}

    checkedTags.forEach(filterCheckedTags)

    axios.post(`/intake?id=${this.props.id}`, { title, tags })
      .then((result) => {
        return;
      });
  }

  render () {
    return(
      <div>
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
          <Container>
            <Heading style={{marginTop: 20}}>
              Intake Form
            </Heading>
            <Heading subtitle>
              Input your outbreak details into the following form. Your questionnaire will populate with instructions and questions based on the information you put into the form.
            </Heading>
            <p>
              <em>If you don't see your specific category listed, please contact the Colorado
               Integrated Food Safety Center of Excellence.</em>
            </p>
          </Container>
        </Section>
        <Section>
          <Container>
            <QuestionGroup text='1. Do you have a suspect or confirmed etiology?'
                           options={ [['Yes', 0, 1], ['No', 1, 2]] }
                           type= 'RadioGroup'
                           checkedTags={this.state.checkedTags}
                           handleCheckboxChange={this.onCheckboxChange}
                           subQuestions={ [
                                            { text: '1a. Suspected or confirmed etiology - select all that apply:',
                                              options: [['Bacteria', ['Campylobacter jejuni','Clostridium botulinum','E. Coli','E. coli 0157:H7','Listeria monocytogenes','Salmonella','Shigella','Vibro parahaemolyticus','Vibro vulnificus']], ['Viral', ['Norovirus','Hepatitis A']], ['Parasite',['Cryptosporidium','Cyclospora cayetanensis','Giardia lamblia']], ['Toxin', ['Bacillus cereus','Clostridium perfringens','Staphyloccocus aureus']], ['Chemical'], ['Other']],
                                              type: 'Checkbox',
                                              logic: 0
                                            },
                                            { text: '1a. Suspected transmission route - select all that apply:',
                                              options: [['Foodborne'], ['Waterborne',['Drinking Water','Recreational water']], ['Person-to-person'], ['Sexual'], ['Animal contact', ['Poultry','Reptiles','Amphibians','Mouse/rat','Zoo','Farm','Hatchery','Petting zoo','Rodents','Dogs']], ['Environmental'], ['Unknown']],
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
                           checkedTags={this.state.checkedTags}
                           handleCheckboxChange={this.onCheckboxChange}
                           type= 'RadioGroup'
                           subQuestions={ [
                                            { text: '2a. Suspected setting-select all that apply:',
                                              options: [['Restaurant',['Type - Sit-down','Type - Buffet','Type - Fast food','Type - Mobile food truck','Type - Take-out','Style - American','Style - Sushi','Style - Italian','Style - Mexican','Style - Sandwich or deli','Style - Brunch','Style - Tavern','Style - Pizzeria','Style - Burger','Style - Asian','Style - Seafood']], ['School or childcare', ['Childcare/preschool','Elementary','Middle school/high school','College']], ['Camp'],['Campground'],['Farm/ranch'],['Institution', ['Long-term care facility','Hospital','Prison/jail','Homeless shelter']],['Event',['Professionally catered','Wedding','Potluck','Picnic','Barbeque','Sporting','Fair/festival','Conference/meeting']],['Adult arcades and bath houses'],['Stock show']],
                                              type: 'Checkbox',
                                              logic: 0
                                            },
                                            { text: '2a. Do you suspect any specific foods or dietary patterns? (check all that apply)',
                                              options: [['Fish',['Sushi']],['Shellfish',['Oysters']],['Dairy',['Cheese','Fluid milk','Ice cream','Yogurt']],['Game'],['Meat',['Pork','Poultry - general','Chicken','Turkey']],['Eggs'],['Fruit'],['Vegetables'],['Grains'],['Beans'],['Nuts/seeds'],['Raw cookie dough/flour'],['Smoothies'],['BBQ'],['Mexican'],['Health supplements'],['Caramel apples'],['Healthy eater'],['Toddler foods'],['Vegetarian/vegan']],
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
                  options: [['Cannabis use'],['Sexual history'],['Illicit drug use'],['People experiencing homelessness']],
                  type: 'Checkbox',
                  logic: 1
                } } parent={true}
                checkedTags={this.state.checkedTags}
                handleCheckboxChange={this.onCheckboxChange} />
          </Container>
        </Section>
        <Section>
          <Container>
            <Form.Field>
              <Form.Label>
                4. Enter a name for your outbreak questionnaire:
              </Form.Label>
              <Form.Control>
                <Form.Input onChange={this.onTitleChange} name="title" type="text" placeholder="My amazing questionnaire" value={this.state.title}/>
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
                  <Button onClick={this.onSubmit} className="button" color="primary" renderAs="a" href={`/builder?id=${this.props.id}`}>Submit</Button>
                </Form.Control>
              </Form.Field>
            </Container>
          </Section>
      </div>
    )
  }
}

export default Intake
