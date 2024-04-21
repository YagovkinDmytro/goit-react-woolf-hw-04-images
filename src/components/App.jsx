import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { getImageApi } from 'api/dataImages';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    isLoading: false,
    error: '',
    searchValue: '',
    loadMore: false,
    isEmpty: false,
    openModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.searchValue !== prevState.searchValue ||
      this.state.page !== prevState.page
    ) {
      this.getSearchImages();
    }
  }

  getSearchImages = async () => {
    try {
      this.setState({ isLoading: true, error: '' });
      const data = await getImageApi(this.state.searchValue, this.state.page);
      const { totalHits, hits } = data;
      if (hits.length === 0) {
        this.setState({
          isEmpty: true,
          loadMore: false,
        });
        return;
      }
      this.setState(prev => ({
        images: [...prev.images, ...hits],
        loadMore: this.state.page < Math.ceil(totalHits / 12),
        isLoading: false,
        isEmpty: false,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  searchParam = searchValue => {
    if (searchValue === '') {
      alert('Please type a new word');
      return;
    }
    if (searchValue === this.state.searchValue) {
      alert('We have already shown thoes photos');
      return;
    }
    this.setState({ searchValue, images: [], page: 1 });
  };

  handleAddPage = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  handleSetOpenModal = (largeImageURL, tags) => {
    this.setState({
      largeImageURL,
      tags,
      openModal: true,
    });
  };

  handleSetCloseModal = () => {
    this.setState({
      openModal: false,
    });
  };

  render() {
    const {
      images,
      isLoading,
      error,
      loadMore,
      isEmpty,
      openModal,
      largeImageURL,
      tags,
    } = this.state;

    return (
      <div className="App">
        {isLoading && <Loader></Loader>}
        <Searchbar searchParam={this.searchParam} />
        <ImageGallery>
          <ImageGalleryItem
            imagesArr={images}
            handleSetOpenModal={this.handleSetOpenModal}
          ></ImageGalleryItem>
        </ImageGallery>
        {error && <h1>{error}</h1>}
        {isEmpty && <h1>Sorry. There are no inages.😥</h1>}
        {loadMore && <Button handleAddPage={this.handleAddPage}></Button>}
        {openModal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            handleSetCloseModal={this.handleSetCloseModal}
          ></Modal>
        )}
      </div>
    );
  }
}
