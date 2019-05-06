import React, { useState } from "react";
import ItemMenu from "../components/ItemMenu/itemMenu";
import { Link } from "react-router-dom";

import { getTime, bytesToSize } from "../utils";

function Item(props) {
    const [showMenu, updateShowMenu] = useState(false);
    const file = props.file;
    const type = file[".tag"];

    return (
        <>
            <td className="td-type material-icons">{type === "folder" ? "folder" : "insert_drive_file"}</td>
            <td className='td-name'>{type === "folder" ? <Link to={`/home${file.path_display}`}>{file.name}</Link> : file.name}</td>
            <td className='td-lastUpdate'>{type !== "folder" ? getTime(file.server_modified) : null}</td>
            <td className='td-size'>{type !== "folder" ? bytesToSize(file.size) : null}</td>
            <td className='td-menuButton'><button onClick={() => !showMenu ? updateShowMenu(true) : updateShowMenu(false)} className="td-menuButton material-icons">more_horiz</button></td>
            <td className='td-menu'>{showMenu ? <ItemMenu list={file} name={file.name} path={props.path} updateFiles={props.updateFiles}></ItemMenu> : null}</td>
        </>
    );
}

export default Item;
