import { instance } from './api';

// 투표 생성
export const postVotes = (idolId) => {
    const response = instance
        .post(`/votes`, { idolId })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            throw error;
        });
    return response;
};
