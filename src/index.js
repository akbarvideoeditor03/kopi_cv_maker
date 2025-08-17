import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/general/App';
import reportWebVitals from './help/reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux';
import './styles/index.css';
import './styles/global.css';
import './styles/responsive.css';
import './styles/button.css';
import './styles/image-class-collections.css';
import './styles/dark-mode.css';
import './styles/switch.css';

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

let prevId = null;
let prevRole = null;
let prevToken = null;
let monitoringStarted = false;

const monitorLocalStorage = () => {
    const currId = localStorage.getItem('/v%');
    const currRole = localStorage.getItem('$f*');
    const currToken = localStorage.getItem('&l2');

    if (!monitoringStarted && currId && currRole && currToken) {
        prevId = currId;
        prevRole = currRole;
        prevToken = currToken;
        monitoringStarted = true;
        return;
    }

    if (monitoringStarted) {
        if (currId !== prevId || currRole !== prevRole || currToken !== prevToken) {
            console.warn('❌ Deteksi manipulasi id, role, atau token. Melakukan logout...');
            localStorage.removeItem('/v%');
            localStorage.removeItem('$f*');
            localStorage.removeItem('&l2');
            window.location.href = '/';
        }
    }
};

setInterval(monitorLocalStorage, 1000);

const token = localStorage.getItem('&l2');
if (token) {
    let logoutTimer;

    const startLogoutTimer = () => {
        clearTimeout(logoutTimer);
        logoutTimer = setTimeout(() => {
            localStorage.removeItem('/v%');
            localStorage.removeItem('$f*');
            localStorage.removeItem('&l2');
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
                localStorage.removeItem('/v%');
                localStorage.removeItem('$f*');
                localStorage.removeItem('&l2');
                window.location.href = '/';
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

reportWebVitals();