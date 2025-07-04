import React, {useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import WebHeader from './web-component/header';
import WebFooter from './web-component/footer';
import AdHeader from './web-component/ads';

function Layout() {
    const darkMode = localStorage.getItem('dark-mode');
    useEffect(() => {
        const darkPage = document.getElementById('page')
        if(darkMode === 'true') {
            darkPage.classList.add('dark-mode');
        } else {
            darkPage.classList.remove('dark-mode');
        }
    }, []);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2846989538167510';
        script.async = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
    }, []);

    return (
        <section id='page' className='dark-mode'>
            <WebHeader />
                <AdHeader />
                <Outlet />
            <WebFooter />
        </section>
    );
}

export default Layout;
