import React, { useState, createRef } from 'react';
import styles from './Home.module.css';
import ChatBox from '../components/ChatBox';
import history from '../history';

const Home = () => {
  const [roomName, setRoomName] = useState('');
  const [roomList, setRoomList] = useState<string[]>([]);
  const [username, setUsername] = useState('');
  const userRef = createRef<HTMLInputElement>();

  const roomPanal = username ? (
    <form
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
        className="form-control"
      />
    </form>
  ) : (
    <div />
  );

  const userPanal = username ? (
    <div>Username : {username}</div>
  ) : (
    <form
      style={{ display: username ? 'none' : 'static' }}
      onSubmit={e => {
        e.preventDefault();
        setUsername(userRef.current ? userRef.current.value : '');
      }}
    >
      <input
        type="text"
        ref={userRef}
        placeholder="Enter Username"
        className="form-control"
      />
    </form>
  );
  const navbar = (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        <img
          src="/docs/4.3/assets/brand/bootstrap-solid.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
        Parallel JAAA
      </a>
      {roomPanal}
      {userPanal}
    </nav>
  );
  return (
    <>
      {navbar}
      {username ? (
        <>
          <div className="container pt-5">
            <div className="row">
              {roomList.map((roomName, key) => {
                return (
                  <div className="col-3 ml-2 mr-2" key={roomName}>
                    <button className="btn btn-secondary"
                      onClick={() => {
                        setRoomList(roomList.filter(e => e !== roomName));
                      }}
                    >
                      leave
                    </button>
                    <ChatBox room={roomName} username={username} />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Home;
