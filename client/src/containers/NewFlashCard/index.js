import React, { Component } from 'react';
import axios from 'axios';
import Card from '../../components/Card';
import { Link } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';
import { Form, Button, Icon,Container } from 'semantic-ui-react';

class NewFlashCard extends Component {
  state = {
    flashCard: [],
    questionText: '',
    answerText: ''
  }
  async componentDidMount() {
    console.log("Inside componentDidMount");
    try {
      const { data } = await axios.get(`/api/flashcard/`);
      this.setState({ flashCard: data });
    } catch (e) {
      console.log(e);
    }
  }  
  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  handleAdd = async (event) => {
    try {
      const { data } = await axios.post('/api/flashcard', {question: `${this.state.questionText}`, answer: `${this.state.answerText}`});
      const flashCard = [...this.state.flashCard, data];
    } catch (e) {
      console.log(e);
    }
  }

  renderCards = () => {
    if (this.state.flashCard.length === 0) {
      return <p>You're a loner</p>
    } else {
      return this.state.flashCard.map(card => {
        return <Card.CardForm
          id = {card.id}
          key = {card.id}
          question = {card.question}
          answer = {card.answer}
          />
      })
    }
  }
  renderForm = () => {
    return (
      <Container style={{ height: '50vh' }}>
        <Form>
          <Form.Field>
            <label style={{color: 'white'}}>Enter New Question</label>
            <input 
            style = {{height: '20px'}}
            name = "questionText"
            value = {this.state.questionText}
            onChange = {this.handleInputChange}
            />
          </Form.Field>
        </Form>
        <Form>
          <Form.Field >
            <label style={{color: 'white'}}>Enter New Answer</label>
            <input 
            style = {{height: '20px'}}
            name = "answerText"
            value = {this.state.answerText}
            onChange = {this.handleInputChange}
            />
          </Form.Field>
      </Form>
      <span>
      <Link to = '/flashcard'>
      <Button animated onClick={(e) => this.handleAdd(e)}>
      <Button.Content visible>Submit</Button.Content>
      <Button.Content hidden>
        <Icon name='checkmark' />
      </Button.Content>
      </Button>
      </Link>
      <Link to = '/'> 
      <Button animated >
      <Button.Content visible>Cancel</Button.Content>
      <Button.Content hidden>
        <Icon name='x' />
      </Button.Content>
      </Button>
      </Link>
      </span>
    </Container>
  );
}

  render() {
    return (
      <Wrapper>
        { this.renderForm() }
        { this.renderCards() }

      </Wrapper>
    );
  }
}

export default NewFlashCard;