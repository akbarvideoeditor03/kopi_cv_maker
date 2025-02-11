import React from "react";

function pdfPreview() {
    return (
        <main className="container col-f f-center">
            <div className="card container col-f fj-center section-max" style={{ width: '100%' }}>
                <p>Silakan pilih templat yang ingin kamu pakai 🤗</p>
                <div className="grid gc-1 gc-2 gc-3 gc-4 grid-gap grid-text">
                    <a className="btn btn-info-b" href="/defaultcv">
                        <i className="bi-file-earmark-pdf-fill"></i>{' '}
                        Default CV
                    </a>
                    <a className="btn btn-info-b" href="/cvkreatif">
                        <i className="bi-file-earmark-pdf-fill"></i>{' '}
                        CV Kreatif
                    </a>
                    <a className="btn btn-info-b" href="/cvatsfirendly">
                        <i className="bi-file-earmark-pdf-fill"></i>{' '}
                        CV ATS
                    </a>
                </div>
            </div>
        </main>
    )
}

export default pdfPreview;