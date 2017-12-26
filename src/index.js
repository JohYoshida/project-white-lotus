import React from 'react';
import ReactDOM from 'react-dom';
import './styles/css/main.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {CookiesProvider} from 'react-cookie';

ReactDOM.render(<CookiesProvider><App /></CookiesProvider>, document.getElementById('root'));
registerServiceWorker();
