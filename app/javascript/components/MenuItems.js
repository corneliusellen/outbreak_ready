import React from "react";
import PropTypes from "prop-types";
import { Hero } from 'react-bulma-components';
import { Container } from 'react-bulma-components';
import { Heading } from 'react-bulma-components';
import { Section } from 'react-bulma-components';
import { Columns } from 'react-bulma-components';
import { Button } from 'react-bulma-components';
import { Image } from 'react-bulma-components';
import { Form } from 'react-bulma-components';
import LogoHeader from './shared/LogoHeader'

class MenuItems extends React.Component {
  constructor() {
    super()
    this.state = {
      foodInput: undefined,
      selectedIngredients: [],
      allSelected: 'Select All'
    }
  }

  ingredientItems = () => {
    return(
      this.props.ingredients.map((ingredient) => {
        return (
          <Button onClick={this.handleSelect.bind(this)} className="button" color={this.isSelected(ingredient)} style={{ width: '100%', margin: 2}}>
            {ingredient}
          </Button>
        )
      })
    )
  }

  isSelected = (ingredient) => {
    if (this.state.selectedIngredients.length == 0) {
      return ""
    } else if (this.state.selectedIngredients.includes(ingredient)) {
      return "primary"
    } else {
      return ""
    }
  }

  renderMenuItems = () => {
    const items = this.ingredientItems()
    const itemsPerColumn = Math.ceil(items.length / 7)
    const columns = items.reduce((total, item, index) => {
      if ((index % itemsPerColumn) === 0) total.push([])
      total[Math.floor(index/itemsPerColumn)].push(item)
      return total
    }, [])

    return(
      columns.map((item) => {
        return(
          <Columns.Column>
            {item}
          </Columns.Column>
        )
      })
    )
  }

  handleSelect = (event) => {
    const item = event.target.textContent
    this.setState(state => {
        const newSelectedIngredients = state.selectedIngredients.includes(item)
            ? state.selectedIngredients.filter(i => i !== item) // remove item
            : [ ...state.selectedIngredients, item ]; // add item
        return {
            selectedIngredients: newSelectedIngredients,
        };
    });
  }

  handleSelectAll = () => {
    this.setState(state => {
      if (this.state.selectedIngredients.length == 0) {
        return { selectedIngredients: this.props.ingredients, allSelected: 'Unselect All'  }
      } else {
        return { selectedIngredients: [], allSelected: 'Select All' }
      }
    })
  }

  onSubmit = () => {
    
  }

  render() {
    return(
      <div>
        <Section>
          <LogoHeader img_src={this.props.img_src}/>
          <Container>
            <Heading style={{marginTop: 20}}>
              Menu Items
            </Heading>
            <Heading subtitle>
              Select foods to include in your questionnaire as exposures.
            </Heading>
          </Container>
          <Container style={{marginTop: 20}}>
              <Button onClick={this.handleSelectAll.bind(this)} className="button">
                {this.state.allSelected}
              </Button>
            <Container style={{ marginTop: 15}}>
              <Columns style={{ margin: 0}}>
                {this.renderMenuItems()}
              </Columns>
            </Container>
            <Form.Control>
              <Button onClick={this.onSubmit} className="button" color="primary" renderAs="a" href={`/builder?id=${this.props.id}`}>Submit</Button>
            </Form.Control>
          </Container>
        </Section>
      </div>
    )
  }
}

export default MenuItems
