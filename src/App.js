

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/general/Login';
import SignUp from './components/general/SignUp';
import Home from './components/general/Home';
import { Bounce, ToastContainer } from 'react-toastify';
import AuthorManage from './components/admin/AuthorManage';
import HomeContent from './components/general/HomeContent';
import axios from './config/axiosConfig.js'
import BookManage from './components/admin/BookManage';
import { useEffect } from 'react';

function App() {
  if (localStorage.getItem("user")) {
    let refresh = true;
    if (refresh) {
      try {
        setInterval(async () => {
          let resfreshToken = await axios.post(`/api/Auth/refresh-token`,
            { UserId: JSON.parse(localStorage.getItem("user")).id, RefreshToken: localStorage.getItem("refreshToken") });
          if (resfreshToken.accessToken) {
            localStorage.setItem("accessToken", resfreshToken.accessToken);
            localStorage.setItem("refreshToken", resfreshToken.refreshToken);
            localStorage.setItem("user", JSON.stringify(resfreshToken.user));
          }
        }, 540000);
      } catch (e) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        refresh(false);
      }
    }


  }


  return (

    <BrowserRouter>
      <Routes >
        <Route path={'/login'} element={<Login />} />
        <Route path={'/signup'} element={<SignUp />} />
        <Route path={'/'} element={<Home />} >
          <Route path={'/manage-authors'} element={<AuthorManage />} />
          <Route path={'/manage-books'} element={<BookManage />} />
          <Route index element={<HomeContent />} />

        </Route>
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </BrowserRouter>


  );
}

export default App;
