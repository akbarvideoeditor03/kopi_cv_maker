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
dayjs.locale('id');
const id = localStorage.getItem('id');
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

Font.register({
    family: 'Times-Roman',
});

const styles = StyleSheet.create({
    page: {
        padding: 32,
        fontFamily: 'Times-Roman',
    },
    h1: {
        fontSize: 25,
        fontFamily: 'Times-Bold',
        fontWeight: 'bold',
    },
    subheader: {
        fontSize: 14,
        marginBottom: 8,
    },
    sectionTittle: {
        fontSize: '14px',
        fontFamily: 'Times-Bold',
    },
    sectionTittle2: {
        fontSize: '12px',
        fontFamily: 'Times-Bold',
    },
    sectionContent: {
        fontSize: '11px',
        lineHeight: '16px',
        fontFamily: 'Times-Roman',
    },
    rightSection: {
        width: '175px',
        marginLeft: '10px',
        textAlign: 'right'
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
    hLineBlack: {
        paddingBottom: '6px',
        marginBottom: '0px',
        borderBottom: '0.5px',
        borderColor: 'black'
    },
});

function PDFPreviewATS() {
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
                        <a href="/pdfpreview" className='btn btn-primary-b' style={{ width: 'fit-content' }}>
                            <div className='container' style={{ gap: '0.3rem' }}>
                                <i className="bi-arrow-left-circle"></i>
                                <p>Template CV</p>
                            </div>
                        </a>
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
                            <MyPdf
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

const MyPdf = ({
    userList,
    pengalamanKerja,
    pendidikanTerakhir,
    keahlian,
    pelatihan,
    prestasiKerja,
}) => {
    const userID = userList?.id;
    return (
        <Document>
            <Page style={[styles.page]}>
                <View style={[styles.container, styles.colContainer]}>
                    <View style={[styles.container, styles.colContainer, styles.hLineBlack]}>
                        <View style={[styles.container, styles.colContainer0, { textAlign: 'center' }]}>
                            <Text style={styles.h1}>{userList?.nama}</Text>
                            <View style={[styles.container, styles.rowContainer, styles.fWrap, styles.fCenter, { fontSize: 12 }]}>
                                <Text>{userList.alamat}  |  {userList.email}  |  {userList.no_telp}</Text>
                            </View>
                        </View>
                        <Text style={[styles.sectionContent, { textAlign: 'justify', marginTop: 5 }]}>
                            {userList?.tentang}
                        </Text>
                    </View>
                    {
                        pengalamanKerja.some((item) => item.id_user === userID) && (
                            <View style={[styles.container, styles.colContainer, styles.hLineBlack, { textAlign: 'justify' }]}>
                                <Text style={styles.sectionTittle}>Pengalaman Kerja</Text>
                                {pengalamanKerja.map((item) => {
                                    const prestasiId = item.id;
                                    return (
                                        <View key={item.id} style={[styles.container, styles.rowContainer]}>
                                            <View style={[styles.container, styles.colContainer, styles.f1]}>
                                                <Text style={[styles.sectionTittle2]}>{item.lokasi}</Text>
                                                <Text style={[styles.sectionContent]}>
                                                    {dayjs(item.tahun_mulai)
                                                        .locale('id')
                                                        .format('MMMM YYYY')}{' '}
                                                    - {item.tahun_selesai}
                                                </Text>
                                                <Text
                                                    style={[styles.sectionContent]}
                                                >
                                                    {item.detail}
                                                </Text>
                                                {prestasiKerja.some(
                                                    (item) =>
                                                        item.id_pengalaman_kerja ===
                                                        prestasiId
                                                ) && (
                                                        <Text
                                                            style={[styles.sectionTittle2]}
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
                                                                styles.rowContainer,
                                                            ]}
                                                        >
                                                            <View style={[styles.sectionContent, styles.f1]}>
                                                                <Text>
                                                                    {item.prestasi}
                                                                </Text>
                                                            </View>
                                                            <View style={[styles.sectionContent, styles.rightSection]}>
                                                                <Text>
                                                                    Tahun{' '}
                                                                    {item.tahun.slice(0, 4)}
                                                                </Text>
                                                            </View>
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
                        )
                    }
                    <View style={[styles.container, styles.colContainer, styles.hLineBlack, { textAlign: 'justify' }]}>
                        <Text style={styles.sectionTittle}>Pendidikan</Text>
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
                                            style={[styles.sectionTittle2]}
                                        >
                                            {item.institusi}
                                        </Text>
                                        <Text
                                            style={[styles.sectionContent]}
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
                                            styles.rightSection
                                        ]}
                                    >
                                        <Text
                                            style={[styles.sectionTittle2, {
                                                textAlign: 'right',
                                            }]}
                                        >
                                            Jurusan
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: '11px',
                                                textAlign: 'right',
                                            }}
                                        >
                                            {item.jurusan}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                    {
                        pelatihan.some((item) => item.id_user === userID) && (
                            <View style={[styles.container, styles.colContainer, styles.hLineBlack, { textAlign: 'justify' }]}>
                                <Text style={styles.sectionTittle}>Pelatihan</Text>
                                {pelatihan.map((item) => {
                                    return (
                                        <View
                                            key={item.id}
                                            style={[styles.container, styles.rowContainer]}
                                        >
                                            <View
                                                style={[
                                                    styles.container,
                                                    styles.rowContainer,
                                                    styles.f1
                                                ]}
                                            >
                                                <View style={[styles.f1, styles.sectionContent]}>
                                                    <Text>
                                                        {item.pelatihan}
                                                    </Text>
                                                </View>
                                                <View style={[styles.rightSection, styles.sectionContent, { textAlign: 'right' }]}>
                                                    <Text>
                                                        {dayjs(item.tahun_mulai)
                                                            .locale('id')
                                                            .format('MMMM YYYY')}{' '}
                                                        - {item.tahun_selesai}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                        )
                    }

                    <View style={[styles.container, styles.colContainer, styles.hLineBlack, { textAlign: 'justify' }]}>
                        <Text style={styles.sectionTittle}>Keahlian</Text>
                        {keahlian.map((item) => {
                            return (
                                <View
                                    key={item.id}
                                    style={[styles.container, styles.rowContainer]}
                                >
                                    <View
                                        style={[
                                            styles.container,
                                            styles.rowContainer,
                                            styles.f1
                                        ]}
                                    >
                                        <View style={[styles.f1, styles.sectionContent]}>
                                            <Text>
                                                {item.keahlian}
                                            </Text>
                                        </View>
                                        <View style={[styles.sectionContent]}>
                                            <Text>
                                                {item.tingkat}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default PDFPreviewATS;