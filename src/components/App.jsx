import { React, Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getPictures } from 'api/api';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './image-gallery/ImageGallery';
import { Wrapper } from './App.styled';
import { Loader } from './loader/Loader';
import { Button } from './button/Button';
import { ModalWindow } from './modal/Modal';



export class App extends Component {
  state = {
    textForSearch: '',
    page: 1,
    pictures: [],
    totalPages: 0,
    per_page: 12,
    status: 'idle',
    modalImgURL: '',
    tagsImg: '',
    modalVisible: false,
    error: false,
  };

  // метод отримання та збереження перших зображень у state
  componentDidUpdate(_, prevState) {
    const { page, textForSearch, per_page } = this.state;

    if (
      prevState.page !== this.state.page ||
      prevState.textForSearch !== this.state.textForSearch
    ) {
      this.setState({ status: 'pending' });

      
      getPictures(textForSearch, page, per_page)
        .then(elements => {
          if (!elements.hits.length) {
            this.setState({ status: 'idle' });
            return toast.info(`Зображення ${textForSearch} відсутні`);
          }

          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...elements.hits],
            totalPages: Math.ceil(elements.totalHits / per_page),
            status: 'idle',
          }));
        })
        .catch(error => {
          this.setState({ error: true });
          console.log(error);
        });
    }
  }

  //додаємо данні в this.state
  handleFormSubmit = textForSearch => {
    this.setState({ textForSearch, page: 1, pictures: [] });
  };

  //Додаємо сторінку
  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  //Функія по кліку на картинку, для запису data в this.state та відкриття модалки
  getImgData = (modalImgURL, tagsImg) => {
    this.setState({ modalImgURL: modalImgURL, tagsImg: tagsImg });
    this.toggleModal();
  };

  // Закриття модалки
  toggleModal = () => {
    this.setState(state => ({
      modalVisible: !state.modalVisible,
    }));
  };

  render() {
    const {
      status,
      modalImgURL,
      tagsImg,
      modalVisible,
      page,
      totalPages,
      pictures,
      error,
    } = this.state;

    return (
      <Wrapper>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {pictures.length > 0 && !error && (
          <ImageGallery pictures={pictures} onClick={this.getImgData} />
        )}

        {status === 'pending' && !error && <Loader />}

        {pictures.length > 0 && totalPages !== page && !error && (
          <Button onClick={this.handleLoadMore} />
        )}

        {modalVisible && (
          <ModalWindow
            modalImgURL={modalImgURL}
            tagsImg={tagsImg}
            onClose={this.toggleModal}
          />
        )}


         <ToastContainer autoClose={3000} />
      </Wrapper>
    );
  }
}



