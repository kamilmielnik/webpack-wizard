import { connect } from 'react-redux';
import { initializeApp } from 'app/state';
import App from './components';

const mapDispatchToProps = (dispatch) => ({
  onMount: () => dispatch(initializeApp())
})

export default connect(null, mapDispatchToProps)(App);
