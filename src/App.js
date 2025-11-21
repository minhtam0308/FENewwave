

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/general/Login';
import SignUp from './components/general/SignUp';
import Home from './components/general/Home';
import { Bounce, ToastContainer } from 'react-toastify';

function App() {
  return (

    <BrowserRouter>
      <Routes >
        <Route path={'/login'} element={<Login />} />
        <Route path={'/signup'} element={<SignUp />} />
        <Route path={'/'} element={<Home />} />
        <Route path={'/home'} element={<Home />} />
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
