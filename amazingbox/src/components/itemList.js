import React from "react";
import Item from "./Item";

function ItemList(props) {
  const { files, cb } = props;


  return (
    <div className="ItemList">
      <table className="item-table" cellSpacing="0" cellPadding="0">
        <thead>
          <tr className="head-row">
            <th className="th-empty"></th>
            <th className="th-type">Type</th>
            <th className="th-name">Name</th>
            <th className="th-lastUpdate">Last Updated</th>
            <th className="th-size">Size</th>
            <th className="th-empty2"></th>
            <th className="th-empty3"></th>
          </tr>
        </thead>
        <tbody>
          {files.map(file => (
            <tr className="file-row" key={file.path_lower}>
              <Item file={file} cb={cb} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemList;
