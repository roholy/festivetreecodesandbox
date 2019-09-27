import React, { Component } from "react";
// import { createStore } from 'redux';
// import noteReducer from '../reducers/NoteReducer';
// import {updateNoteBody, updateNoteTitle} from '../actions/NoteActions';
import "../css/Note.css";

const GENERIC_NOTE_TITLE = "",
  GENERIC_NOTE_BODY = "";

class Note extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.state = {
      title: GENERIC_NOTE_TITLE,
      body: GENERIC_NOTE_BODY,
      editMode: true
    };
  }

  handleEdit() {
    this.setState({
      editMode: true
    });
  }

  handleSave() {
    this.setState({
      title: this.refs.titleContent.value,
      body: this.refs.bodyContent.value,
      editMode: false
    });
  }
  handleDelete() {
    this.props.deleteHandler(this.props.id);
  }

  render() {
    let titleElement, bodyElement, buttonArea, finishCheck;
    if (this.state.editMode) {
      titleElement = (
        <textarea
          ref="titleContent"
          className="title-textarea"
          defaultValue={this.state.title}
        />
      );
      bodyElement = (
        <textarea
          ref="bodyContent"
          className="body-textarea"
          defaultValue={this.state.body}
        />
      );
      buttonArea = (
        <div>
          <button
            className="btn btn-primary"
            onClick={this.handleSave.bind(this)}
          >
            Save
          </button>
        </div>
      );
      finishCheck = (
        <label class="switch">
          <input type="checkbox" />
          <span class="slider round" />
        </label>
      );
    } else {
      titleElement = <h5>{this.state.title}</h5>;
      bodyElement = <p>{this.state.body}</p>;
      buttonArea = (
        <div>
          <button className="btn btn-info" onClick={this.handleEdit.bind(this)}>
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={this.handleDelete.bind(this)}
          >
            Delete
          </button>
        </div>
      );
      finishCheck = (
        <label class="switch">
          <input type="checkbox" />
          <span class="slider round" />
        </label>
      );
    }

    return (
      <div className="col-sm-6">
        <div className="card card-view">
          <div className="card-body">
            {finishCheck}
            {titleElement}
            {bodyElement}
            {buttonArea}
          </div>
        </div>
      </div>
    );
  }
}

export default Note;
