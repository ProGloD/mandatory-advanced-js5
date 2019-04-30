import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Dropbox from "dropbox";
import Item from "./Item";

function ItemList(props) {
  return (
      <div className="ItemList">
          <table className='item-table' cellSpacing='0' cellPadding='0'>
            <thead>
            <tr className='head-row'>
                <th>Type</th>
                <th>Name</th>
                <th>Last Updated</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              {props.files.map((file) => 
              <tr key={file.path_lower} > 
                <Item file={file} />
              </tr>
              )}
              </tbody>
          </table>
      </div>
  );
}

export default ItemList;