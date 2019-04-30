import React from "react";
import { Link } from "react-router-dom";

import {getTime, bytesToSize} from "../utils";

function Item(props) {
    const file = props.file;
    const type = file[".tag"];

    return (
        <> 
            <td className="td-type material-icons">{type === "folder" ? "folder" : "insert_drive_file"}</td>
            <td className='td-name'>{type === "folder" ? <Link to={`${file.path_display}`}>{file.name}</Link> : file.name}</td>
            <td className='td-lastUpdate'>{type !== "folder" ? getTime(file.server_modified) : null}</td>
            <td className='td-size'>{type !== "folder" ? bytesToSize(file.size) : null}</td>
            <td className='td-menu'><button className="material-icons">more_horiz</button></td>
        </>
    );
}

export default Item;
