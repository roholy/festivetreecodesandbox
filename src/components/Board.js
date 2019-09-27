import React, { Component } from "react";
// import { createStore } from 'redux';
// import noteReducer from '../reducers/NoteReducer';
// import {updateBoard} from '../actions/NoteActions';
import "../css/Board.css";
import Note from "./Note";

// const store = createStore(noteReducer);

class Board extends Component {
  constructor() {
    super();
    this.state = {
      notes: []
    };
  }
  addNote({}) {
    this.state.notes.push({
      id: Date.now()
    });
    this.setState({
      notes: this.state.notes
    });
  }
  deleteNote(id) {
    let newNoteArr = this.state.notes;
    newNoteArr.map((note, index) => {
      if (id === note.id) {
        newNoteArr.splice(index, 1);
      }
    });
    this.setState({
      notes: newNoteArr
    });
  }

  render() {
    return (
      <div>
        <div className="div-board">
          <div className="row">
            {this.state.notes.map(note => {
              return (
                <Note
                  key={note.id}
                  id={note.id}
                  deleteHandler={this.deleteNote.bind(this)}
                />
              );
            })}
          </div>
        </div>
        <div>
          <button
            className="btn btn-success add-button"
            onClick={this.addNote.bind(this)}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}

// Board.js Board Component Class Function

// Note.defaultProps = {
//     title: "A cool title",
//     body: "A cool body",
//   };

export default Board;
