import './global.css';

import styles from './App.module.css';

import Header from './components/Header'
import List from './components/List';

function App() {
  return ( 
    <div>
      <Header />
      <div className={styles.wrapper}>
        <List />
      </div>
    </div>
  )
}

export default App;