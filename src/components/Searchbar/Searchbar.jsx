const Searchbar = ({ searchParam }) => {
  const handleSubmit = evt => {
    evt.preventDefault();
    searchParam(evt.target.search.value);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;

// import { Component } from 'react';

// const INITIAL_STATE = {
//   searchValue: '',
// };

// class Searchbar extends Component {
//   state = {
//     searchValue: '',
//   };

//   handleFormSubmit = evt => {
//     evt.preventDefault();
//     this.props.handleSubmit(this.state.searchValue);
//     this.setInitialState();
//   };

//   handleChange = ({ target: { value, name } }) => {
//     this.setState({ [name]: value });
//   };

//   setInitialState = () =>
//     this.setState({
//       ...INITIAL_STATE,
//     });

//   render() {
//     return (
//       <header className="Searchbar">
//         <form className="SearchForm" onSubmit={this.handleFormSubmit}>
//           <button type="submit" className="SearchForm-button">
//             <span className="SearchForm-button-label">Search</span>
//           </button>

//           <input
//             className="SearchForm-input"
//             value={this.state.searchValue}
//             onChange={evt => this.handleChange(evt)}
//             name="searchValue"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }

// export default Searchbar;
