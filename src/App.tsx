import React, { Component } from 'react';
import styles from './App.module.css';
import ChatBox from './components/ChatBox';

class App extends Component {
  render() {
    return (
      <div className={styles.container}>
        <ChatBox />
      </div>
    );
  }
}

export default App;
