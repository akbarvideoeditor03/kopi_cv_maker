import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { viewAllTemplate } from '../../redux/action/user.action';

function pdfPreview() {
    const dispatch = useDispatch();
    const { templatList } = useSelector((state) => state.userReducer);

    useEffect(() => {
        dispatch(viewAllTemplate());
    }, [dispatch])

    return (
        <main className="container col-f-0 f-center">
            <div className="container col-f full-width section-max">
                <a href="/home" className='btn btn-primary-b' style={{ width: 'fit-content' }}>
                    <div className='container' style={{ gap: '0.3rem' }}>
                        <i className="bi-arrow-left-circle"></i>
                        <p>Home</p>
                    </div>
                </a>
            </div>
            <div className="card container col-f-0 section-max" style={{ width: '100%', minHeight: '100vh', gap: '2rem' }}>
                <p>Silakan pilih templat yang ingin kamu pakai 🤗</p>
                <div className="grid gc-1 gc-2 gc-3 gc-4 grid-gap grid-text">
                    {templatList?.data?.map((item) => {
                        return (
                            <div key={item.id} className="container col-f f-center">
                                <img src={item.link_gambar} className="preview-cv-image" alt="gambar_templatcv" />
                                <a className="btn btn-info-b" href={item.link_page}>
                                    <i className="bi-file-earmark-pdf-fill"></i>{' '}{item.caption}
                                </a>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}

export default pdfPreview;