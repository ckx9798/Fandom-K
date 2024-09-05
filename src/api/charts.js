import { instance } from './api';

// 아이돌 차트 받아오기
export const getCharts = async ({ gender = 'female', cursor = null, pageSize = 10 }) => {
    const response = await instance
        .get(`charts/{gender}`, { params: { gender, cursor, pageSize } })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            throw error;
        });
    return response;
};
