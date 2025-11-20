

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/general/Login';
import SignUp from './components/general/SignUp';

function App() {
  return (

    <BrowserRouter>
      <Routes >
        <Route path={'/login'} element={<Login />} />
        <Route path={'/'} element={<Login />} />
        <Route path={'/signup'} element={<SignUp />} />
      </Routes>

    </BrowserRouter>


  );
}

export default App;
