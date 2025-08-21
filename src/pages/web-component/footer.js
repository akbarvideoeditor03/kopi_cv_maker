import { Link as RouterLink } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/id'

function WebFooter() {
    const token = localStorage.getItem('&l2');
    const role = localStorage.getItem('$f*');
    const id = localStorage.getItem('/v%');
    const yearCopyright = dayjs().year();

    return (
        <footer className="container col-f f-1">
            <section className="container row-f f-1 f-wrap">
                <div className="footer-section f-1">
                    <p style={{ color: '#ffc400' }} className="fw6">
                        Dibuat oleh :
                    </p>
                    <div className="container col-f f-1 f-center">
                        <img
                            className="footer-img"
                            src="/assets/icon/logo-footer.png"
                            alt="logo.png"
                        />
                    </div>
                </div>
                <div className="footer-section f-1">
                    <p style={{ color: '#ffc400' }} className="fw6">
                        Features
                    </p>
                    <ul>
                        <li>
                            <a className="social-media" href={`${token && role && id ? '/home' : '/user/login'}`}>
                                Buat CV Sekarang
                            </a>
                        </li>
                        <li>
                            <a className="social-media" href="/user/register">
                                Daftar
                            </a>
                        </li>
                        <li>
                            <a className="social-media" href="/bantuan">
                                Bantuan
                            </a>
                        </li>
                        <li>
                            <a className="social-media" href="/tentang">
                                Tentang Kami
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="footer-section f-1">
                    <p style={{ color: '#ffc400' }} className="fw6">
                        Social Media
                    </p>
                    <div className="container col-f">
                        <RouterLink
                            className="social-media"
                            target="blank"
                            to="https://github.com/akbarvideoeditor03"
                            title="GitHub : akbarvideoeditor03"
                        >
                            <img
                                className="icon-img"
                                src="https://raw.githubusercontent.com/akbarvideoeditor03/FE/eaba35dcd8c2efeebc51e504ebbec9a9952f2c7f/public/assets/social-media/github.svg"
                                alt=""
                            />{' '}
                            akbarvideoeditor03
                        </RouterLink>
                        <RouterLink
                            className="social-media"
                            target="blank"
                            to="https://www.instagram.com/ahmadakbar03/"
                            title="Instagram : ahmadakbar03"
                        >
                            <img
                                className="icon-img"
                                src="https://raw.githubusercontent.com/akbarvideoeditor03/FE/eaba35dcd8c2efeebc51e504ebbec9a9952f2c7f/public/assets/social-media/instagram.svg"
                                alt=""
                            />{' '}
                            ahmadakbar03
                        </RouterLink>
                        <RouterLink
                            className="social-media"
                            target="blank"
                            to="https://www.youtube.com/@ahmadakbar03"
                            title="YouTube : Media Cara"
                        >
                            <img
                                className="icon-img"
                                src="https://raw.githubusercontent.com/akbarvideoeditor03/FE/eaba35dcd8c2efeebc51e504ebbec9a9952f2c7f/public/assets/social-media/youtube.svg"
                                alt=""
                            />{' '}
                            Media Cara
                        </RouterLink>
                        <RouterLink
                            className="social-media"
                            target="blank"
                            to="https://www.linkedin.com/in/ahmad-akbar-0a533b275/"
                            title="YouTube : Media Cara"
                        >
                            <img
                                className="icon-img"
                                src="https://raw.githubusercontent.com/akbarvideoeditor03/FE/eaba35dcd8c2efeebc51e504ebbec9a9952f2c7f/public/assets/social-media/linkedin.svg"
                                alt=""
                            />{' '}
                            Ahmad Akbar
                        </RouterLink>
                    </div>
                </div>
                <div className="footer-section f-1">
                    <p style={{ color: '#ffc400' }} className="fw6">
                        Kontak & Alamat Kami
                    </p>
                    <div className="container col-f">
                        <RouterLink
                            className="social-media"
                            target={`${token ? 'blank' : ''}`}
                            to={`${token ? 'https://mail.google.com/mail/?view=cm&fs=1&to=akbarstudiowebsite03@gmail.com&su=Laporan_Bug&body=Halo_Admin' : '/user/login'}`}
                        >
                            <i className="bi bi-envelope-fill fwb"></i>
                            Email
                        </RouterLink>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230.43980423242738!2d103.62808566745915!3d-1.6160288000000032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e25899aa1b147fd%3A0x692fe2caade5aa68!2sAkbar%20Studio!5e1!3m2!1sid!2sid!4v1751615094346!5m2!1sid!2sid" style={{border:'none', borderRadius:'0.5rem', minHeight:'15rem'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </section>
            <section
                style={{ backgroundColor: '#151515FF' }}
                className="container col-f f-1 f-center"
            >
                <p
                    style={{
                        fontWeight: 'bold',
                        marginBottom: '-10px',
                    }}
                >
                    Made with {''}
                    <i style={{ color: 'red' }} className="bi-heart-fill"></i>{' '}
                    by Ahmad Akbar
                </p>
                <p>All Right Reserved © {`${yearCopyright}`}</p>
            </section>
        </footer>
    );
}

export default WebFooter;