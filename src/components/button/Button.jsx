import PropTypes from 'prop-types';
import { Component } from 'react';
import { BtnLoadMore } from './Button.styled';

export class Button extends Component {
  state = { page: 2 };

  // функція додавання page та відправки даних до ImageGallery
  addPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.props.morePictures(this.state.page);
  };

  render() {
    return (
      <BtnLoadMore type="button" onClick={this.addPage}>
        Load more
      </BtnLoadMore>
    );
  }
}

Button.propTypes = {
  morePictures: PropTypes.func.isRequired,
};
