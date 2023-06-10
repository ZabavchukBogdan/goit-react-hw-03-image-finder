import { React, Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getPictures } from 'api/api';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './image-gallery/ImageGallery';
import { Wrapper } from './App.styled';
import { Loader } from './loader/Loader';
import { Button } from './button/Button';
import { ModalImg } from './modal/Modal';

export class App extends Component {
  state = {
    textForSearch: '',
    pictures: null,
    totalHits: null,
    error: null,
    status: 'idle',
    showModal: false,
    urlBig: '',
    alt: '',
  };

  // метод отримання та збереження у state тексту для пошуку зображення
  receiveTextForSearch = text => {
    this.setState({ textForSearch: text });
  };

  // метод отримання та збереження перших зображень у state
  async componentDidUpdate(_, prevState) {
    const { textForSearch } = this.state;

    if (prevState.textForSearch !== textForSearch) {
      this.setState({ status: 'pending' });

      try {
        const data = await getPictures(textForSearch);
        const pictures = data.hits;
        const totalHits = data.totalHits;

        if (!pictures.length) {
          this.setState({
            error: `Зображення ${textForSearch} відсутні`,
            status: 'rejected',
          });
        } else {
          this.setState({ pictures, status: 'resolved', totalHits });
        }
      } catch (error) {
        this.setState({ error: error.message, status: 'rejected' });
      }
    }
  }

  // метод отримання та додавання наступних зображень до state
  addPictures = async page => {
    const { textForSearch } = this.state;

    try {
      const data = await getPictures(textForSearch, page);
      const pictures = data.hits;

      if (!pictures.length) {
        this.setState({
          error: `Зображення ${textForSearch} відсутні`,
          status: 'rejected',
        });
      } else {
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...pictures],
          status: 'resolved',
        }));
      }
    } catch (error) {
      this.setState({ error: error.message, status: 'rejected' });
    }
  };

  // метод відкриття модального вікна
  openModal = event => {
    this.setState({ urlBig: event.target.dataset.url });
    this.toggleModal();
  };

  // метод зміни стану модального вікна
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const { status, pictures, error, totalHits, showModal, urlBig, alt } =
      this.state;
    const appearBtnOrNot = status === 'resolved' && totalHits > pictures.length;

    return (
      <Wrapper>
        <Searchbar onSubmit={this.receiveTextForSearch} />

        {status === 'pending' && <Loader />}
        {status === 'resolved' && (
          <ImageGallery pictures={pictures} onOpenModal={this.openModal} />
        )}
        {status === 'rejected' && <p>{error}</p>}
        {appearBtnOrNot && <Button morePictures={this.addPictures} />}

        {showModal && (
          <ModalImg closeModal={this.toggleModal}>
            <img src={urlBig} alt={alt} />
          </ModalImg>
        )}

        <ToastContainer autoClose={3000} />
      </Wrapper>
    );
  }
}

