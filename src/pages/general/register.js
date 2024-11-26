import React from "react";
import { Link as RouterLink } from "react-router-dom";

function Register() {
    return (
        <main className="container col-f f-center-c">
            <section className="card container row-f f-wrap-r full-width section-max">
                <div className="container col-f login-left f-1 f-between">
                    <div className="container col-f">
                        <h1>Daftar</h1>
                        <div className="container f-center-c">
                            <img className="login-icon" src="./assets/icon/logo-bw.png" alt="" />
                        </div>
                        <div className="container col-f f-center-c">
                            <form className="container col-f form-max-width">
                                <div className="container col-f-0">
                                    <label>Nama</label>
                                    <input type="text" placeholder="Masukkan Nama Anda" />
                                </div>
                                <div className="container col-f-0">
                                    <label>Nomor Telepon</label>
                                    <input type="text" placeholder="Masukkan Nomor Telepon Anda" />
                                </div>
                                <div className="container col-f-0">
                                    <label>Email</label>
                                    <input type="email" placeholder="Masukkan Email Anda" />
                                </div>
                                <div className="container col-f-0">
                                    <label>Password</label>
                                    <input type="password" placeholder="Masukkan Password (min 8 karakter)" />
                                </div>
                                <button style={{ fontSize: '1rem' }} type="submit" className="btn btn-primary">Daftar</button>
                            </form>
                            <div className="container col-f form-max-width">
                                <div className="container row-f">
                                    <div className="container col-f f-center-c f-1">
                                        <div className="line"></div>
                                    </div>
                                    <div className="container col-f">
                                        <p>Sudah punya Akun?</p>
                                    </div>
                                    <div className="container col-f f-center-c f-1">
                                        <div className="line"></div>
                                    </div>
                                </div>
                                <RouterLink to="/login" className="t-center btn btn-primary">Login</RouterLink>
                            </div>
                        </div>
                    </div>
                    <div className="container col-f f-center-c t-center">
                        <p>Ada kendala? Yuk beri tahu kami</p>
                        <RouterLink style={{ maxWidth: '15rem' }} to="https://wa.link/s4zfm0" target="_blank" className="fwb btn btn-info full-width"><i className="bi-whatsapp"></i> Admin</RouterLink>
                    </div>
                </div>
                <div className="container col-f f-center-c login-right">
                    <img className="login-img" src="./assets/images/login-image.svg" alt="login-img" />
                </div>
            </section>
        </main>
    )
}

export default Register;