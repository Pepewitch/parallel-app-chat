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
      height:'20px',
  
      border: 'solid 1px black',
      margin:'0px'
    
  };
  const btnLeave = {
      height:'20px',
      border: 'solid 1px black',
      margin:'0px'
     
  }
  const white = {
    color:'white'
  }

  const roomPanal = username ? (
    <form
      onSubmit={e => {
        e.preventDefault();
        // history.push(`/${roomName}`)
        setRoomList([...roomList.filter(e => e !== roomName), roomName]);
        setRoomName('');
        setRoom(roomName);
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
    <div style={white}>Username : {username}</div>
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
                  <div className="d-flex flex-row">
                   <div className={styles.block1} onClick = { e =>setRoom(roomName)}>
                   {roomName}
                    
                    </div>
                    <div className= {styles.block2}
                      onClick={() => {
                        setRoomList(roomList.filter(e => e !== roomName));
                      }}
                    >
                      leave
                    </div>
                    </div>
                  </div>
                );
              })}
              </div>
              {roomList.length > 0 ? <div key={room} className="col-10 pl-0">
                  <ChatBox room = {room} username={username}/>
              </div>: null}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Home;
