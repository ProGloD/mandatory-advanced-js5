import React from "react";
import { Link } from "react-router-dom";

function Path(props) {
  const path = props.path.split("/");
  path.shift();

  return (
    <div>
      <Link to="/">amazingbox</Link>
    </div>
  );
}

export default Path;
