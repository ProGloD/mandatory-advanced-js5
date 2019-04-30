<<<<<<< HEAD
import React,{ useState} from "react";
import ItemMenu from "../components/ItemMenu/itemMenu";
=======
import React from "react";
import { Link } from "react-router-dom";
>>>>>>> e59f383e986adce512429464102e36ba371070d1

import {getTime, bytesToSize} from "../utils";

function Item(props) {
<<<<<<< HEAD
    const [showMenu, updateShowMenu] = useState(false);

    return (
        <>
            {props.file[".tag"] === "folder" ? <td className="material-icons">folder</td> : <td className="material-icons">insert_drive_file</td>}
            <td>{props.file.name}</td>
            <td>{getTime(props.file.server_modified)}</td>
            <td>{bytesToSize(props.file.size)}</td>
            <td><button onClick={()=>!showMenu? updateShowMenu(true) : updateShowMenu(false)} className="material-icons">more_horiz</button></td>
            <td>{showMenu? <ItemMenu></ItemMenu> : null}</td>
=======
    const file = props.file;
    const type = file[".tag"];

    return (
        <> 
            <td className="material-icons">{type === "folder" ? "folder" : "insert_drive_file"}</td>
            <td>{type === "folder" ? <Link to={`${file.path_display}`}>{file.name}</Link> : file.name}</td>
            <td>{type !== "folder" ? getTime(file.server_modified) : null}</td>
            <td>{type !== "folder" ? bytesToSize(file.size) : null}</td>
            <td><button className="material-icons">more_horiz</button></td>
>>>>>>> e59f383e986adce512429464102e36ba371070d1
        </>
    );
}

export default Item;
