import { useEffect } from 'react';
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
    Circle,
    Svg
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
import NotifDownload from '../web-component/notifDownload';
dayjs.locale('id');
const id = localStorage.getItem('/v%');
const token = localStorage.getItem('&l2');
const role = localStorage.getItem('$f*');

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

Font.registerHyphenationCallback(word => [word]);

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
    cvImg: {
        minWidth: '100px',
        maxWidth: '120px',
        maxHeight: '150px',
        objectFit: 'cover',
        borderRadius: '10px',
    },
});

function PDFPreview() {
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
        if (token && role && id) {
            dispatch(getUserId(id, role));
            dispatch(readPendidikanTerakhir(id, role));
            dispatch(readPengalamanKerja(id, role));
            dispatch(readKeahlian(id, role));
            dispatch(readPelatihan(id, role));
            dispatch(readPrestasi(id, role));
        }
    }, [dispatch, id, role]);
    if (!token && !role && !id) {
        window.location.href = '/user/login'
    } else {
        return (
            <main className="container col-f f-center-c">
                <section className="container col-f f-1 f-align-t full-width section-max">
                    <div className='container col-f full-width'>
                        <h1 className="t-center">
                            Yeay! Ini adalah preview dari CV yang kamu buat 😊
                        </h1>
                        <a href="/pdfpreview" className='btn btn-primary-b' style={{ width: 'fit-content' }}>
                            <div className='container' style={{ gap: '0.3rem' }}>
                                <i className="bi-arrow-left-circle"></i>
                                <p>Template CV</p>
                            </div>
                        </a>
                        <NotifDownload />
                    </div>
                    {isLoading ? (
                        <div className="container col-f f-center-c list-container">
                            <div className="custom-loader"></div>
                        </div>
                    ) : (
                        <PDFViewer className="section-max" width={200} height={200} style={{
                            display: 'flex', justifyContent: 'center'
                            , alignItems: 'center', borderWidth: '0px', borderRadius: '25px', height: '100vh', maxHeight: '1920px',
                            width: '100vw',
                        }}>
                            <MyPdf userList={userList} pengalamanKerja={pengalamanKerja} pendidikanTerakhir={pendidikanTerakhir}
                                keahlian={keahlian} pelatihan={pelatihan} prestasiKerja={prestasiKerja} />
                        </PDFViewer>
                    )}
                </section>
            </main>
        );
    }
}

const MyPdf = ({
    userList,
    pengalamanKerja,
    pendidikanTerakhir,
    keahlian,
    pelatihan,
}) => {
    const userID = userList?.id;
    return (
        <Document>
            <Page style={[styles.page, styles.container, styles.colContainer]}>
                <View style={[styles.container, styles.rowContainer, {
                    paddingBottom: '16px', marginBottom: '4px',
                    borderBottom: '0.5px',
                },]}>
                    <View style={[styles.container, styles.colContainer0, styles.f1,]}>
                        <View style={[styles.container, styles.colContainer0]}>
                            <Text style={styles.h1}>{userList?.nama}</Text>
                            <Text style={styles.subheader}>
                                {pendidikanTerakhir.find((item) => item.jurusan)?.jurusan}
                            </Text>
                        </View>
                        <View style={[{ marginBottom: '16px', marginTop: '8px', }, styles.container, styles.rowContainer,
                        styles.fWrap,]}>
                            <Text style={{ fontSize: '11px', }}>
                                <Image src={'/assets/icon/envelope-solid.png'} />{' '}
                                <Link style={{ textDecoration: 'none', }}
                                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${userList.email}&su=Judul_pesan&body=Isi_pesan`}>
                                    {userList.email}
                                </Link>{' '}
                            </Text>
                            <Text style={{ fontSize: '11px', }}>
                                <Image src={'/assets/icon/phone-solid.png'} />{' '}
                                {userList.no_telp}
                            </Text>
                            <Text style={{ fontSize: '11px', }}>
                                <Image src={'/assets/icon/location-dot-solid.png'} />{' '}
                                {userList.alamat}
                            </Text>
                        </View>
                        <View style={[styles.container, styles.colContainer, { paddingRight: '16px', },]}>
                            <Text style={{ fontSize: '15px', fontWeight: 'bold', }}>
                                Tentang Saya
                            </Text>
                            <Text style={{ fontSize: '11px', textAlign: 'justify', lineHeight: '16px' }}>
                                {userList?.tentang}
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.container, styles.colContainer0]}>
                        <Image style={styles.cvImg} src={userList?.foto_profil} />
                    </View>
                </View>
                <View style={[styles.container, styles.colContainer, {
                    paddingBottom: '16px', marginBottom: '4px',
                    borderBottom: '0.5px',
                },]}>
                    <Text style={{ fontSize: '15px', fontWeight: 'bold', }}>
                        Pendidikan Terakhir
                    </Text>
                    {pendidikanTerakhir.map((item) => {
                        return (
                            <View key={item.id} style={[styles.container, styles.rowContainer]}>
                                <View style={[styles.container, styles.colContainer, styles.f1,]}>
                                    <Text style={{ fontSize: '13px', textAlign: 'justify', fontWeight: 'bold', }}>
                                        {item.institusi}
                                    </Text>
                                    <Text style={{ fontSize: '11px', textAlign: 'justify', }}>
                                        {dayjs(item.tahun_mulai)
                                            .locale('id')
                                            .format('MMMM YYYY')}{' '}
                                        - {item.tahun_selesai}
                                    </Text>
                                </View>
                                <View style={[styles.container, styles.colContainer, styles.f1,]}>
                                    <Text style={{ fontSize: '11px', textAlign: 'right' }}>
                                        Jurusan
                                    </Text>
                                    <Text style={{ fontSize: '11px', textAlign: 'right' }}>
                                        {item.jurusan}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>

                {pengalamanKerja && pengalamanKerja.length > 0 && (
                    <View style={[styles.container, styles.colContainer, { paddingBottom: '8px', borderBottom: '0.5px' }]}>
                        <Text style={{ fontSize: '15px', fontWeight: 'bold' }}>Pengalaman Kerja</Text>
                        {pengalamanKerja.map((item) => (
                            <View key={item.id} style={[styles.container, styles.rowContainer0, { gap: '4px'}]}>
                                <View style={[styles.container, styles.colContainer0, { justifyContent: 'center', alignItems: 'center', width: '10px', paddingTop:'2px', paddingBottom:'7px' }]}>
                                    <Svg width="10" height="10">
                                        <Circle cx="5" cy="5" r="4" fill="black" />
                                    </Svg>
                                    <View style={{ width: '1px', flex: 1, backgroundColor: 'black' }}></View>
                                </View>
                                <View style={[styles.container, styles.colContainer, { paddingBottom: '0px', flex:1 }]}>
                                    <View style={[styles.container, styles.rowContainer,]}>
                                        <View style={[styles.container, styles.colContainer, styles.f1]}>
                                            <View style={[styles.container, styles.rowContainer, { justifyContent: 'space-between', alignItems: 'center', padding: '0px', margin: '0px' }]}>
                                                <View style={[styles.container, styles.colContainer0]}>
                                                    <View style={[styles.container, styles.rowContainer0, {gap:'3px', alignItems:'center'}]}>
                                                        <Text style={{ fontSize: '12px', textAlign: 'justify', fontWeight: 'bold', }}>
                                                            {item.lokasi}
                                                        </Text>
                                                        <Text style={{ fontSize: '11px', textAlign: 'justify', fontWeight: 'bold', }}>
                                                            ({item.jabatan})
                                                        </Text>
                                                    </View>
                                                </View>
                                                <Text style={{ fontSize: '11px', textAlign: 'justify' }}>
                                                    {dayjs(item.tahun_mulai).locale('id').format('MMMM YYYY')}{' '}
                                                    - {item.tahun_selesai}
                                                </Text>
                                            </View>
                                            <Text style={{ fontSize: '11px', textAlign: 'justify', lineHeight: '18px', paddingLeft: '14px' }}>
                                                {item.detail}
                                            </Text>
                                        </View>
                                    </View>
                                    {item.prestasiKerjas?.length > 0 && (
                                        <View style={[styles.container, styles.colContainer, { paddingLeft: '14px' }]}>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', padding: 0, margin: 0 }}>Prestasi Kerja di {item.lokasi}</Text>
                                            {item.prestasiKerjas.map((dataPrestasiKerja) => (
                                                <View key={dataPrestasiKerja.id} style={[styles.container, styles.rowContainer, styles.f1, { justifyContent: 'space-between', paddingBottom: 10 }]}>
                                                    <Text style={{ fontSize: 11 }}>{dataPrestasiKerja.prestasi}</Text>
                                                    <Text style={{ fontSize: 11 }}>{dataPrestasiKerja.tahun.slice(0, 4)}</Text>
                                                </View>
                                            ))}
                                            <View style={{ marginVertical: '6px' }}></View>
                                        </View>
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {keahlian && keahlian.length > 0 && (
                    <View style={[styles.container, styles.colContainer, {
                        paddingBottom: '16px', marginBottom: '4px',
                        borderBottom: '0.5px',
                    },]}>
                        <Text style={{ fontSize: '15px', fontWeight: 'bold', }}>
                            Keahlian
                        </Text>
                        {keahlian.map((item) => {
                            return (
                                <View key={item.id} style={[styles.container, styles.rowContainer]}>
                                    <View style={[styles.container, styles.rowContainer, styles.f1,]}>
                                        <Text style={[{ fontSize: '11px', textAlign: 'justify', }, styles.f1,]}>
                                            {item.keahlian}
                                        </Text>
                                        <Text style={{ fontSize: '11px', textAlign: 'justify', }}>
                                            {item.tingkat}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                )}
                {pelatihan && pelatihan.length > 0 && (
                    <View style={[styles.container, styles.colContainer, {
                        paddingBottom: '16px', marginBottom: '4px',
                        borderBottom: '0.5px',
                    },]}>
                        <Text style={{ fontSize: '15px', fontWeight: 'bold', }}>
                            Pelatihan
                        </Text>
                        {pelatihan.map((item) => {
                            return (
                                <View key={item.id} style={[styles.container, styles.rowContainer]}>
                                    <View style={[styles.container, styles.rowContainer, styles.f1,]}>
                                        <Text style={[{ fontSize: '11px', textAlign: 'justify', }, styles.f1,]}>
                                            {item.pelatihan}
                                        </Text>
                                        <Text style={{ fontSize: '11px', textAlign: 'justify', }}>
                                            {dayjs(item.tahun_mulai)
                                                .locale('id')
                                                .format('MMMM YYYY')}{' '}
                                            - {item.tahun_selesai}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                )}
            </Page>
        </Document>
    );
};

export default PDFPreview;