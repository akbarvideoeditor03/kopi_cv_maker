import React, {useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import WebHeader from './web-component/header';
import WebFooter from './web-component/footer';

function Layout() {
    const darkMode = localStorage.getItem('dark-mode');
    useEffect(() => {
        const darkPage = document.getElementById('page')
        if(darkMode === 'true') {
            darkPage.classList.add('dark-mode');
        } else {
            darkPage.classList.remove('dark-mode');
        }
    }, [])
    return (
        <section id='page' className='dark-mode'>
            <WebHeader />
                <Outlet />
            <WebFooter />
        </section>
    );
}

export default Layout;
