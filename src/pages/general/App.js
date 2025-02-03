import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../layout';
import Home from './home';
import Login from './login';
import RequestOtp from './requestOtp';
import PasswordReset from './resetPassword';
import Register from './register';
import HomeUser from '../client/home';
import UserList from '../admin/dashboard';
import UserListDetail from '../admin/userListDetail';
import CreateUserAdmin from '../admin/createUser';
import UpdateUserAdmin from '../admin/updateUser';
import UpdateUserSelf from '../client/user/updateUser';

// Halaman Pembangun CV
import CreatePengalamanKerja from '../client/pengalamanKerja/createPengalamanKerja';
import UpdatePengalamanKerja from '../client/pengalamanKerja/updatePengalamanKerja';
import CreatePendidikanTerakhir from '../client/pendidikan_terakhir/createPendidikanTerakhir';
import UpdatePendidikanTerakhir from '../client/pendidikan_terakhir/updatePendidikanTerakhir';
import CreateKeahlian from '../client/keahlian/createKeahlian';
import UpdateKeahlian from '../client/keahlian/updateKehalian';
import CreatePelatihan from '../client/pelatihan/createPelatihan';
import UpdatePelatihan from '../client/pelatihan/updatePelatihan';
import CreatePrestasi from '../client/prestasi/createPrestasi';
import UpdatePrestasi from '../client/prestasi/updatePrestasi';

//General Pages
import About from './about';
import Help from './help';

//PDF Page
import CVDocument from '../client/pdfPreview';
import MyPDFDocument from '../client/pdf2';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />}></Route>
                <Route path="/user/:id" element={<UserListDetail />}></Route>
                <Route path="/user/create" element={<CreateUserAdmin />}></Route>
                <Route path="/user/edit/:id" element={<UpdateUserAdmin />}></Route>
                <Route path="/dashboard" element={<UserList />}></Route>
                <Route path="/home" element={<HomeUser />}></Route>
                <Route path="/edit/:id" element={<UpdateUserSelf />}></Route>
                <Route path="/createpengalamankerja" element={<CreatePengalamanKerja />}></Route>
                <Route path="/pengalamankerja/:id_user/:id" element={<UpdatePengalamanKerja />}></Route>
                <Route path="/pendidikanterakhir" element={<CreatePendidikanTerakhir />}></Route>
                <Route path="/pendidikanterakhir/:id_user/:id" element={<UpdatePendidikanTerakhir />}></Route>
                <Route path="/keahlian" element={<CreateKeahlian />}></Route>
                <Route path="/keahlian/:id_user/:id" element={<UpdateKeahlian />}></Route>
                <Route path="/pelatihan" element={<CreatePelatihan />}></Route>
                <Route path="/pelatihan/:id_user/:id" element={<UpdatePelatihan />}></Route>
                <Route path="/prestasi/:id" element={<CreatePrestasi />}></Route>
                <Route path="/prestasi/:id_pengalaman_kerja/:id" element={<UpdatePrestasi />}></Route>
                <Route path="/doc/preview" element={<CVDocument />}></Route>
                <Route path="/user/login" element={<Login />}></Route>
                <Route path="/user/register" element={<Register />}></Route>
                <Route path="/user/otprequest" element={<RequestOtp />}></Route>
                <Route path="/user/resetpassword" element={<PasswordReset />}></Route>
                <Route path="/bantuan" element={<Help />}></Route>
                <Route path="/tentang" element={<About />}></Route>

                <Route path="/pdf2" element={<MyPDFDocument />}></Route>
            </Route>
        </Routes>
    )
}

export default App;
