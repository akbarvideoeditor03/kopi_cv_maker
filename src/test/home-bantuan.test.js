import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/general/home';
import { BrowserRouter } from 'react-router-dom';

test('Menemukan Tombol Bantuan', () => {
    render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    );

    const linkElement = screen.getByText(/Bantuan/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest('a')).toHaveAttribute('href', '/bantuan');
});
