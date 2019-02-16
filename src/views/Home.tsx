import React, { useState } from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [roomName, setRoomName] = useState('');
  return (
    <div className={styles.container}>
      <input
        value={roomName}
        onChange={e => setRoomName(e.target.value)}
        type="text"
      />
      <Link to={roomName}>Join</Link>
    </div>
  );
};

export default Home;
