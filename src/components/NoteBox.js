import React, { useContext, useState } from 'react';
import MainContext from '../MainContext';

const NoteBox = () => {
  const { boxPosition, setMode, notes, setNotes, setBoxVisible } =
    useContext(MainContext);
  const [note, setNote] = useState('');

  const types = [
    {
      id: 0,
      name: 'comment',
      color: 'rgb(255, 51, 0)',
      text: 'yorum',
    },
    {
      id: 1,
      name: 'private-comment',
      color: '#999',
      text: 'gizli yorum',
    },
    {
      id: 2,
      name: 'note',
      color: 'orange',
      text: 'not',
    },
  ];

  const [color, setColor] = useState(types[0].color);

  const changeColor = (e) => {
    setColor(e.target.value);
  };

  const addNote = () => {
    const currentNote = {
      note,
      number: notes.length + 1,
      color,
      position: {
        x: boxPosition.x,
        y: boxPosition.y,
      },
    };
    setNotes([...notes, currentNote]);
    setBoxVisible(false);
    setMode(true);
  };

  return (
    <div
      className='note-box'
      onMouseEnter={() => {
        return setMode(false);
      }}
      onMouseLeave={() => {
        return setMode(true);
      }}
      style={{
        '--color': color,
        position: 'absolute',
        top: boxPosition.y,
        left: boxPosition.x,
      }}
    >
      <span className='note-box-number'>{notes.length + 1}</span>
      <select onChange={changeColor}>
        {types.map((type) => {
          return (
            <option key={type.id} value={type.color}>
              {type.text}
            </option>
          );
        })}
      </select>
      <textarea
        onChange={(e) => setNote(e.target.value)}
        cols='30'
        rows='5'
        placeholder='bir şeyler yaz...'
      ></textarea>
      <button onClick={addNote} disabled={!note}>
        Ekle
      </button>
    </div>
  );
};

export default NoteBox;
