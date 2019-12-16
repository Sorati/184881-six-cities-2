const Review = (props) => {

  const {user, rating, text, date} = props;

  const stringDate = new Date(date).toLocaleString(`en-US`, {month: `long`, year: `numeric`});

  const UserAvatarSize = {
    WIDTH: 54,
    HEIGHT: 54
  };

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.photo}
            width={UserAvatarSize.WIDTH}
            height={UserAvatarSize.HEIGHT}
            alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: rating + `%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {text}
        </p>
        <time className="reviews__time" dateTime={date}>{stringDate}</time>
      </div>
    </li>
  );
};

export default Review;

Review.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }),
  rating: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

