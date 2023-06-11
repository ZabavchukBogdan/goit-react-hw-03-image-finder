import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay } from './Modal.styled';
import { Modal } from './Modal.styled';

export class ModalWindow extends Component {
  //Вішаємо слухача подій при відкривання модалки та "відключаємо" scroll
  componentDidMount() {
    window.addEventListener('keydown', this.onKeydown);
    document.body.style.overflow = 'hidden';
  }

  //Знімаємо слухача подій при закритті модалки та "вмикаємо" scroll
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
        <Modal>
          <img src={modalImgURL} alt={tagsImg} />
        </Modal>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  modalImgURL: PropTypes.string.isRequired,
  tagsImg: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};