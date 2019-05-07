import React from "react";
import { Link } from "react-router-dom";

function Path(props) {
  const path = props.path.split("/");

  return (
    <div>
      {path.map((element, index) => {
        const way = path.slice(0, index + 1).join("/");

        if (!way) {
          return (
            <Link key={way} to="/">
              amazingbox
            </Link>
          );
        } else {
          return (
            <Link key={way} to={`/home${way}`}>
              /{element}
            </Link>
          );
        }
      })}
    </div>
  );
}

export default Path;
