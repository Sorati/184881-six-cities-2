import withAuthReqiure from '../../hocs/withAuthRequire';
import PlaceCardList from '../place-card-list/place-card-list';
import Map from '../map/map';
import ReviewsList from '../reviews-list/reviews-list';
import ReviewsForm from '../reviews-form/reviews-form.connect';

class PlaceCardDetail extends React.PureComponent {

  constructor(props) {
    super(props);

    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  _favoriteClickHandler() {
    const {onClickToAuthRequire, changeFavoriteStatus, isAuthorizationRequired, card} = this.props;

    if (isAuthorizationRequired) {
      onClickToAuthRequire(isAuthorizationRequired);
    } else {
      changeFavoriteStatus(card.id, card.isFavorite);
    }
  }

  componentDidMount() {
    this.props.initCard(+this.props.match.params.id);
  }

  render() {
    const {
      card,
      comments,
      isAuthorizationRequired
    } = this.props;

    const BookmarkIconSize = {
      WIDTH: 31,
      HEIGHT: 33
    };

    const UserAvatarSize = {
      WIDTH: 74,
      HEIGHT: 74
    };

    const RATING_MAX_STARS = 5;
    const RATING_MAX_PERCENT = 100;
    const RATING_ROUNDING = 1;

    return (
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              <div className="property__image-wrapper">
                {card.images.map((item, index) => {
                  return (<img
                    className="property__image"
                    src={item}
                    key={`card-` + card.id + `-photo-` + index}
                    alt="Photo studio"/>);
                })}
              </div>
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {card.mark && <div className="property__mark">
                <span>{card.mark}</span>
              </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {card.title}
                </h1>
                <button className={`property__bookmark-button button ${(card.isFavorite && `property__bookmark-button--active`)}`} type="button" onClick={this._favoriteClickHandler}>
                  <svg className="property__bookmark-icon place-card__bookmark-icon" width={BookmarkIconSize.WIDTH} height={BookmarkIconSize.HEIGHT}>
                    <use xlinkHref="#icon-bookmark"/>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{
                    width: card.rating + `%`
                  }}/>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{(card.rating / RATING_MAX_PERCENT * RATING_MAX_STARS).toFixed(RATING_ROUNDING)}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {card.properties.entire}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {[card.properties.bedrooms, ` `]}
                Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                Max {[card.properties.adults, ` `]}
                adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">€{card.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">

                  {card.properties
                  .options
                  .map((item, index) => {
                    return (
                      <li className="property__inside-item" key={item + index}>
                        {item}
                      </li>
                    );
                  })}

                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div
                    className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="property__avatar user__avatar"
                      src="/img/avatar-angelina.jpg"
                      width={UserAvatarSize.WIDTH}
                      height={UserAvatarSize.HEIGHT}
                      alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                  Angelina
                  </span>
                  <span className="property__user-status">
                  Pro
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                  A quiet cozy and picturesque that hides behind a a river by the unique lightness
                  of Amsterdam. The building is green and from 18th century.
                  </p>
                  <p className="property__text">
                  An independent House, strategically located between Rembrand Square and National
                  Opera, but where the bustle of the city comes to rest in this alley flowery and
                  colorful.
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews ·
                  <span className="reviews__amount">{comments.length}</span>
                </h2>
                <ReviewsList reviews={comments}/>

                {!isAuthorizationRequired &&
                 <ReviewsForm id={card.id}/>
                }

              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map cards={this.props.nearCards} hoveredCard={this.props.card}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PlaceCardList cards={this.props.nearCards} isNear={true}/>
          </section>
        </div>
      </main>

    );
  }
}


export default withAuthReqiure(PlaceCardDetail);

PlaceCardDetail.propTypes = {
  onClickToAuthRequire: PropTypes.func.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  changeFavoriteStatus: PropTypes.func.isRequired,
  initCard: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    mark: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool,
    images: PropTypes
      .arrayOf(PropTypes.string)
      .isRequired,
    reviews: PropTypes.arrayOf(PropTypes.shape({
      user: PropTypes.shape({name: PropTypes.string.isRequired, photo: PropTypes.string.isRequired}),
      rating: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    })),
    nearCards: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      mark: PropTypes.string.isRequired,
      isNear: PropTypes.bool
    })),
    properties: PropTypes.shape({
      entire: PropTypes.string.isRequired,
      bedrooms: PropTypes.number.isRequired,
      adults: PropTypes.number.isRequired,
      options: PropTypes.arrayOf(PropTypes.string.isRequired)
    })
  }),
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    mark: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool,
    images: PropTypes
      .arrayOf(PropTypes.string)
      .isRequired,
    reviews: PropTypes.arrayOf(PropTypes.shape({
      user: PropTypes.shape({name: PropTypes.string.isRequired, photo: PropTypes.string.isRequired}),
      rating: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    })),
    properties: PropTypes.shape({
      entire: PropTypes.string.isRequired,
      bedrooms: PropTypes.number.isRequired,
      adults: PropTypes.number.isRequired,
      options: PropTypes.arrayOf(PropTypes.string.isRequired)
    })
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    })
  }),
  comments: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.shape({name: PropTypes.string.isRequired, photo: PropTypes.string.isRequired}),
    rating: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  })),
  nearCards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    mark: PropTypes.string.isRequired,
    isNear: PropTypes.bool
  })),

};
