import React,{ useState} from "react";
import ItemMenu from "../components/ItemMenu/itemMenu";
import { Link } from "react-router-dom";

import {getTime, bytesToSize} from "../utils";

function Item(props) {
    const [showMenu, updateShowMenu] = useState(false);
    const file = props.file;
    const type = file[".tag"];

    return (
        <>
            <td className="material-icons">{type === "folder" ? "folder" : "insert_drive_file"}</td>
            <td>{type === "folder" ? <Link to={`/home${file.path_display}`}>{file.name}</Link> : file.name}</td>
            <td>{type !== "folder" ? getTime(file.server_modified) : null}</td>
            <td>{type !== "folder" ? bytesToSize(file.size) : null}</td>
            <td><button onClick={()=>!showMenu? updateShowMenu(true) : updateShowMenu(false)} className="material-icons">more_horiz</button></td>
            <td>{showMenu? <ItemMenu name={file.name}></ItemMenu> : null}</td>
        </>
    );
}

export default Item;
