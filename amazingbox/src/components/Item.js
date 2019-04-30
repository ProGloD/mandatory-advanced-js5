import React,{ useState} from "react";
import ItemMenu from "../components/ItemMenu/itemMenu";

function getTime(timestamp) {
    return new Date(timestamp).toLocaleString('sv-SE');
}

function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    if (i === 0) return `${bytes} ${sizes[i]}`
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}

function Item(props) {
    const [showMenu, updateShowMenu] = useState(false);

    return (
        <>
            {props.file[".tag"] === "folder" ? <td className="material-icons">folder</td> : <td className="material-icons">insert_drive_file</td>}
            <td>{props.file.name}</td>
            <td>{getTime(props.file.server_modified)}</td>
            <td>{bytesToSize(props.file.size)}</td>
            <td><button onClick={()=>!showMenu? updateShowMenu(true) : updateShowMenu(false)} className="material-icons">more_horiz</button></td>
            <td>{showMenu? <ItemMenu></ItemMenu> : null}</td>
        </>
    );
}

export default Item;
