import React from 'react';
import { Outlet } from 'react-router-dom';
import WebHeader from './web-component/header';
import WebFooter from './web-component/footer';

function Layout() {
    return (
        <section>
            <h1>Maaf website sedang dalam perbaikan <i class="bi-gear"></i></h1>
            {/* <WebHeader />
            <Outlet />
            <WebFooter /> */}
        </section>
    );
}

export default Layout;
