import React, { useState, createRef } from 'react';
import styles from './Home.module.css';
import ChatBox from '../components/ChatBox';
import history from '../history';

const Home = () => {
  const [roomName, setRoomName] = useState('');
  const [roomList, setRoomList] = useState<string[]>([]);
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const userRef = createRef<HTMLInputElement>();
  const btnStyle = {
      width: '151px',
   
    
  };
  const btnLeave = {
      width:'79px'
     
  }

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
    <nav className="navbar navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        <img
          src="/docs/4.3/assets/brand/bootstrap-solid.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
        Parallel ChitChat
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
          <div className="">
            <div className="row">
            <div className="col-2 pr-0">
              {roomList.map((roomName, key) => {
                return (
                  <div className="d-flex flex-column" key={roomName}>
                  <div>
                   <button className = "btn btn-success"  style = {btnStyle} onClick = { e =>setRoom(roomName)}>
                   {roomName}
                    
                    </button>
                    <button className="btn btn-danger" style={btnLeave}
                      onClick={() => {
                        setRoomList(roomList.filter(e => e !== roomName));
                      }}
                    >
                      leave
                    </button>
                    </div>
                  </div>
                );
              })}
              </div>
              <div className="col-10 pl-0">
                  <ChatBox room = {room} username={username}/>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Home;
