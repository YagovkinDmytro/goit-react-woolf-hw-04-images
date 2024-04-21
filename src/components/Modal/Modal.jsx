import { Component } from 'react';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
  }

  handleClick = evt => {
    if (evt.target.className === 'Overlay') {
      this.props.handleSetCloseModal();
    }
  };

  handleEsc = ({ code }) => {
    if (code === 'Escape') {
      this.props.handleSetCloseModal();
    }
  };
  render() {
    return (
      <div className="Overlay" onClick={this.handleClick}>
        <div className="Modal">
          <img src={this.props.largeImageURL} alt={this.props.tags} />
        </div>
      </div>
    );
  }
}

export default Modal;
