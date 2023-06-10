import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay } from './Modal.styled';
import { Modal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class ModalImg extends Component {
  // функція закриття модального вікна по клавіші ESC
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  // функція закриття модального вікна по кліку на backdrop
  handleBackDrop = event => {
    if (event.currentTarget === event.target) {
      this.props.closeModal();
    }
  };

  // вішаємо слухач на модальне вікно
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  // знімаємо слухач з модального вікна
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return createPortal(
      <Overlay onClick={this.handleBackDrop}>
        <Modal>{this.props.children}</Modal>
      </Overlay>,
      modalRoot
    );
  }
}

ModalImg.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
