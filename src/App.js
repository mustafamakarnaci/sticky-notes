import { useRef, useEffect, useState } from 'react';
import './App.css';
import LeaveComponentText from './components/LeaveComponentText';
import MainContext from './MainContext';
import Note from './components/Note';
import NoteBox from './components/NoteBox';
import { IconAd } from './components/IconAd';

function App() {
  const screen = useRef(null);
  const [mode, setMode] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [boxVisible, setBoxVisible] = useState(false);
  const [notes, setNotes] = useState(
    (localStorage.notes && JSON.parse(localStorage.notes)) || [],
  );
  const [boxPosition, setBoxPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    screen.current.focus();
  }, []);

  const handleKeyUp = (e) => {
    if (e.key === 'c') {
      setMode(!mode);
      setBoxVisible(false);
    }
    if (e.key === 'Escape') {
      setBoxVisible(false);
    }
  };

  const handleMouseMove = (e) => {
    setPosition({ x: [e.pageX, e.clientX], y: [e.pageY, e.clientY] });
  };

  const handleClick = (e) => {
    if (mode) {
      setBoxPosition({
        x: position.x[0],
        y: position.y[0],
      });
      setBoxVisible(true);
    }
  };

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const data = {
    boxPosition,
    position,
    setMode,
    notes,
    setBoxVisible,
    setNotes,
    setPosition,
  };

  return (
    <MainContext.Provider value={data}>
      <IconAd />
      <div
        onClick={handleClick}
        ref={screen}
        onMouseMove={handleMouseMove}
        tabIndex={0}
        onKeyUp={handleKeyUp}
        className={`screen${mode && ' editable'}`}
      >
        <img
          className='wallpaper'
          src='./assets/Focal-Fossa_Plain_1.png'
          alt='wallpaper'
        />
        <p className='info'>Press "c" to type something</p>
        {mode && <LeaveComponentText>Yazmak için tıkla</LeaveComponentText>}
        {notes && notes.map((note, key) => <Note key={key} {...note} />)}
        {boxVisible && <NoteBox />}
      </div>
    </MainContext.Provider>
  );
}

export default App;
