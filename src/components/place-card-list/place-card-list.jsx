import PlaceCard from '../place-card/place-card.connect';
import withActiveItem from '../../hocs/withActiveItem';

class PlaceCardList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  cardHoverHandler(card) {
    this.props.onCardHover(card);
    this.props.onSelectActiveElement(card);
  }

  render() {
    const {cards, isNearList, isFavoriteList} = this.props;

    let listClassName;
    const placesListClasses = ` places__list tabs__content`;

    if (isNearList) {
      listClassName = `near-places__list` + placesListClasses;
    } else if (isFavoriteList) {
      listClassName = `favorites__places`;
    } else {
      listClassName = `cities__places-list` + placesListClasses;
    }

    if (cards.length) {
      return (
        <div
          className={listClassName}>
          {cards.map((item) => {

            const {
              id,
              title,
              image,
              price,
              rating,
              type,
              mark,
              isFavorite
            } = item;

            return (<PlaceCard
              key={`offerCard-` + id}
              id={id}
              title={title}
              image={image}
              price={price}
              rating={rating}
              type={type}
              mark={mark}
              isNear={isNearList}
              isFavorite={isFavorite}
              isFavoriteList={isFavoriteList}
              onCardHover={() => this.cardHoverHandler(item)}
              onCardHoverOut={() => this.cardHoverHandler(null)}/>);
          })}
        </div>
      );
    } else {
      return (
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property availbale at the moment in Dusseldorf</p>
              </div>
            </section>
            <div className="cities__right-section" />
          </div>
        </div>
      );
    }


  }
}

export default withActiveItem(PlaceCardList);

PlaceCardList.propTypes = {
  cards: PropTypes.array.isRequired,
  onSelectActiveElement: PropTypes.func.isRequired,
  isNearList: PropTypes.bool,
  isFavoriteList: PropTypes.bool,
  onCardHover: PropTypes.func,
  sort: PropTypes.string,
};
