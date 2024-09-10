import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/main/MainPage';
import ListPage from './pages/list/ListPage';
import MyPage from './pages/my/MyPage';
import ErrorPage from './components/ErrorPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';

const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} errorElement={ErrorPage} />
                <Route path="/list" element={<ListPage />} />
                <Route path="/my" element={<MyPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            <ToastContainer />
        </>
    );
};

export default App;
