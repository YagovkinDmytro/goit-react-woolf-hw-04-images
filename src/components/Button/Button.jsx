const Button = ({ handleAddPage }) => {
  return (
    <button type="submit" className="Button" onClick={() => handleAddPage()}>
      Load more
    </button>
  );
};

export default Button;
