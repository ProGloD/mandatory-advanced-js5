import React from "react";
import Dropbox from "dropbox";
import fetch from "isomorphic-fetch";
import { token$, updateToken } from "./store/authToken";
import { path$ } from "./store/path"; 
import { favorite$ , updateFavorite } from "./store/favoriteStore";

export function login() {
  let key = "kvms35pmp4vwz5n";
  return new Dropbox.Dropbox({
    fetch,
    clientId: key
  }).getAuthenticationUrl("http://localhost:3000/auth-done");
}

export function logout() {
  let dbx = new Dropbox.Dropbox({ fetch, accessToken: token$.value }); 
  dbx
    .authTokenRevoke()
    .then(_ => updateToken(null))
    .catch(error => console.log(error));
}

export function getFiles(cb) {
  let path = window.location.pathname;

  let dbx = new Dropbox.Dropbox({ fetch, accessToken: token$.value });
  dbx
    .filesListFolder({ path: path$.value })
    .then(response => { 
      if(path === window.location.pathname){
        cb(response.entries);
      }
    })
    .catch(_ => updateToken(null));
}

export function getAllFiles(updateFiles){ 
  let dbx = new Dropbox.Dropbox({ fetch, accessToken: token$.value });
  dbx
    .filesListFolder({path: "", recursive: true})
      .then(response=>{
            let files = response.entries;
            updateFiles(files.filter(element => element[".tag"] === "folder").sort((a,b) => a.path_lower.localeCompare(b.path_lower)));              
          })
      .catch(error =>
          console.log(error)
      );
}

export function createFolder(name, cb) {
  let path = window.location.pathname;
  
  let dbx = new Dropbox.Dropbox({ fetch, accessToken: token$.value });
  dbx
    .filesCreateFolder({
      path: `${path$.value}/${name}`,
      autorename: true
    })
    .then(_ => {
      if(path===path$.value){
        getFiles(cb);
      }
    })
    .catch(error => console.log(error));
}

export function fileUpload(file, cb) {
  let path = window.location.pathname === "/" ? "" : window.location.pathname.slice(5);
  
  let dbx = new Dropbox.Dropbox({ fetch, accessToken: token$.value });
  dbx
    .filesUpload({
      path: `${path$.value}/${file.name}`,
      contents: file,
      autorename: true
    })
    .then(_ => {
      if(path===path$.value){
        getFiles(cb);
      }
    })
    .catch(error => console.log(error));
}

export function search(cb, query) {
  let path = window.location.pathname;

  let dbx = new Dropbox.Dropbox({ fetch, accessToken: token$.value });
  dbx
    .filesSearch({ path: "", query })
    .then(response => {
      if(path === window.location.pathname){
       const result = [];

       response.matches.map(element => result.push(element.metadata));
      cb(result);
      }
    });
}


export function remove(filepath, cb) {
  let path = window.location.pathname;

  let dbx = new Dropbox.Dropbox({ fetch, accessToken: token$.value});
  dbx
    .filesDelete({ path: filepath })
    .then(_ => {
       if(path !== "/search"){
         getFiles(cb);
       }
    })
    .catch(error => console.log(error));
}

export function getThumbnail(cb, path) {
  let dbx = new Dropbox.Dropbox({ fetch, accessToken: token$.value });
  dbx
    .filesGetThumbnail({ path })
    .then(response => {
      cb(
        <img
          className="thumbnail"
          src={window.URL.createObjectURL(response.fileBlob)}
          alt=""
        />
      );
    })
    .catch(_ => {
      cb("photo");
    });
}

export function submitRename(from_path, to_path, cb, errorMsg){
  let path = window.location.pathname;

  let dbx = new Dropbox.Dropbox({ fetch, accessToken: token$.value });

  dbx
  .filesMove({from_path, to_path})
  .then(_ => {
    if(path !== "/search"){
      getFiles(cb);
    }
  })
  .catch(function(error) {
    errorMsg(error)
  })
}

export function copyTarget(from_path, to_path, cb) {
  let path = window.location.pathname;

  let dbx = new Dropbox.Dropbox({ fetch, accessToken: token$.value });
  dbx
    .filesCopy({from_path, to_path, autorename: true})
    .then(response => {
      if(path !== "/search"){
        getFiles(cb);
      }
      
    });
}

export function download(path) {
  let dbx = new Dropbox.Dropbox({ fetch, accessToken: token$.value });
  dbx
    .filesGetTemporaryLink({ path })
    .then(response => {
      window.location.href = response.link;
    })
    .catch(error => console.log(error));
}

export function move(from_path, to_path, cb){
  let path = window.location.pathname;

  let dbx = new Dropbox.Dropbox({ fetch, accessToken: token$.value });
  dbx
  .filesMove({from_path, to_path, autorename: true})
  .then(_=> {
      if(path !== "/search"){
        getFiles(cb);
      }
  })
  .catch(error => console.log(error));
}

export function parseQueryString(str) {
  var ret = Object.create(null);

  if (typeof str !== "string") {
    return ret;
  }

  str = str.trim().replace(/^(\?|#|&)/, "");

  if (!str) {
    return ret;
  }

  str.split("&").forEach(function(param) {
    var parts = param.replace(/\+/g, " ").split("=");
    // Firefox (pre 40) decodes `%3D` to `=`
    // https://github.com/sindresorhus/query-string/pull/37
    var key = parts.shift();
    var val = parts.length > 0 ? parts.join("=") : undefined;

    key = decodeURIComponent(key);

    // missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
    val = val === undefined ? null : decodeURIComponent(val);

    if (ret[key] === undefined) {
      ret[key] = val;
    } else if (Array.isArray(ret[key])) {
      ret[key].push(val);
    } else {
      ret[key] = [ret[key], val];
    }
  });

  return ret;
}

export function getTime(timestamp) {
  return new Date(timestamp).toLocaleString("sv-SE");
}

export function bytesToSize(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "n/a";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return `${bytes} ${sizes[i]}`;
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
}
