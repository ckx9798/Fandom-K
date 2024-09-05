import { instance } from './api';

// 아이돌 목록 받아오기
export const getIdols = async ({ cursor = null, pageSize = 10 }) => {
    const response = await instance
        .get(`/Idols`, { params: { cursor, pageSize } })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            throw error;
        });
    return response;
};
