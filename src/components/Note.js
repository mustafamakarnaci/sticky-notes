import React, { useContext, useState } from 'react';
import Draggable from 'react-draggable';
import MainContext from '../MainContext';
import { GiConfirmed, GiCancel } from 'react-icons/gi';

const Note = ({ note, color, position, number }) => {
  const [visible, setVisible] = useState(false);
  const [editedNote, setEditedNote] = useState('');
  const [editable, setEditable] = useState(false);
  const [clickable, setClickable] = useState(true);

  /* const [move, setMove] = useState(false); */

  const { setMode, notes, setNotes } = useContext(MainContext);

  const showNote = () => {
    if (clickable) {
      setVisible(!visible);
    }
  };

  const setNotePosition = (e, data) => {
    console.log(data);
    const newNotes = notes.map((n) => {
      if (n.number === number) {
        n.position = {
          x: data.x,
          y: data.y,
        };
      }
      return n;
    });
    setNotes(newNotes);
  };

  const editNote = () => {
    setEditable(true);
  };

  const confirmEdit = () => {
    const newNotes = notes.map((n) => {
      if (n.number === number) {
        n.note = editedNote;
      }
      return n;
    });
    setNotes(newNotes);
    setEditable(false);
    setEditedNote('');
  };

  return (
    <Draggable
      /* if note on drag then set visible clicl false */
      onDrag={() => setClickable(false)}
      /** if drag stop then set visible click true */
      onStart={() => setClickable(true)}
      onStop={setNotePosition}
      defaultPosition={{ x: position.x, y: position.y }}
    >
      <div
        onMouseEnter={() => setMode(false)}
        onMouseLeave={() => setMode(true)}
        className='note-container'
        style={{
          '--color': color,
          position: 'absolute',
        }}
      >
        <span onClick={showNote} className='note-box-number'>
          {number}
        </span>
        <div className='note' style={{ display: visible ? 'flex' : 'none' }}>
          <div className='note2'>{note}</div>
          {editable && (
            <textarea
              onChange={(e) => setEditedNote(e.target.value)}
              cols='30'
              rows='5'
              placeholder={note}
            />
          )}
          <div className='edit'>
            {note &&
              (editable ? (
                <React.Fragment>
                  <button
                    onClick={confirmEdit}
                    className='edit-confirm'
                    type='button'
                    disabled={!editedNote}
                  >
                    Confirm <GiConfirmed />
                  </button>
                  <button
                    onClick={() => setEditable(false)}
                    className='edit-cancel'
                    type='button'
                  >
                    Cancel
                    <GiCancel />
                  </button>
                </React.Fragment>
              ) : (
                <button
                  onClick={editNote}
                  className='edit-button'
                  type='button'
                >
                  Edit
                </button>
              ))}
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Note;
