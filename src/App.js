import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home"
// import Favorite from "./pages/favorite"
import  MovieDetails from "./pages/movie-details"
import Layout from "./layout/layout"
import Genres from './pages/genres';
import Login from './pages/auth/login';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        {/* <Route path="favourite" element={<Favorite/>}/> */}
        <Route path="movieDetails/:id" element={<MovieDetails/>}/>
        <Route path="movies/:genre" element={<Genres/>}/>
      </Route>
        <Route path="login" element={<Login/>}/>
        <Route path="*" element={<>404 Not Found</>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
