import { Link } from "react-router-dom";
import { AlertCircle, Home } from "lucide-react";

function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <div className="not-found-icon">
          <AlertCircle size={42} />
        </div>

        <h1>404</h1>
        <h2>Halaman Tidak Ditemukan</h2>
        <p>
          Maaf, halaman yang kamu cari tidak tersedia atau alamat
          yang dimasukkan salah.
        </p>

        <Link to="/dashboard" className="primary-btn not-found-btn">
          <Home size={18} />
          Kembali ke Dashboard
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
