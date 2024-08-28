export const dDay = (timestamp) => {
    let dDayString = '';

    if (timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const differenceInMilliseconds = date - now;
        const minutes = Math.floor(differenceInMilliseconds / 1000 / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            dDayString = `${days}일 남음`;
        } else if (hours > 0) {
            dDayString = `${hours}시간 남음`;
        } else if (minutes > 0) {
            dDayString = `${minutes}분 남음`;
        } else {
            dDayString = `마감`;
        }
    }

    return dDayString;
};
