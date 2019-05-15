import React, { useState, useEffect } from "react";
import ItemMenu from "../components/ItemMenu/itemMenu";
import { Link } from "react-router-dom";
import { favorite$, updateFavorite } from "../store/favoriteStore";
import { getTime, bytesToSize, getThumbnail, download } from "../utils";


function Item(props) {
    const [favorite, updateUserFavorite] = useState(favorite$.value);
    const [showMenu, updateShowMenu] = useState(false);
    const [image, updateImage] = useState("");
    const file = props.file;
    const type = file[".tag"];

    useEffect(() => { //här håller useEffect koll på våra filer. Den koller vilken sorts fil det är.
        let subscription = favorite$.subscribe(favorite => {
            updateUserFavorite(favorite);
        });
        if (checkIfImage(file.name)) {
            getThumbnail((img) => updateImage(img), file.path_lower);
        } else if(type === "folder")
            updateImage("folder");
        else {
            updateImage("insert_drive_file");
        }   
        return () => {
            subscription.unsubscribe();
        };
    }, [file]);

 
    function checkIfImage(fileName) { //function för att koll fil-typ
        let names = fileName.split(".");
        let format = names[names.length - 1 ];
        if (format === "png" || format === "jpg" || format === "jpeg" || format === "tiff" || format === "tif" || format === "gif" || format === "bmp") {
            return true;
        }
        else {
            return false;
        } 
    }

    function addFavorite() {
        let newFavorite = [...favorite];

        if (newFavorite.find(x => x.id === file.id)) {
            newFavorite = newFavorite.filter(x => x.id !== file.id);
        } else {
            newFavorite.push(file);
        }

        updateFavorite(newFavorite);
    }

    return (
        <>
            <td><button className="favorite-Button material-icons" onClick={addFavorite}>{ favorite && favorite.find(x => x.id === file.id) ? "star" : "star_border"}</button></td>
            <td className="td-type material-icons">{image}</td>
            <td className="td-name">{type === "folder" ? <Link to={`/home${file.path_display}`}>{file.name}</Link> : file.name}</td>
            <td className="td-lastUpdate">{type !== "folder" ? getTime(file.server_modified) : null}</td>
            <td className="td-size">{type !== "folder" ? bytesToSize(file.size) : null}</td>
            <td className="td-download material-icons">{type === "file" ? <span onClick={()=>download(file.path_lower)}>cloud_download</span> : null}</td>
            <td className="td-menuButton"><button onClick={() => !showMenu ? updateShowMenu(true) : updateShowMenu(false)} className="td-menuButton material-icons">more_horiz</button></td>
            <td className="td-menu">{showMenu ? <ItemMenu file={file}  updateFiles={props.updateFiles}></ItemMenu> : null}</td>
        </>
    );
}

export default Item;
