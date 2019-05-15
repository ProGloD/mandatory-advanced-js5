import React, { useReducer, useState } from "react";

import { fileUpload, createFolder } from "../utils";
//import closePop from "../components/ItemMenu/menuPopUp";
import "../components/ItemMenu/menuPopUp.css";

function reducer(state, action) {
  switch (action.type) {
    case "showMenu": //toggle addMenu
      return {
        ...state,
        showMenu: !state.showMenu ? true : false,
        showCreateFolder: false,
        inputValue: ""
      };

    case "show_create_folder": //show input for adding folder
      console.log(state);
      return {
        ...state,
        showCreateFolder: true
      };

    case "cancel_folder": //cancle input for folder
      return {
        ...state,
        showCreateFolder: false,
        inputValue: ""
      };
  }
}

function AddFileButton(props) {
  const [state, dispatch] = useReducer(reducer, {
    showMenu: false,
    showCreateFolder: false,
    inputValue: ""
  });
  const { cb } = props;

  function onFileChange(event) {
    let array = Array.from(event.target.files);
    for (let file of array) {
      fileUpload(file, cb);
    }
  }

  return (
    <div className="add-menuContainer">
      {state.showCreateFolder ? (
        <div className="popUp">
          <div className="popUp-inputfield modal__shadow__container">
            <input
              className="modal__shadow__input"
              type="text"
              spellCheck="false"
              onChange={e => (state.inputValue = e.target.value)}
              required
            />
            <span className="modal__shadow__container__buttonBox">
              <button
                className="modal__shadow__container__buttonBox__button"
                onClick={() => {
                  createFolder(state.inputValue, cb);
                  dispatch({type: "cancel_folder"});
                }}
              >
                Create
              </button>
              <button
                className="modal__shadow__container__buttonBox__button"
                onClick={() => dispatch({ type: "cancel_folder" })}
              >
                Cancel
              </button>
            </span>
          </div>
        </div>
      ) : null}

      {state.showMenu ? (
        <div className="add-popupMenu">
          <input
            className="add-fileButton material-icons"
            type="file"
            multiple
            onChange={onFileChange}
          />
          <label
            className="custom-file-label material-icons opensecond"
            htmlFor="inputGroupFile01"
          >
            insert_drive_file
          </label>
          <button
            className="add-folderButton material-icons opensecond"
            onClick={() => dispatch({ type: "show_create_folder" })}
          >
            create_new_folder
          </button>
        </div>
      ) : null}
      <button
        className="add-button add-icon material-icons"
        onClick={() => dispatch({ type: "showMenu" })}
      >
        add_circle_outline
      </button>
    </div>
  );
}
export default AddFileButton;
