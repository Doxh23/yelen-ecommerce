import React from "react";
import {
  NavLink,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Information from "./Information";
import "./style/style.css";
import Adress from "./Adress";
import Orders from "./Orders";
import Welcome from "./Welcome";

const Profile = () => {
  const { information } = useParams();
  return (
    <>
      <div className="content-profile">
        <div className="profile-sidebar">
        <NavLink to={"/profile"} className="navigation">
            My account
          </NavLink>
          <NavLink to={"/profile/informations"} className="navigation">
            information
          </NavLink>
          <NavLink to={"/profile/adress"} className="navigation">
            adress
          </NavLink>
          <NavLink to={"/profile/orders"} className="navigation">
            orders
          </NavLink>
          <NavLink to={"/logout"} className="navigation">
            logout
          </NavLink>
        </div>
        <div className="information">
          {(() => {
            switch (information) {
              case "informations":
                return <Information />;
              case "adress":
                return <Adress />;
              case "orders":
                return <Orders />;
              default:
                return <Welcome />;
            }
          })()}
        </div>
      </div>
    </>
  );
};
export default Profile;
