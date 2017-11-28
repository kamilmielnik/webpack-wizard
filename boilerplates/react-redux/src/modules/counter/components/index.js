import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { decrement, increment } from 'counter/state';
import { selectValue } from 'counter/selectors';
import Button from 'components/button';
import styles from './styles.scss';

const Counter = ({ value, onDecreaseClick, onIncreaseClick }) => (
  <div className={styles.counter}>
    <Button onClick={onDecreaseClick}>
      -- decrement
    </Button>

    <div className={styles.value}>
      {value}
    </div>

    <Button onClick={onIncreaseClick}>
      ++ increment
    </Button>
  </div>
);

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onDecreaseClick: PropTypes.func.isRequired,
  onIncreaseClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  value: selectValue(state)
});

const mapDispatchToProps = (dispatch) => ({
  onDecreaseClick: () => dispatch(decrement()),
  onIncreaseClick: () => dispatch(increment())
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
