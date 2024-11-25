import React from "react";
import { Link } from "react-router-dom";

function Login() {
    return (
        <main className="container col-f f-center-c">
            <section className="card container row-f f-wrap-r full-width section-max">
                <div className="container col-f login-left">
                    <div className="container f-center-c">
                        <img className="login-icon" src="./assets/icon/logo-bw.png" alt="" />
                    </div>
                    <div className="container f-center-c">
                        <form className="container col-f form-max-width">
                            <div className="container col-f-0">
                                <label>Email</label>
                                <input type="email" placeholder="Masukkan Email" />
                            </div>
                            <div className="container col-f-0">
                                <label>Password</label>
                                <input type="password" placeholder="Masukkan Password" />
                            </div>
                            <button style={{ fontSize: '1rem' }} type="submit" class="btn btn-primary">Login</button>
                            <div className="container row-f">
                                <div className="container col-f f-center-c f-1">
                                    <div className="line"></div>
                                </div>
                                <div className="container col-f">
                                    <p>Belum punya Akun?</p>
                                </div>
                                <div className="container col-f f-center-c f-1">
                                    <div className="line"></div>
                                </div>
                            </div>
                            <Link className="t-center btn btn-primary">Daftar</Link>
                        </form>
                    </div>
                </div>
                <div className="container col-f f-center-c login-right">
                    <img className="login-img" src="./assets/images/login-image.svg" alt="login-img" />
                </div>
            </section>
        </main>
    )
}

export default Login;