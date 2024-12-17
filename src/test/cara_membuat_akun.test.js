import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/general/home';
import Help from '../pages/general/help';

test('Menemukan Bantuan Cara membuat akun KOPI', () => {
    render(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bantuan" element={<Help />} />
            </Routes>
        </BrowserRouter>
    );

    const linkElement = screen.getByText(/Bantuan/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest('a')).toHaveAttribute('href', '/bantuan');
    fireEvent.click(linkElement);
    const bantuanTitle = screen.getByText(/Cara membuat akun KOPI/i);
    expect(bantuanTitle).toBeInTheDocument();
});
