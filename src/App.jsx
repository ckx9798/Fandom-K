import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/main/MainPage';
import ListPage from './pages/list/ListPage';
import MyPage from './pages/my/MyPage';
import GlobalStyle from './styles/GrobalStyle';

const App = () => {
    return (
        <>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/list" element={<ListPage />} />
                <Route path="/my" element={<MyPage />} />
            </Routes>
        </>
    );
};

export default App;
