import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages/general/home';
import Login from '../pages/general/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux';

test('Masuk ke halaman login dan mengisi email password', () => {
    render(
        <Provider store={store()}>
            <BrowserRouter>
                <Routes>
                    <Route>
                        <Route path="/" element={<Home />} />
                        <Route path="/user/login" element={<Login />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    );

    const linkElement = screen.getAllByText(/Mulai Sekarang/i);
    expect(linkElement[0]).toBeInTheDocument();
    expect(linkElement[0].closest('a')).toHaveAttribute('href', '/user/login');

    fireEvent.click(linkElement[0]);
    const emailInput = screen.getByPlaceholderText(/Masukkan Email/i);
    const passwordInput = screen.getByPlaceholderText(/Masukkan Password/i);
    const masukButton = screen.getAllByText(/Masuk/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(masukButton[0]).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(masukButton[0]);
});
