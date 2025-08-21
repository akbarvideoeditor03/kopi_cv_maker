import Swal from "sweetalert2";
export async function apiFetch(url, options = {}) {
    const response = await fetch(url, options);

    switch (response.status) {
        case 401:
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Maaf, pengguna tidak ditemukan atau belum terdaftar',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            }).then(() => {
                Swal.close();
                window.location.reload();
            });
            throw new Error('401 Unauthorized');
        case 403:
            localStorage.removeItem('/v%');
            localStorage.removeItem('$f*');
            localStorage.removeItem('&l2');
            sessionStorage.clear();
            throw new Error('403 Forbidden');
        case 500:
            Swal.fire({
                icon: 'error',
                title: 'Ups, Maaf...',
                text: 'Server kami lagi error nih',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
            throw new Error('500 Internal Server Error');
        case 502:
            Swal.fire({
                icon: 'error',
                title: 'Ups, Maaf...',
                text: 'Server lagi bad gateway',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
            throw new Error('502 Bad Gateway');
        case 503:
            Swal.fire({
                icon: 'error',
                title: 'O, ow...',
                text: 'Layanan kosong',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
            throw new Error('503 Service Unavailable');
        default:
            break;
    }
    return response;
}

export default apiFetch;