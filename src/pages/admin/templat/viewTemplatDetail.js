import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { viewAllTemplateId } from '../../../redux/action/user.action';

function viewDetailTemplat() {
    const dispatch = useDispatch();
    const param = useParams();
    const { templatList } = useSelector((state) => state.userReducer);

    useEffect(() => {
        dispatch(viewAllTemplateId(param.id));
    }, [dispatch, param.id]);

    const caption = templatList?.caption;
    const link_page = templatList?.link_page;
    const link_gambar = templatList?.link_gambar;

    return (
        <main className="container col-f f-center">
            <section className="container col-f full-width section-max">
                <a href="/dashboard" className='btn btn-primary-b' style={{ width: 'fit-content' }}>
                    <div className='container' style={{ gap: '0.3rem' }}>
                        <i className="bi-speedometer"></i>
                        <p>Dashboard</p>
                    </div>
                </a>
                <div className='container col-f card-mini'>
                    <p>Detail Templat CV <i className="bi-file-text-fill"></i></p>
                    <div className='container row-f f-wrap full-width'>
                        <div className='container col-f f-1 left-card-menu'>
                            <div className='container col-f'>
                                <p>Caption</p>
                                <div className='text-bg'>
                                    <p>{`${caption}`}</p>
                                </div>
                            </div>
                            <div className='container col-f'>
                                <p>Link Halaman</p>
                                <div className='text-bg'>
                                    <p>{`${link_page}`}</p>
                                </div>
                            </div>
                        </div>
                        <div className='container col-f f-1 left-card-menu'>
                            <img className='detail-templat-img' src={`${link_gambar}`} alt="gambar_templat" />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default viewDetailTemplat;