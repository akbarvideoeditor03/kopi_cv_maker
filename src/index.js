import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/general/App';
import reportWebVitals from './help/reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux';
import Swal from 'sweetalert2';
import './styles/index.css';
import './styles/global.css';
import './styles/responsive.css';
import './styles/button.css';
import './styles/image-class-collections.css';
import './styles/main-cv-styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store()}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

const token = localStorage.getItem('token');
const role = localStorage.getItem('role');
if (token && role) {
  let logoutTimer;
  const startLogoutTimer = () => {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
      localStorage.clear();
      window.location.href = '/';
    }, 3600000);
  };

  const resetTimer = () => {
    startLogoutTimer();
    localStorage.setItem('lastActivity', Date.now());
  };

  const checkSession = () => {
    const lastActivity = localStorage.getItem('lastActivity');
    if (lastActivity) {
      const currentTime = Date.now();
      const elapsed = currentTime - lastActivity;
      if (elapsed > 3600000) {
        localStorage.clear();
        Swal.fire({
          icon: "error",
          title: "Oo Ow...",
          text: "Sesi Anda telah habis",
          showConfirmButton: true,
          allowEscapeKey: false,
          allowOutsideClick: false,
        }).then(() => {
          window.location.href = '/';
        });
      } else {
        startLogoutTimer();
      }
    } else {
      startLogoutTimer();
    }
  };

  document.addEventListener('mousemove', resetTimer);
  document.addEventListener('keypress', resetTimer);
  document.addEventListener('scroll', resetTimer);
  document.addEventListener('click', resetTimer);

  checkSession();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
