import React from 'react';
import { Outlet } from 'react-router-dom';
import WebHeader from './web-component/header';
import WebFooter from './web-component/footer';

function Layout() {
    return (
        <section>
            <WebHeader />
            <Outlet />
            <WebFooter />
        </section>
    );
}

export default Layout;
