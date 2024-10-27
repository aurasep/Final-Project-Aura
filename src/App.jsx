import React, { useEffect } from 'react';
import "./App.css";
import "./assets/stylebaru.scss";
import { Provider, useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "./redux/settingsSlice";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Detail from "./pages/detail/Detail";
import Home from "./pages/beranda/Home";
import MyStream from "./pages/MyStream";
import Film from "./pages/film/Film";
import RatingAnda from "./components/rating/RatingAnda";
import MyList from "./mylist/MyList";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import MoviesView from "./components/MoviesView";
import Settings from "./components/Settings";
import store from './redux/store';

const App = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.settings.darkMode);

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode') === 'true';
        if (savedMode !== darkMode) {
            dispatch(toggleDarkMode());
        }
    }, [dispatch, darkMode]);

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    return (
        <div className={darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mystream" element={<MyStream />} />
                <Route path="/login" element={<Login />} />
                <Route path="/movies" element={<Film />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/rated-movies" element={<RatingAnda />} />
                <Route path="/mylist" element={<MyList />} />
                <Route path="/genre" element={<MoviesView />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
            <Footer />
        </div>
    );
};

const Root = () => (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

export default Root;
