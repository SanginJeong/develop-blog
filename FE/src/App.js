import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router';
import AppLayout from './layout/AppLayout';
import HomePage from './pages/HomePage/HomePage';
import ContentPage from './pages/ContentPage/ContentPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<AppLayout/>}>
          <Route index element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/contents/:id' element={<ContentPage/>}/>
        </Route>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </>
  );
}

export default App;
