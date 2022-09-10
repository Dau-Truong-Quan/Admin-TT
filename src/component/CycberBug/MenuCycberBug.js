import { CopyOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import React from "react";
import { NavLink } from "react-router-dom";

const MenuCycberBug = () => {
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img
            src="https://scontent.fsgn10-1.fna.fbcdn.net/v/t1.18169-9/12990986_215996132106435_899151384658340637_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=UxcyFZi-EDIAX-5MhOk&_nc_oc=AQl8d01iJZfpDatE0Ts1eQ6K2K1K1DBrGsnfmDIao0PezoTDf_rDkZ6yStTtCG1NLEcDJSpcsLWxdxTZAwu_7ROx&_nc_ht=scontent.fsgn10-1.fna&oh=00_AT8lYpthCyo4lKcKvSuuqlQIIE7aO7bB85FS3FOi9DNQ_w&oe=63339313"
            alt
          />
        </div>
        <div className="account-info">
          <p>Đậu Trường Quân</p>
          <p>Ministore.vn</p>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="fa fa-credit-card" />
          <NavLink
            className="text-dark"
            activeClassName="font-weight-bold"
            to="/"
          >
            Dashboard
          </NavLink>
        </div>
        <div>
          <ShoppingCartOutlined />
          <NavLink
            className="text-dark"
            activeClassName="font-weight-bold"
            to="/order"
          >
            Manager Order
          </NavLink>
        </div>

        <div>
          <CopyOutlined />
          <NavLink
            className="text-dark"
            activeClassName="font-weight-bold"
            to="/projectManager"
          >
            Improt Manager
          </NavLink>
        </div>
        <div>
          <i className="fa fa-cog" />
          <NavLink
            className="text-dark"
            activeClassName="font-weight-bold"
            to="/productManager"
          >
            Manager Product
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MenuCycberBug;
