import React from "react";
import { Link } from "react-router-dom";

function Login() {
    return(
        <main className="container col-f">
            <div className="card">
                <form className="container col-f">
                    <div className="container col-f-0">
                        <label>Email</label>
                        <input type="email" placeholder="Masukkan Email" />
                    </div>
                    <div className="container col-f-0">
                        <label>Password</label>
                        <input type="password" placeholder="Masukkan Password" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </main>
    )
}

export default Login;