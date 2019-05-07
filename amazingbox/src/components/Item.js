import React, { useState, useEffect } from "react";
import ItemMenu from "../components/ItemMenu/itemMenu";
import { Link } from "react-router-dom";
import Dropbox from "dropbox";
import fetch from "isomorphic-fetch";

import { getTime, bytesToSize } from "../utils";
import {token$} from "../store/authToken"

function Item(props) {
    
    const [showMenu, updateShowMenu] = useState(false);
    const [image, updateImage] = useState("");
    const file = props.file;
    const type = file[".tag"];

    useEffect(() => {
        if (checkIfImage(file.name)) {
            getThumbnail(file.path_lower);
        } else {
            updateImage("insert_drive_file");
        }   
    }, [file]);

    function getThumbnail(path) {
        console.log("image");
        console.log(path);

        let dbx = new Dropbox.Dropbox({ fetch, accessToken: token$.value });
        dbx
          .filesGetThumbnail({path})
          .then(response => {  
            console.log(response)
            
            updateImage(<img className="thumbnail" src={window.URL.createObjectURL(response.fileBlob)}></img>);
          })
          .catch(_ => {
              updateImage("photo");
          });

          return image;
    }

    function checkIfImage(fileName) {
        let names = fileName.split(".");
        let format = names[names.length - 1 ];
        if (format === "png" || format === "jpg" || format === "jpeg" || format === "tiff" || format === "tif" || format === "gif" || format === "bmp") {
            return true;
        }
        else {
            return false;
        }
    }

    return (
        <>
            <td className="td-type material-icons">{type === "folder" ? "folder" : image}</td>
            <td className='td-name'>{type === "folder" ? <Link to={`/home${file.path_display}`}>{file.name}</Link> : file.name}</td>
            <td className='td-lastUpdate'>{type !== "folder" ? getTime(file.server_modified) : null}</td>
            <td className='td-size'>{type !== "folder" ? bytesToSize(file.size) : null}</td>
            <td className='td-menuButton'><button onClick={() => !showMenu ? updateShowMenu(true) : updateShowMenu(false)} className="td-menuButton material-icons">more_horiz</button></td>
            <td className='td-menu'>{showMenu ? <ItemMenu list={file} name={file.name} path={props.path} updateFiles={props.updateFiles} remove={props.remove}></ItemMenu> : null}</td>
        </>
    );
}

export default Item;
