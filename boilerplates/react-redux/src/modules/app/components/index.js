import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Counter from 'counter/components';
import styles from './styles.scss';

class App extends Component {
  static propTypes = {
    onMount: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.onMount();
  }

  render() {
    return (
      <div className={styles.app}>
        <Counter />
      </div>
    );
  }
}

export default App;
