import {Link} from "react-router-dom";

const Layout = (props) => {
  const {children, isAuthorizationRequired, user} = props;

  let userBlock;

  if (isAuthorizationRequired) {
    userBlock =
    <>
      <Link className="header__nav-link header__nav-link--profile" to="/login">
        Sign In
      </Link>
    </>;
  } else {
    userBlock =
      <>
       <Link className="header__nav-link header__nav-link--profile" to="/favorites">
         <div className="header__avatar-wrapper user__avatar-wrapper"></div>
         <span className="header__user-name user__name">{user.email}</span>
       </Link>
      </>
    ;
  }

  return (
    <>
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to="/">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"/>
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  {userBlock}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      {children}
    </div>
    </>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  user: PropTypes.object,
};
