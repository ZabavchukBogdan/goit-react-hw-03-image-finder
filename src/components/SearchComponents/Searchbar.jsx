import { Component } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix';
import {
  SearchbarContainer,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export class SearchBar extends Component {
  state = {
    textForSearch: '',
  };
  handlePictureNameChange = event => {
    this.setState({ textForSearch: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (!this.state.textForSearch.trim()) {
      Notify.info('Please enter a topic to search for images...', {
        position: 'center-center',
      });

      return;
    }

    this.props.onSubmit(this.state.textForSearch.trim());

    this.setState({ textForSearch: '' });
  };

  render() {
    return (
      <SearchbarContainer>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit" className="button">
            Search
          </SearchFormButton>
          <SearchFormInput
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.textForSearch}
            onChange={this.handlePictureNameChange}
          />
        </SearchForm>
      </SearchbarContainer>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
