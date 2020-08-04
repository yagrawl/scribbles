import React from "react"
import { Link } from "gatsby"

import Theme from "../elements/theme"

const Navbar = (props) => (
  <div>
    <div className="navbar-title">
      <Link className="link" to="/">
        <p className={(props.root) ? "title-root" : "title-non-root"}>
          {props.title}
          <span className="blinking-cursor">{props.cursor}</span>
        </p>
      </Link>
      <p className={(props.root) ? "subtitle-root" : "subtitle-non-root"}>Written by&nbsp;
        <Link className="link" to="/about">
          <span className="subtitle-name">{props.author}</span>
        </Link> in {props.location}.
      </p>
    </div>

    <div className="theme">
      <Theme/>
    </div>
    <div className="clear"></div>
  </div>
);

export default Navbar
