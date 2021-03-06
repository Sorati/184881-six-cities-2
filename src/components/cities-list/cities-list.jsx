import withActiveItem from '../../hocs/withActiveItem';

const CitiesList = (props) => {
  const {cities, activeItem, cityFilterClickHandler, onSelectActiveElement} = props;

  return (
    <ul className="locations__list tabs__list">
      {cities.map((item) => {
        return (
          <li className="locations__item" key={`city-` + item}>
            <a
              className={`locations__item-link tabs__item ` + (item === activeItem && `tabs__item--active`)}
              href="#"
              onClick={() => {
                cityFilterClickHandler(item);
                onSelectActiveElement(item);
              }}>
              <span>{item}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default withActiveItem(CitiesList);

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string.isRequired),
  activeItem: PropTypes.string,
  cityFilterClickHandler: PropTypes.func.isRequired,
  onSelectActiveElement: PropTypes.func.isRequired,
};
