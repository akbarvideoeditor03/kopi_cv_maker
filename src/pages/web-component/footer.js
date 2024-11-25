import React from "react";
import { Link } from "react-scroll";
import { Link as A } from "react-router-dom";

function WebFooter() {
    return(
        <footer className="container col-f f-1">
            <section className="container row-f f-1 f-wrap">
                <div className="footer-section f-1">
                    <p style={{color : '#ffc400'}} className="fw6">Dibuat oleh :</p>
                    <div className="container col-f f-1 f-center">
                        <img className="footer-img" src="./assets/icon/logo.png" alt="logo.png" />
                    </div>
                </div>
                <div className="footer-section f-1">
                    <p style={{color : '#ffc400'}} className="fw6">Features</p>
                    <ul>
                        <li>
                            <Link to="" offset={''} spy={true} smooth={true} duration={500}>Beranda</Link>
                        </li>
                        <li>
                            <Link to="" offset={''} spy={true} smooth={true} duration={500}>Beranda</Link>
                        </li>
                        <li>
                            <Link to="" offset={''} spy={true} smooth={true} duration={500}>Beranda</Link>
                        </li>
                        <li>
                            <Link to="" offset={''} spy={true} smooth={true} duration={500}>Beranda</Link>
                        </li>
                        <li>
                            <Link to="" offset={''} spy={true} smooth={true} duration={500}>Beranda</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-section f-1">
                    <p style={{color : '#ffc400'}} className="fw6">Social Media</p>
                    <div className="container col-f">
                        <A className="social-media" target="blank" to='https://github.com/akbarvideoeditor03' title="GitHub : akbarvideoeditor03">
                            <img className="icon-img" src="./assets/social-media/github.svg" alt="" /> akbarvideoeditor03
                        </A>
                        <A className="social-media" target="blank" to='https://www.instagram.com/ahmadakbar03/' title="Instagram : ahmadakbar03">
                            <img className="icon-img" src="./assets/social-media/instagram.svg" alt="" /> ahmadakbar03
                        </A>
                        <A className="social-media" target="blank" to='https://www.youtube.com/@ahmadakbar03' title="YouTube : Media Cara">
                            <img className="icon-img" src="./assets/social-media/youtube.svg" alt="" /> Media Cara
                        </A>
                        <A className="social-media" target="blank" to='https://www.linkedin.com/in/ahmad-akbar-0a533b275/' title="YouTube : Media Cara">
                            <img className="icon-img" src="./assets/social-media/linkedin.svg" alt="" /> Ahmad Akbar
                        </A>
                    </div>
                </div>
            </section>
            <section style={{ backgroundColor : '#151515FF'}} className="container col-f f-1 f-center">
                <p style={{fontWeight : 'bold', marginBottom : '-10px'}}>Made with <i style={{color : 'red'}} className="bi-heart-fill"></i> by Ahmad Akbar</p>
                <p>All Right Reserved © 2024</p>
            </section>
        </footer>
    )
}

export default WebFooter;