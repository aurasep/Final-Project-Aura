import "./App.css";
import "./assets/stylebaru.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; 
import { store } from "./redux/store"; 
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Detail from "./pages/detail/Detail";
import Home from "./pages/beranda/Home";
import MyStream from "./pages/MyStream";
import Film from "./pages/film/Film";
import RatingAnda from "./components/rating/RatingAnda";
import MyList from "./mylist/MyList";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MoviesView from "./components/MoviesView";
import Settings from "./components/Settings";

const App = () => {
  return (
    <Provider store={store}> 
      <BrowserRouter>
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
      </BrowserRouter>
    </Provider>
  );
}

export default App;
