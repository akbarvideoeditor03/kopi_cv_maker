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
        fontFamily: 'Figtree',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        paddingBottom: '-20px',
        zIndex: -1,
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
    textWhite: {
        color: "white"
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
        width: '110px',
        height: '110px',
        backgroundColor: 'white',
        borderRadius: '50%'
    },
    hLineWhite: {
        paddingBottom: '16px',
        marginBottom: '4px',
        borderBottom: '0.5px',
        borderColor: 'white'
    },
    hLineBlack: {
        paddingBottom: '6px',
        marginBottom: '0px',
        borderBottom: '0.5px',
        borderColor: 'black'
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
            <Page wrap style={[styles.page]}>
                <Image
                    src="https://raw.githubusercontent.com/akbarvideoeditor03/kopi_cv_maker/refs/heads/kopi-branch-1/public/assets/bg/Template%20CV%201.png"
                    style={styles.backgroundImage}
                    fixed
                />
                <View style={[styles.container, styles.rowContainer, { padding: 32 }]}>
                    <View style={[styles.container, styles.colContainer, styles.textWhite, { width: "200px", marginLeft: "-40px", paddingLeft: "40px", paddingRight: "30px" }]}>
                        <View style={[styles.container, styles.colContainer0, styles.fCenter]}>
                            <View style={[styles.cvImg2]}>
                                <Image
                                    style={[styles.cvImg]}
                                    src={userList?.foto_profil}
                                />
                            </View>
                        </View>
                        <View style={[styles.container, styles.colContainer, styles.hLineWhite, { fontSize: "11px", marginTop: "10px" }]}>
                            <Text style={{
                                fontSize: '14px',
                                fontWeight: 'bold'
                            }}>Tentang Saya</Text>
                            <Text
                                style={{
                                    fontSize: '11px',
                                    lineHeight: '16px'
                                }}
                            >
                                {userList?.tentang}
                            </Text>
                        </View>
                        <View style={[styles.container, styles.colContainer, styles.hLineWhite, { fontSize: "11px", marginTop: "10px" }]}>
                            <Text
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                }}
                            >
                                Keahlian
                            </Text>
                            {keahlian.map((item) => {
                                return (
                                    <View
                                        key={item.id}
                                        style={[styles.container, styles.rowContainer,]}
                                    >
                                        <View
                                            style={[
                                                styles.container,
                                                styles.rowContainer,
                                                styles.f1,
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    {
                                                        fontSize: '11px',
                                                        textAlign: 'justify',
                                                    },
                                                    styles.f1,
                                                ]}
                                            >
                                                {item.keahlian}
                                            </Text>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                    <View style={[styles.container, styles.colContainer0, styles.f1, { paddingLeft: "20px" }]}>
                        <View style={[styles.container, styles.rowContainer, styles.hLineBlack]}>
                            <View style={[styles.container, styles.colContainer0, styles.f1]}>
                                <Text style={styles.h1}>{userList?.nama}</Text>
                                <Text style={styles.subheader}>
                                    {pendidikanTerakhir.find((item) => item.jurusan)?.jurusan}
                                </Text>
                            </View>
                            <View style={[styles.container, styles.colContainer, styles.f1]}>
                                <Text
                                    style={{
                                        fontSize: '11px',
                                    }}
                                >
                                    <Image
                                        src={
                                            'https://raw.githubusercontent.com/akbarvideoeditor03/FE/refs/heads/master/public/assets/icon/envelope-solid.png'
                                        }
                                    />{' '}
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                        }}
                                    >
                                        {userList.email}
                                    </Link>{' '}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: '11px',
                                    }}
                                >
                                    <Image
                                        src={
                                            'https://raw.githubusercontent.com/akbarvideoeditor03/FE/refs/heads/master/public/assets/icon/phone-solid.png'
                                        }
                                    />{' '}
                                    {userList.no_telp}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: '11px',
                                    }}
                                >
                                    <Image
                                        src={
                                            'https://raw.githubusercontent.com/akbarvideoeditor03/FE/refs/heads/master/public/assets/icon/location-dot-solid.png'
                                        }
                                    />{' '}
                                    {userList.alamat}
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.container ,styles.colContainer ,styles.hLineBlack, { marginTop: 12 }]}>
                            <Text
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                }}
                            >
                                Pengalaman Kerja
                            </Text>
                            {pengalamanKerja.map((item) => {
                                const prestasiId = item.id;
                                return (
                                    <View
                                        key={item.id}
                                        style={[styles.container, styles.rowContainer]}
                                    >
                                        <View
                                            style={[
                                                {
                                                    paddingBottom: '10px',
                                                },
                                                styles.container,
                                                styles.colContainer,
                                            ]}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: '11px',
                                                    textAlign: 'justify',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {item.lokasi}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: '11px',
                                                    textAlign: 'justify',
                                                }}
                                            >
                                                {dayjs(item.tahun_mulai)
                                                    .locale('id')
                                                    .format('MMMM YYYY')}{' '}
                                                - {item.tahun_selesai}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: '11px',
                                                    textAlign: 'justify',
                                                    lineHeight: '16px'
                                                }}
                                            >
                                                {item.detail}
                                            </Text>
                                            {prestasiKerja.some(
                                                (item) =>
                                                    item.id_pengalaman_kerja ===
                                                    prestasiId
                                            ) && (
                                                    <Text
                                                        style={{
                                                            fontSize: '12px',
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        Prestasi Kerja
                                                    </Text>
                                                )}
                                            {prestasiKerja.map((item) =>
                                                item.id_pengalaman_kerja ===
                                                    prestasiId ? (
                                                    <View key={item.id}
                                                        style={[
                                                            styles.container,
                                                            styles.colContainer
                                                        ]}
                                                    >
                                                        <Text
                                                            style={[
                                                                {
                                                                    fontSize: '11px',
                                                                    textAlign:
                                                                        'justify',
                                                                },
                                                            ]}
                                                        >
                                                            {item.prestasi}
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                fontSize: '11px',
                                                                textAlign: 'justify',
                                                                fontWeight: 'black'
                                                            }}
                                                        >
                                                            Tahun{' '}
                                                            {item.tahun.slice(0, 4)}
                                                        </Text>
                                                    </View>
                                                ) : (
                                                    ''
                                                )
                                            )}
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                        <View style={[styles.hLineBlack, styles.container, styles.colContainer, { marginTop: 12 }]}>
                            <Text
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                }}
                            >
                                Pendidikan Terakhir
                            </Text>
                            {pendidikanTerakhir.map((item) => {
                                return (
                                    <View
                                        key={item.id}
                                        style={[styles.container, styles.rowContainer]}
                                    >
                                        <View
                                            style={[
                                                styles.container,
                                                styles.colContainer,
                                                styles.f1,
                                            ]}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: '12px',
                                                    textAlign: 'justify',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {item.institusi}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: '11px',
                                                    textAlign: 'justify',
                                                }}
                                            >
                                                {dayjs(item.tahun_mulai)
                                                    .locale('id')
                                                    .format('MMMM YYYY')}{' '}
                                                - {item.tahun_selesai}
                                            </Text>
                                        </View>
                                        <View
                                            style={[
                                                styles.container,
                                                styles.colContainer,
                                            ]}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: '11px',
                                                    textAlign: 'justify',
                                                }}
                                            >
                                                Jurusan
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: '11px',
                                                    textAlign: 'justify',
                                                }}
                                            >
                                                {item.jurusan}
                                            </Text>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                        <View style={[styles.container, styles.colContainer, styles.hLineBlack, { marginTop: "12px" }]}>
                            <Text
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                }}
                            >
                                Pelatihan
                            </Text>
                            {pelatihan.map((item) => {
                                return (
                                    <View
                                        key={item.id}
                                        style={[styles.container, styles.colContainer]}
                                    >
                                        <Text
                                            style={[
                                                {
                                                    fontSize: '11px',
                                                    textAlign: 'justify',
                                                },
                                            ]}
                                        >
                                            {item.pelatihan}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: '11px',
                                                textAlign: 'justify',
                                                fontWeight:'bold'
                                            }}
                                        >
                                            {dayjs(item.tahun_mulai)
                                                .locale('id')
                                                .format('MMMM YYYY')}{' '}
                                            - {item.tahun_selesai}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default PDFPreview2;
