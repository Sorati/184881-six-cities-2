import withLayout from '../../hocs/withLayout';

class SignIn extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      login: ``,
      password: ``,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.loginSubmitHandler(this.state);
  }

  handleChange(e) {
    switch (e.target.name) {
      case `email`:
        return this.setState({login: e.target.value});
      case `password`:
        return this.setState({password: e.target.value});
      default:
        return null;
    }
  }

  render() {

    return (
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={this.handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required value={this.state.login} onChange={this.handleChange}/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required value={this.state.password} onChange={this.handleChange}/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    );
  }

}

export default withLayout(SignIn);

SignIn.propTypes = {
  loginSubmitHandler: PropTypes.func.isRequired,
};
