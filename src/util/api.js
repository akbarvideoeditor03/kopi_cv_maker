import Swal from "sweetalert2";

export async function apiFetch(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        controller.abort();
        Swal.fire({
            title: 'Ops...',
            text: 'Waktu request habis! Silakan coba lagi',
            icon: 'warning',
            showConfirmButton: true
        }).then(() => {
            window.location.reload();
        });
    }, 7000);

    try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(timeoutId);

        const kopiCode = response.headers.get("X-KOPI-CODE");

        switch (response.status) {
            case 400: {
                switch (kopiCode) {
                    case "A001":
                        Swal.fire({ icon: 'error', title: 'Ups...', text: 'Email sudah terdaftar, silakan gunakan email lain', timer: 3000, showConfirmButton: false, allowEscapeKey: false, allowOutsideClick: false, timerProgressBar: true });
                        break;
                    case "A002":
                        Swal.fire({ icon: 'warning', title: 'Perhatian', text: 'Email dibutuhkan', timer: 2000, showConfirmButton: false, allowEscapeKey: false, allowOutsideClick: false, timerProgressBar: true });
                        break;
                    case "A003":
                        Swal.fire({ icon: 'warning', title: 'Perhatian', text: 'OTP dibutuhkan', timer: 2000, showConfirmButton: false, allowEscapeKey: false, allowOutsideClick: false, timerProgressBar: true });
                        break;
                    case "A004":
                        Swal.fire({ icon: 'warning', title: 'Perhatian', text: 'Password dibutuhkan', timer: 2000, showConfirmButton: false, allowEscapeKey: false, allowOutsideClick: false, timerProgressBar: true });
                        break;
                    case "A005":
                        localStorage.clear();
                        sessionStorage.clear();
                        break;
                    default: break;
                }
                throw new Error('400 Bad Request');
            }
            case 401: {
                switch (kopiCode) {
                    case "B001":
                        Swal.fire({ icon: 'error', title: 'Ups...', text: 'Pengguna belum terdaftar', timer: 3000, showConfirmButton: false, allowEscapeKey: false, allowOutsideClick: false, timerProgressBar: true });
                        break;
                    case "B002":
                        Swal.fire({ icon: 'error', title: 'Ups...', text: 'Password salah', timer: 2000, showConfirmButton: false, allowEscapeKey: false, allowOutsideClick: false, timerProgressBar: true });
                        break;
                    case "B003":
                        Swal.fire({ icon: 'error', title: 'Ups...', text: 'Kode OTP salah', timer: 2000, showConfirmButton: false, allowEscapeKey: false, allowOutsideClick: false, timerProgressBar: true });
                        break;
                    case "B004":
                        Swal.fire({ icon: 'error', title: 'Ups...', text: 'Kode OTP sudah kadaluarsa. Silakan ulangi lagi', timer: 3000, showConfirmButton: false, allowEscapeKey: false, allowOutsideClick: false, timerProgressBar: true });
                        break;
                    default: break;
                }
                throw new Error('401 Unauthorized');
            }
            case 403: {
                if (kopiCode === "C001") {
                    Swal.fire({ icon: 'error', title: 'Akses ditolak', text: 'Silakan hubungi Admin', timer: 3000, showConfirmButton: false, allowEscapeKey: false, allowOutsideClick: false, timerProgressBar: true });
                }
                localStorage.removeItem('/v%');
                localStorage.removeItem('$f*');
                localStorage.removeItem('&l2');
                sessionStorage.clear();
                throw new Error('403 Forbidden');
            }
            case 404: {
                switch (kopiCode) {
                    case "D001":
                        Swal.fire({ icon: 'error', title: 'Ups...', text: 'Pengguna tidak ditemukan', timer: 3000, showConfirmButton: false, allowEscapeKey: false, allowOutsideClick: false, timerProgressBar: true });
                        break;
                    case "D002":
                        Swal.fire({ icon: 'error', title: 'Ups...', text: 'Data tidak ditemukan', timer: 2000, showConfirmButton: false, allowEscapeKey: false, allowOutsideClick: false, timerProgressBar: true });
                        break;
                    default: break;
                }
                throw new Error('404 Not Found');
            }
            case 500: {
                switch (kopiCode) {
                    case "E001":
                        Swal.fire({ icon: 'error', title: 'Ups, Maaf...', text: 'Server sedang bermasalah', timer: 2000, showConfirmButton: false, allowEscapeKey: false, allowOutsideClick: false, timerProgressBar: true });
                        break;
                    case "E002":
                        Swal.fire({ icon: 'error', title: 'Ups...', text: 'Kode OTP gagal dikirimkan', timer: 2000, showConfirmButton: false, allowEscapeKey: false, allowOutsideClick: false, timerProgressBar: true });
                        break;
                    default: break;
                }
                throw new Error('500 Internal Server Error');
            }
            case 200: {
                switch (kopiCode) {
                    case "F001": Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Data pengguna berhasil diperbarui', timer: 2000, showConfirmButton: false }).then(() => { window.location.href = '/dashboard' }); break;
                    case "F002": Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Data pengguna berhasil dihapus', timer: 2000, showConfirmButton: false }).then(() => { window.location = '/'; }); break;
                    case "F011": Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Pembuatan akun berhasil. Silakan login dengan akun Anda', timer: 3000, showConfirmButton: false }).then(() => { window.location = '/user/login'; }); break;
                    case "F012": Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Akun berhasil masuk', timer: 2000, showConfirmButton: false }).then(() => { window.location = '/'; }); break;
                    case "F021": Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Kode OTP berhasil dikirim. Cek email sekarang', timer: 3000, showConfirmButton: false }).then(() => { window.location.href = '/user/passwordreset'; }); break;
                    case "F022": Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Password berhasil diperbarui', timer: 2000, showConfirmButton: false }).then(() => { const token = localStorage.getItem('/v%'); if (!token) { window.location.href = '/user/login'; } else { window.location.href = '/home'; } }); break;
                    case "F031": Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Galeri berhasil diperbarui', timer: 2000, showConfirmButton: false }); break;
                    case "F032": Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Keahlian berhasil diperbarui', timer: 2000, showConfirmButton: false }).then(() => { window.location.href = '/home'; }); break;
                    case "F033": Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Pelatihan berhasil diperbarui', timer: 2000, showConfirmButton: false }).then(() => { window.location.href = '/home'; }); break;
                    case "F034": Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Pendidikan terakhir berhasil diperbarui', timer: 2000, showConfirmButton: false }).then(() => { window.location.href = '/home'; }); break;
                    case "F035": Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Pengalaman kerja berhasil diperbarui', timer: 2000, showConfirmButton: false }).then(() => { window.location.href = '/home'; }); break;
                    case "F036": Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Prestasi kerja berhasil diperbarui', timer: 2000, showConfirmButton: false }).then(() => { window.location.href = '/home'; }); break;
                    case "F037": Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Data berhasil diperbarui', timer: 2000, showConfirmButton: false }).then(() => { window.location.href = '/home'; }); break;
                    default: break;
                }
                break;
            }
            case 201: {
                switch (kopiCode) {
                    case "G001": Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Pengguna berhasil ditambahkan', timer: 2000, showConfirmButton: false }).then(() => { window.location.href = '/dashboard'; }); break;
                    case "G002": Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Galeri berhasil ditambahkan', timer: 2000, showConfirmButton: false }).then(() => { window.location = '/dashboard'; }); break;
                    case "G003": Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Keahlian berhasil ditambahkan', timer: 2000, showConfirmButton: false }).then(() => { window.location.href = '/home'; }); break;
                    case "G004": Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Pelatihan berhasil ditambahkan', timer: 2000, showConfirmButton: false }).then(() => { window.location.href = '/home'; }); break;
                    case "G005": Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Pendidikan terakhir berhasil ditambahkan', timer: 2000, showConfirmButton: false }).then(() => { window.location.href = '/home'; }); break;
                    case "G006": Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Pengalaman kerja berhasil ditambahkan', timer: 2000, showConfirmButton: false }).then(() => { window.location.href = '/home'; }); break;
                    case "G007": Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Prestasi kerja berhasil ditambahkan', timer: 2000, showConfirmButton: false }).then(() => { window.location.href = '/home'; }); break;
                    default: break;
                }
                break;
            }
            case 204: {
                switch (kopiCode) {
                    case "H001": Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Pengguna berhasil dihapus', timer: 2000, showConfirmButton: false }).then(() => { window.location.reload(); }); break;
                    case "H002": Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Galeri berhasil dihapus', timer: 2000, showConfirmButton: false }).then(() => { window.location.reload(); }); break;
                    case "H003": Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Keahlian berhasil dihapus', timer: 2000, showConfirmButton: false }).then(() => { window.location.reload(); }); break;
                    case "H004": Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Pelatihan berhasil dihapus', timer: 2000, showConfirmButton: false }).then(() => { window.location.reload(); }); break;
                    case "H005": Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Pendidikan terakhir berhasil dihapus', timer: 2000, showConfirmButton: false }).then(() => { window.location.reload(); }); break;
                    case "H006": Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Pengalaman kerja berhasil dihapus', timer: 2000, showConfirmButton: false }).then(() => { window.location.reload(); }); break;
                    case "H007": Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Prestasi kerja berhasil dihapus', timer: 2000, showConfirmButton: false }).then(() => { window.location.reload(); }); break;
                    default: break;
                }
                break;
            }
            default:
                break;
        }

        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

export default apiFetch;
