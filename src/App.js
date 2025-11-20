

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/general/Login';
import SignUp from './components/general/SignUp';
import Home from './components/general/Home';

function App() {
  return (

    <BrowserRouter>
      <Routes >
        <Route path={'/login'} element={<Login />} />
        <Route path={'/signup'} element={<SignUp />} />
        <Route path={'/'} element={<Home />} />
        <Route path={'/home'} element={<Home />} />
      </Routes>

    </BrowserRouter>


  );
}

export default App;
