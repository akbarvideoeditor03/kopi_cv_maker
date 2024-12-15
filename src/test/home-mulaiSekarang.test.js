import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/general/home';
import { BrowserRouter } from 'react-router-dom';

test('Menemukan Tombol Mulai Sekarang', () => {
    render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    );

    const linkElement = screen.getAllByText(/Mulai Sekarang/i);
    expect(linkElement[0]).toBeInTheDocument();
    expect(linkElement[0].closest('a')).toHaveAttribute('href', '/user/login');
});
