import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import useDeepEffect from "../../hooks/useDeepEffect";
import SpriteCreator from "../custom-components/SpriteCreator";

const Home = (props) => {
  useDeepEffect(() => {
    let auth_token = Cookies.get("auth_token");

    if (!auth_token) {
      props.history.push("/login");
    }
  }, [props.history]);

  return (
    <div className="home-wrapper">
      <Link to="/overworld">
        <button>Game Start</button>
      </Link>
      <SpriteCreator />
    </div>
  );
};

export default Home;
