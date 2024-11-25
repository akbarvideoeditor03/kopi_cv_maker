import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/general/App';
import reportWebVitals from './help/reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/index.css';
import './styles/global.css';
import './styles/responsive.css';
import './styles/button.css';
import './styles/image-class-collections.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
