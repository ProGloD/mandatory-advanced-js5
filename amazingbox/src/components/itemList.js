import React from "react";
import Item from "./Item";
import AddFileButton from "./addFileAndFolder"; //component för att lägga till filer och mappar
import Path from "./Path";
import Search from "./Search";


function ItemList(props) {
  const {files} = props;
/*
  function remove(path) {
    console.log(path);
    let dbx = new Dropbox.Dropbox({ fetch, accessToken: userToken });
    dbx
      .filesDelete({ path })
      .then(_ => getFiles())
      .catch(error => console.log(error));
  }
)
*/
  return (
    <div className="ItemList">
      {/* <Search updateFiles={updateFiles} getFiles={getFiles} /> */}
      <Path />
      <table className="item-table" cellSpacing="0" cellPadding="0">
        <thead>
          <tr className="head-row">
            <th className="th-type">Type</th>
            <th className="th-name">Name</th>
            <th className="th-lastUpdate">Last Updated</th>
            <th className="th-size">Size</th>
          </tr>
        </thead>
        <tbody>
          {files.map(file => (
            <tr className="file-row" key={file.path_lower}>
              <Item
                file={file}
              />
            </tr>
          ))}
        </tbody>
      </table>
      {/* <AddFileButton updateFiles={getFiles} path={path} /> */}
    </div>
  );
}

export default ItemList;
