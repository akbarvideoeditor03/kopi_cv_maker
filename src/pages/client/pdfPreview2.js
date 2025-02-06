import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Document,
    Page,
    PDFViewer,
    View,
    Text,
    StyleSheet,
    Font,
    Image,
    Link,
} from '@react-pdf/renderer';
import {
    getUserId,
    readPengalamanKerja,
    readPendidikanTerakhir,
    readKeahlian,
    readPelatihan,
    readPrestasi,
} from '../../redux/action/user.action';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import CustomFontRegular from '../font/Figtree-Regular.ttf';
import CustomFontBold from '../font/Figtree-Bold.ttf';
dayjs.locale('id');
const id = localStorage.getItem('id');
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

Font.register({
    family: 'Figtree',
    fonts: [
        {
            src: CustomFontRegular,
        },
        {
            src: CustomFontBold,
            fontWeight: 'bold',
        },
    ],
});

const styles = StyleSheet.create({
    page: {
        padding: '32px',
        fontFamily: 'Figtree',
    },
    h1: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    subheader: {
        fontSize: 14,
        marginBottom: 8,
    },
    container: {
        display: 'flex',
    },
    colContainer: {
        flexDirection: 'column',
        gap: '8px',
    },
    colContainer0: {
        flexDirection: 'column',
    },
    rowContainer: {
        flexDirection: 'row',
        gap: '8px',
    },
    rowContainer0: {
        flexDirection: 'row',
    },
    fCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    fjCenter: {
        justifyContent: 'center',
    },
    fWrap: {
        flexWrap: 'wrap',
    },
    f1: {
        flex: '1',
    },
    textWhite : {
        color:"white"
    },
    cvImg: {
        width: '105px',
        height: '105px',
        objectFit: 'cover',
        borderRadius: "50%",
    },
    cvImg2: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width:'110px',
        height:'110px',
        backgroundColor:'white',
        borderRadius:'50%'
    },
});

function PDFPreview2() {
    const dispatch = useDispatch();
    const {
        userList,
        pengalamanKerja,
        pendidikanTerakhir,
        keahlian,
        pelatihan,
        prestasiKerja,
        isLoading,
    } = useSelector((state) => state.userReducer);

    useEffect(() => {
        dispatch(getUserId(id));
        dispatch(readPengalamanKerja(id));
        dispatch(readPendidikanTerakhir(id));
        dispatch(readKeahlian(id));
        dispatch(readPelatihan(id));
        dispatch(readPrestasi());
    }, [dispatch, id]);

    if (!token && !role) {
        window.location.href = '/user/login'
    } else {
        return (
            <main className="container col-f f-center-c">
                <section className="container col-f f-1 f-align-t full-width section-max">
                    <div className='container col-f full-width'>
                        <h1 className="t-center">
                            Yeay! Ini adalah preview dari CV yang kamu buat 😊
                        </h1>
                        <div className='card-mini container col-f'>
                            <p><i className="bi-exclamation-triangle-fill"></i> Mohon maaf, untuk sementara fitur PDF Preview belum dapat digunakan bagi seluruh pengguna mobile.</p>
                            <p>Fitur ini dapat digunakan secara normal di browser <strong>Mozila Firefox <i className="bi-browser-firefox"></i></strong></p>
                        </div>
                    </div>
                    {isLoading ? (
                        <div className="container col-f f-center-c list-container">
                            <div className="custom-loader"></div>
                        </div>
                    ) : (
                        <PDFViewer
                            className="section-max"
                            width={200}
                            height={200}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: '0px',
                                borderRadius: '25px',
                                height: '100vh',
                                maxHeight: '1920px',
                                width: '100vw',
                            }}
                        >
                            <MyPdf2
                                userList={userList}
                                pengalamanKerja={pengalamanKerja}
                                pendidikanTerakhir={pendidikanTerakhir}
                                keahlian={keahlian}
                                pelatihan={pelatihan}
                                prestasiKerja={prestasiKerja}
                            />
                        </PDFViewer>
                    )}
                </section>
            </main>
        );
    }
}

// function PDFPreview2() {
//     return (
//         <main className="container col-f f-center-c">
//             <section className="container col-f f-1 f-between section-max full-width">
//                 <div className='container col-f'>
//                     <div className='container row-f'>
//                         <div className='container col-f' style={{ maxWidth: "200px" }}>
//                             <p>Nama Pekerjaan</p>
//                             <p>Tahun Dapat - Tahun Selesai</p>
//                         </div>
//                         <div className='container col-f f-1'>
//                             <div className='container row-f'>
//                                 <div className='vline'></div>
//                                 <div className='container col-f'>
//                                     <div className='container col-f' style={{marginBlockEnd:"1rem"}}>
//                                         <ul className='timeline-bullets'>
//                                             <li className='bullets-item'>
//                                                 <div>
//                                                     <p>Nama Pekerjaan</p>
//                                                     <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
//                                                 </div>
//                                             </li>
//                                             <li className='bullets-item'>
//                                                 <div>
//                                                     <p>Nama Pekerjaan</p>
//                                                     <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
//                                                 </div>
//                                             </li>
//                                             <li className='bullets-item'>
//                                                 <div>
//                                                     <p>Nama Pekerjaan</p>
//                                                     <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
//                                                 </div>
//                                             </li>
//                                             <li className='bullets-item'>
//                                                 <div>
//                                                     <p>Nama Pekerjaan</p>
//                                                     <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
//                                                 </div>
//                                             </li>
//                                         </ul>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </main>
//     );
// }

const MyPdf2 = ({
    userList,
    pengalamanKerja,
    pendidikanTerakhir,
    keahlian,
    pelatihan,
    prestasiKerja,
}) => {
    return (
        <Document>
            <Page style={[styles.page, styles.container, styles.rowContainer]}>
                <View style={[styles.container, styles.colContainer0, {width:'200px', backgroundColor:'grey'}]}>
                    <Text>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the
                        1500s, when an unknown printer took a galley of type and scrambled it to
                        make a type specimen book. It has survived not only five centuries, but
                        also the leap into electronic typesetting, remaining essentially
                        unchanged. It was popularised in the 1960s with the release of Letraset
                        sheets containing Lorem Ipsum passages, and more recently with desktop
                        publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the
                        1500s, when an unknown printer took a galley of type and scrambled it to
                        make a type specimen book. It has survived not only five centuries, but
                        also the leap into electronic typesetting, remaining essentially
                        unchanged. It was popularised in the 1960s with the release of Letraset
                        sheets containing Lorem Ipsum passages, and more recently with desktop
                        publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Text>
                </View>
                <View style={[styles.container, styles.colContainer0, styles.f1]}>
                    <Text>

                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export default PDFPreview2;
