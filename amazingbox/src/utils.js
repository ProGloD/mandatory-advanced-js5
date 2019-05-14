import React from "react";
import Dropbox from "dropbox";
import fetch from "isomorphic-fetch";
import { token$, updateToken } from "./store/authToken";
import { path$ } from "./store/path";

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
  let dbx = new Dropbox.Dropbox({ fetch, accessToken: token$.value });
  dbx
    .filesListFolder({ path: path$.value })
    .then(response => cb(response.entries))
    .catch(e => updateToken(null));
}

//export function search(cb, )

export function remove(path) {
  let dbx = new Dropbox.Dropbox({ fetch, accessToken: token$.value });
  dbx
    .filesDelete({ path })
    .then(_ => {
      getFiles();
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
        />
      );
    })
    .catch(_ => {
      cb("photo");
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
