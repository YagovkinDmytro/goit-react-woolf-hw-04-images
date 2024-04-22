import { useEffect } from 'react';

const Modal = ({ largeImageURL, tagsImages, handleSetCloseModal }) => {
  const handleClick = evt => {
    if (evt.target.className === 'Overlay') {
      handleSetCloseModal();
    }
  };

  useEffect(() => {
    const handleEsc = ({ code }) => {
      if (code === 'Escape') {
        handleSetCloseModal();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [handleSetCloseModal]);

  return (
    <div className="Overlay" onClick={handleClick}>
      <div className="Modal">
        <img src={largeImageURL} alt={tagsImages} />
      </div>
    </div>
  );
};

export default Modal;
