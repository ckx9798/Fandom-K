import styled from 'styled-components';

function IdolCard({ item, rank }) {
    return (
        <IdolCardBox>
            <IdolCardProfile>
                <IdolCardProfileImg>
                    <img src={item.profilePicture} alt="프로필이미지" />
                </IdolCardProfileImg>
                <IdolCardRank> {rank} </IdolCardRank>
                <IdolCardName> {item.name} </IdolCardName>
            </IdolCardProfile>
            <IdolCardVotes>{item.totalVotes.toLocaleString()} 표</IdolCardVotes>
        </IdolCardBox>
    );
}

export default IdolCard;

const Text = styled.div`
    font-family: 'Pretendard-Regular', sans-serif;
    font-size: 16px;
    font-weight: ${(props) => props.fontWeight || 500};
    color: ${(props) => props.color};
`;

const IdolCardBox = styled.div`
    display: flex;
    justify-content: space-between;
    color: #ffffff;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;
const IdolCardProfile = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 10px 0;
`;
const IdolCardProfileImg = styled.div`
    width: 70px;
    height: 70px;
    border: 1px solid #f96d69;
    border-radius: 60px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
    }
`;
const IdolCardRank = styled(Text)`
    font-weight: 400;
    color: #f96d69;
`;
const IdolCardName = styled(Text)`
    color: rgba(255, 255, 255, 0.87);
`;
const IdolCardVotes = styled(Text)`
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, 0.6);
`;
