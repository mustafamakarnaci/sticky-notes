import React, { useContext } from 'react';
import MainContext from '../MainContext';

const LeaveComponentText = () => {
  const { position } = useContext(MainContext);
  return (
    <div
      className='leave-comment-text'
      style={{ position: 'fixed', top: position.y[1], left: position.x[1] }}
    >
      Yazmak için tıkla
    </div>
  );
};

export default LeaveComponentText;
