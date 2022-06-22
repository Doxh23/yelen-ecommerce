import React from "react";
import {
  NavLink,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Information from "./information";

const Profile = () => {
  const { information } = useParams();

  const renderSwitch = (params) => {
    switch (params) {
      case "aperçu":
        return "<Information   />";
      default:
        break;
    }
  };
  return (
    <>
      <div className="content">
        <div className="profile-sidebar">
          <NavLink to={"/profile/information"} className="navigation">
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
              case "information":
                return <Information />;
              case "adress":
              /** @aFaire */
            }
          })()}
        </div>
      </div>
    </>
  );
};
export default Profile;
