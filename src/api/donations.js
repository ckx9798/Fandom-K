import { instance } from './api';

// 후원 목록 받아오기
export const getDonations = async ({ cursor = null, pageSize = 10 }) => {
    const response = await instance
        .get(`/donations`, { params: { cursor, pageSize } })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            throw error;
        });
    return response;
};

// 모집 중인 조공에 대해 크레딧을 사용해 후원하기
export const putContribute = async (id, amount) => {
    const response = await instance
        .put(`/donations/${id}/contribute`, {
            amount,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
    return response;
};
