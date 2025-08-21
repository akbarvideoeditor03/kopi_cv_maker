import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataId } from '../../redux/action/user.action';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

function UserDetails() {
    const dispatch = useDispatch();
    const param = useParams();
    const token = localStorage.getItem('&l2');
    const role = localStorage.getItem('$f*');
    const idAdm = localStorage.getItem('/v%');
    const { isWebsite, userData, isLoading, error } = useSelector(
        (state) => state.userReducer
    );

    useEffect(() => {
        dispatch(getDataId(idAdm, role, param.id));
    }, [dispatch, idAdm, role, param.id]);

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Hm... Ada yang salah nih!, ${error.message}`,
                confirmButtonText: 'OK',
            });
        }
    }, [error]);

    if (token && isWebsite && idAdm) {
        const tentang = userData.tentang
        const tentangParagraf = tentang?.split('\n').map((tentangs, index) => (
            <p style={{ lineHeight: '1.5rem' }} key={index}>{tentangs} <br /></p>
        ))
        return (
            <main className="container col-f f-center">
                {isLoading ? (
                    <div className="container col-f f-center-c list-container">
                        <div className="custom-loader"></div>
                    </div>
                ) : (
                    <div className="card container col-f fj-center section-max">
                        <h1>Detail Data {userData.nama}</h1>
                        <div className='container col-f'>
                            <div className='container col-f f-1 f-center-c m-b1'>
                                <img className="detail-img full-width" src={`${userData.foto_profil}`} alt="" />
                            </div>
                            <div className='container col-f'>
                                <h4>Nama</h4>
                                <div className='text-bg'>
                                    <p>{userData.nama}</p>
                                </div>
                                <h4>Nomor Telepon</h4>
                                <div className='text-bg'>
                                    <p>{userData.no_telp}</p>
                                </div>
                                <h4>Alamat</h4>
                                <div className='text-bg'>
                                    <p>{userData.alamat}</p>
                                </div>
                                <h4>Tentang</h4>
                                <div className='text-bg'>
                                    {tentangParagraf}
                                </div>
                                <h4>Email</h4>
                                <div className='text-bg'>
                                    <p className='cut-text'>{userData.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        );
    } else {
        window.location.href = `/user/login`;
    }
}

export default UserDetails;
