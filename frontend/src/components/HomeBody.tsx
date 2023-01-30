import classes from "../components/HomeBody.module.css";
import { Link } from "react-router-dom";

function HomeBody() {
  return (
    <>
      <div className={classes.body}>
        <div className={classes.masthead}>Think you have what it takes?</div>
        <div className={classes.subtitle}>
          Create your own markets, compete against your friends or the public
        </div>
      </div>
      <div className={classes.auth}>
        <Link to="/auth/login" className={classes.bodyLogin}>
          Log in
        </Link>
        <Link to="/auth/signup" className={classes.bodySingup}>
          Sign up
        </Link>
      </div>
    </>
  );
}

export default HomeBody;
