import React, { useState, createRef } from 'react';
import styles from './Home.module.css';
import ChatBox from '../components/ChatBox';
import history from '../history';

const Home = () => {
  const [roomName, setRoomName] = useState('');
  const [roomList, setRoomList] = useState<string[]>([]);
  const [username, setUsername] = useState('');
  const userRef = createRef<HTMLInputElement>();
  const user = (
    <form
      className={styles.container}
      style={{ display: username ? 'none' : 'static' }}
      onSubmit={e => {
        e.preventDefault();
        setUsername(userRef.current ? userRef.current.value : '');
      }}
    >
      <input type="text" ref={userRef} placeholder="Enter Username" />
    </form>
  );
  return (
    <>
      {user}
      {username ? (
        <>
          <form
            className={styles.container}
            onSubmit={e => {
              e.preventDefault();
              // history.push(`/${roomName}`)
              setRoomList([...roomList.filter(e => e !== roomName), roomName]);
              setRoomName('');
            }}
          >
            <input
              value={roomName}
              onChange={e => setRoomName(e.target.value)}
              type="text"
              placeholder="Room Name"
            />
          </form>
          <div className={styles.chatContainer}>
            <span>User : {username}</span>
          </div>
          <div className={styles.chatContainer}>
            {roomList.map((roomName, key) => {
              return (
                <div key={roomName}>
                  <span>{roomName}</span>
                  <ChatBox room={roomName} username={username} />
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </>
  );
};

export default Home;
