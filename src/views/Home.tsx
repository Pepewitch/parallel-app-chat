import React, { useState } from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import history from '../history';

const Home = () => {
  const [roomName, setRoomName] = useState('');
  return (
    <form
      className={styles.container}
      onSubmit={e => {
        e.preventDefault();
        history.push(`chat/${roomName}`);
      }}
    >
      <input
        value={roomName}
        onChange={e => setRoomName(e.target.value)}
        type="text"
      />
      <Link to={`chat/${roomName}`}>Join</Link>
    </form>
  );
};

export default Home;
