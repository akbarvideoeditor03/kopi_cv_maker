function NotifDownload() {
    return (
        <div className='card-mini container col-f'>
            <div className="container col-f-0">
                <p><i className="bi-exclamation-triangle-fill"></i> Mohon maaf, untuk sementara fitur PDF Preview belum dapat digunakan bagi seluruh pengguna mobile. Fitur ini dapat digunakan secara normal di browser <strong>Mozila Firefox <i className="bi-browser-firefox"></i></strong></p>
            </div>
            <div className="container col-f">
                <p>Bingung cara downloadnya? <a className="btn-reset-pw" target="blank" href="/bantuan">Klik disini</a></p>
            </div>
        </div>
    );
}

export default NotifDownload;