import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/main/MainPage';
import ListPage from './pages/list/ListPage';
import MyPage from './pages/my/MyPage';
import ErrorPage from './components/ErrorPage';

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainPage />} errorElement={ErrorPage} />
                <Route path="/list" element={<ListPage />} />
                <Route path="/my" element={<MyPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </>
    );
};

export default App;
