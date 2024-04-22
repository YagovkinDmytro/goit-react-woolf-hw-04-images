import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { getImageApi } from 'api/dataImages';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [loadMore, setLoadMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tagsImages, setTagsImages] = useState('');

  useEffect(() => {
    const getSearchImages = async () => {
      try {
        setIsLoading(true);
        setErrorMessage('');
        const data = await getImageApi(searchValue, page);
        const { totalHits, hits } = data;
        if (hits.length === 0) {
          setIsEmpty(true);
          setLoadMore(false);
          return;
        }
        setImages(prev => [...prev, ...hits]);

        setLoadMore(page < Math.ceil(totalHits / 12));
        setIsLoading(false);
        setIsEmpty(false);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (!searchValue) {
      return;
    }
    getSearchImages();
  }, [searchValue, page]);

  const searchParam = searchParam => {
    if (searchParam === '') {
      alert('Please type a new word');
      return;
    }
    if (searchParam === searchValue) {
      alert('We have already shown thoes photos');
      return;
    }
    setSearchValue(searchParam);
    setImages([]);
    setPage(1);
  };

  const handleAddPage = () => {
    setPage(prev => prev + 1);
  };

  const handleSetOpenModal = (largeImageURL, tags) => {
    setLargeImageURL(largeImageURL);
    setTagsImages(tags);
    setOpenModal(true);
  };

  const handleSetCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="App">
      {isLoading && <Loader></Loader>}
      <Searchbar searchParam={searchParam} />
      <ImageGallery>
        <ImageGalleryItem
          imagesArr={images}
          handleSetOpenModal={handleSetOpenModal}
        ></ImageGalleryItem>
      </ImageGallery>
      {errorMessage && <h1>{errorMessage}</h1>}
      {isEmpty && <h1>Sorry. There are no inages.😥</h1>}
      {loadMore && <Button handleAddPage={handleAddPage}></Button>}
      {openModal && (
        <Modal
          largeImageURL={largeImageURL}
          tagsImages={tagsImages}
          handleSetCloseModal={handleSetCloseModal}
        ></Modal>
      )}
    </div>
  );
};
