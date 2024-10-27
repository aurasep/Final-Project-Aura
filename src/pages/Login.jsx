import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Pengecekan apakah pengguna sudah terautentikasi
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      navigate("/"); // Arahkan ke Home jika sudah terautentikasi
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Validasi sederhana untuk login
    if (email === "user@example.com" && password === "password") {
      // Simpan status autentikasi
      localStorage.setItem("isAuthenticated", "true");
      // Navigasi ke halaman home jika login berhasil
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen text-black"
      style={{
        backgroundImage: "url(https://i.pinimg.com/564x/f8/79/f4/f879f4538e0a39299bb54adf25f4f2c5.jpg)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <form className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-full max-w-sm" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold text-center text-black">Login</h2>
        <div>
          <label htmlFor="email" className="block text-sm text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 mt-1 rounded bg-gray-200 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 mt-1 rounded bg-gray-200 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg">Login</button>
      </form>
    </div>
  );
};

export default Login;
