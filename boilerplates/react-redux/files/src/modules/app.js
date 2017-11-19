import React from 'react';
import Button from 'components/button';
import styles from './styles.scss';

const onClick = console.log('onClick');

const App = () => (
  <div className={styles.app}>
    <Button onClick={onClick}>
      Click me!
    </Button>
  </div>
);

export default App;
