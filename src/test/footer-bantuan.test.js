import React from 'react';
import { render, screen } from '@testing-library/react';
import WebFooter from '../pages/web-component/footer';
import { BrowserRouter } from 'react-router-dom';

test('Menemukan tombol Bantuan', () => {
    render(
        <BrowserRouter>
            <WebFooter />
        </BrowserRouter>
    );

    const linkElement = screen.getByText(/Bantuan/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest('a')).toHaveAttribute('href', '/bantuan');
});
