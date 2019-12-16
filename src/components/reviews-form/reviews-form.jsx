class ReviewsForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rating: 0,
      comment: ``,
    };

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.sendComment(this.props.id, this.state).then(() => {
      this.setState({
        rating: 0,
        comment: ``,
      });
    });
  }

  handleCheckboxChange(e) {
    const ratingValue = e.target.value;
    this.setState((prevState) => ({...prevState, rating: +ratingValue}));
  }

  handleTextareaChange(e) {
    const commentValue = e.target.value;
    this.setState((prevState) => ({...prevState, comment: commentValue}));
  }

  render() {
    const StarImageIcon = {
      WIDTH: 37,
      HEIGHT: 33
    };

    const RatingValues = {
      PERFECT: 5,
      GOOD: 4,
      NOT_BAD: 3,
      BADLY: 2,
      TERRIBLY: 1
    };

    const RatingInputs = [
      {
        value: RatingValues.PERFECT,
        title: `perfect`,
      },
      {
        value: RatingValues.GOOD,
        title: `good`,
      },
      {
        value: RatingValues.NOT_BAD,
        title: `not bad`,
      },
      {
        value: RatingValues.BADLY,
        title: `badly`,
      },
      {
        value: RatingValues.TERRIBLY,
        title: `terribly`,
      }
    ];

    return (
      <form className="reviews__form form" action="#" method="post" onSubmit={this.handleSubmit}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {RatingInputs.map((item) => {
            return (
              <>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                defaultValue={item.value}
                id={item.value + `-stars`}
                type="radio"
                checked={this.state.rating === item.value}
                onChange={this.handleCheckboxChange}/>

              <label
                htmlFor={item.value + `-stars`}
                className="reviews__rating-label form__rating-label"
                title={item.title}>
                <svg className="form__star-image" width={StarImageIcon.WIDTH} height={StarImageIcon.HEIGHT}>
                  <use xlinkHref="#icon-star"/>
                </svg>
              </label>
              </>
            );
          })}
        </div>
        <textarea
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          value={this.state.comment}
          onChange={this.handleTextareaChange}/>

        <div className="reviews__button-wrapper">
          <p className="reviews__help">
                    To submit review please make sure to set
            <span className="reviews__star">rating</span>
                    and describe your stay with at least
            <b className="reviews__text-amount"> 50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled={!(this.state.comment && this.state.rating)}>Submit</button>
        </div>
      </form>
    );
  }
}

export default ReviewsForm;


ReviewsForm.propTypes = {
  id: PropTypes.number.isRequired,
  sendComment: PropTypes.func.isRequired,
};
