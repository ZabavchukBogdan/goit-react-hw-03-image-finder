import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

export class Modal extends Component {
  //Вішаємо слухача подій при відкривання модалки та "відключаємо" scroll
  componentDidMount() {
    window.addEventListener('keydown', this.onKeydown);
    document.body.style.overflow = 'hidden';
  }

  //Знімакємо слухача подій при закритті модалки та "вмикаємо" scroll
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeydown);
    document.body.style.overflow = 'visible';
  }

  //Закриття на "esc"
  onKeydown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  //Закриття при кліку на Backdrop
  onBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { modalImgURL, tagsImg } = this.props;

    return (
      <Overlay onClick={this.onBackdropClick}>
        <ModalWindow>
          <img src={modalImgURL} alt={tagsImg} />
        </ModalWindow>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  modalImgURL: PropTypes.string.isRequired,
  tagsImg: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
