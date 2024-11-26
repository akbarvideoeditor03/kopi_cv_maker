import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

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
                            <ScrollLink to="" offset={''} spy={true} smooth={true} duration={500}>Beranda</ScrollLink>
                        </li>
                        <li>
                            <ScrollLink to="" offset={''} spy={true} smooth={true} duration={500}>Beranda</ScrollLink>
                        </li>
                        <li>
                            <ScrollLink to="" offset={''} spy={true} smooth={true} duration={500}>Beranda</ScrollLink>
                        </li>
                        <li>
                            <ScrollLink to="" offset={''} spy={true} smooth={true} duration={500}>Beranda</ScrollLink>
                        </li>
                        <li>
                            <ScrollLink to="" offset={''} spy={true} smooth={true} duration={500}>Beranda</ScrollLink>
                        </li>
                    </ul>
                </div>
                <div className="footer-section f-1">
                    <p style={{color : '#ffc400'}} className="fw6">Social Media</p>
                    <div className="container col-f">
                        <RouterLink className="social-media" target="blank" to='https://github.com/akbarvideoeditor03' title="GitHub : akbarvideoeditor03">
                            <img className="icon-img" src="./assets/social-media/github.svg" alt="" /> akbarvideoeditor03
                        </RouterLink>
                        <RouterLink className="social-media" target="blank" to='https://www.instagram.com/ahmadakbar03/' title="Instagram : ahmadakbar03">
                            <img className="icon-img" src="./assets/social-media/instagram.svg" alt="" /> ahmadakbar03
                        </RouterLink>
                        <RouterLink className="social-media" target="blank" to='https://www.youtube.com/@ahmadakbar03' title="YouTube : Media Cara">
                            <img className="icon-img" src="./assets/social-media/youtube.svg" alt="" /> Media Cara
                        </RouterLink>
                        <RouterLink className="social-media" target="blank" to='https://www.linkedin.com/in/ahmad-akbar-0a533b275/' title="YouTube : Media Cara">
                            <img className="icon-img" src="./assets/social-media/linkedin.svg" alt="" /> Ahmad Akbar
                        </RouterLink>
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