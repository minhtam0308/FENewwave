

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/general/Login';
import SignUp from './components/general/SignUp';
import Home from './components/general/Home';
import { Bounce, ToastContainer } from 'react-toastify';
import AuthorManage from './components/admin/AuthorManage';
import HomeContent from './components/general/HomeContent';
import axios from './config/axiosConfig.js'
import BookManage from './components/admin/BookManage';
import { setToekn } from './context/contextToken.js';
import ViewDetailBook from './components/user/ViewDetailBook.js';
import ProfileUser from './components/user/ProfileUser.js';
import { useUserContext } from './context/UserContext.js';
import { useEffect } from 'react';
import Library from './components/user/Library.js';

function App() {
  let isFresh = true;
  const { setUserContext } = useUserContext();
  if (isFresh) {
    try {
      setInterval(async () => {
        let resfreshToken = await axios.post(`/api/Auth/refresh-token`, {},
          {
            withCredentials: true
          }
        );
        if (resfreshToken?.ec === 0) {
          setToekn(resfreshToken.em);
          localStorage.setItem("user", JSON.stringify(resfreshToken.user));
          setUserContext(resfreshToken.user);

        }
      }, 540000);
    } catch (e) {
      console.log(e);
      localStorage.removeItem("user");
      isFresh = false;
    }
  }

  useEffect(() => {
    const reload = async () => {
      let resfreshToken = await axios.post(`/api/Auth/refresh-token`, {},
        {
          withCredentials: true
        }
      );
      if (resfreshToken?.ec === 0) {
        setToekn(resfreshToken.em);
        setUserContext(resfreshToken.user);
        localStorage.setItem("user", JSON.stringify(resfreshToken.user));
      }
    }
    reload();
  }, [])


  return (

    <BrowserRouter>
      <Routes >
        <Route path={'/login'} element={<Login />} />
        <Route path={'/signup'} element={<SignUp />} />
        <Route path={'/'} element={<Home />} >
          <Route path={'/manage-authors'} element={<AuthorManage />} />
          <Route path={'/manage-books'} element={<BookManage />} />
          <Route path={'/view-detailbook'} element={<ViewDetailBook />} />
          <Route path={'/profile-user'} element={<ProfileUser />} />
          <Route path={'/library'} element={<Library />} />
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
