import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';

import {
  Form,
  Header,
  BtnSearchForm,
  BtnLabel,
  Input,
} from './Searchbar.styled';



export class Searchbar extends Component {
  state = { text: '' };

  // отримання значення з поля введення та запис до state
  handleSearch = ({ currentTarget: { value } }) => {
    this.setState({ text: value.toLowerCase() });
  };

  // функція відправки даних до App
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.text.trim() === '') {
      return toast.warn('Ви не ввели текст для пошуку!');
    }
    this.props.onSubmit(this.state.text); // прокидання до Арр state
    this.setState({ text: '' }); // очищення поля пошуку
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <BtnSearchForm type="submit">
            <BtnLabel>Search</BtnLabel>
          </BtnSearchForm>

          <Input
            type="text"
            name="text"
            value={this.state.text}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleSearch}
          />
        </Form>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
