import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initializeApp } from 'app/state';
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

const mapDispatchToProps = (dispatch) => ({
  onMount: () => dispatch(initializeApp())
})

export default connect(null, mapDispatchToProps)(App);
