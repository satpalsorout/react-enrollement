import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Enrollement from './Components/Enrollement.jsx';
ReactDOM.render(<Enrollement />, document.getElementById('root'));
registerServiceWorker();
