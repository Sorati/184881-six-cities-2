const PlacesOptionList = (props) => {
  const {isOpen, sortType, availableSorts, optionsClickHandler} = props;

  return (
    <ul
      className={`places__options places__options--custom ` + (isOpen && `places__options--opened`)}>
      {availableSorts.map((item) => {
        return (
          <li
            className={`places__option ` + ((sortType === item) && `places__option--active`)}
            tabIndex="0"
            onClick={() => {
              optionsClickHandler(item);
            }}
            key={`sort-` + item}>{item}</li>
        );
      })}
    </ul>
  );
};

export default PlacesOptionList;

PlacesOptionList.propTypes = {
  sortType: PropTypes.string.isRequired,
  availableSorts: PropTypes.arrayOf(PropTypes.string.isRequired),
  isOpen: PropTypes.bool,
  optionsClickHandler: PropTypes.func.isRequired,
};

