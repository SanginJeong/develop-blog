import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router';
import AppLayout from './layout/AppLayout';
import HomePage from './pages/HomePage/HomePage';
import ContentPage from './pages/ContentPage/ContentPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import LoginPage from './pages/LoginPage/LoginPage';
import WritingPage from './pages/WritingPage/WritingPage';
import PostDetailPage from './pages/PostDetailPage/PostDetailPage';
import PostUpdatePage from './pages/PostUpdatePage/PostUpdatePage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<AppLayout/>}>
          <Route index element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/contents/:categoryId'>
            <Route index element={<ContentPage/>}/>
            <Route path=':postId'>
              <Route index element={<PostDetailPage/>}/>
              <Route path='update' element={<PostUpdatePage/>}/>
            </Route>
            <Route path='writing' element={<WritingPage/>}/>
          </Route>
        </Route>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </>
  );
}

export default App;
