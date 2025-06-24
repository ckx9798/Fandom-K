import { useEffect, useState } from 'react';

import Button from '../../../components/Button.jsx';
import GenderToggleButton from './GenderToggleButton.jsx';
import IdolCard from './IdolCard.jsx';
import RefreshButton from '../../../components/RefreshButton.jsx';
import VoteModal from '../../../components/modals/VoteModal.jsx';
import chartImg from '../../../assets/image/Chart.svg';
import { getCharts } from '../../../api/charts.js';
import useDataNum from '../../../hooks/useDataNum.jsx';

const ThisMonthChart = () => {
    const [IdolData, setIdolData] = useState([]);
    const [IdolGender, setIdolGender] = useState('female');
    const IdolDataNum = useDataNum({ mobile: 5, tablet: 5, desktop: 10 });
    const [cursor, setCursor] = useState(null);
    const [error, setError] = useState(false);

    // refresh가 있으면, IdolData 초기화
    const loadIdolData = async (refresh) => {
        try {
            const response = await getCharts({
                gender: IdolGender,
                cursor: refresh ? null : cursor,
                pageSize: IdolDataNum,
            });
            if (refresh) {
                setIdolData(response.idols);
            } else {
                setIdolData((prevData) => [...prevData, ...response.idols]);
            }
            setCursor(response.nextCursor);
            setError(false);
        } catch (error) {
            setError(true);
        }
    };

    // IdolData 적용
    useEffect(() => {
        loadIdolData(true);
    }, [IdolGender, IdolDataNum]);

    // 버튼으로 성별 바꾸기
    const changeGender = (e) => {
        setIdolGender(e.target.value);
    };

    // 투표하기 모달창 열기
    const [isOpen, setIsOpen] = useState(false);
    const ViewVoteModalHandler = () => {
        setIsOpen(!isOpen);
    };

    // 더보기 버튼
    const ShowMoreBtn = () => {
        if (cursor) {
            return (
                <button
                    className="
                        flex justify-center items-center w-[326px] h-[42px] mt-[40px]
                        text-white bg-white/10 border border-[rgba(241,238,249,0.8)] rounded-[6px]
                        gap-[8px] text-[14px] font-bold cursor-pointer
                    "
                    onClick={() => loadIdolData()}
                >
                    더 보기
                </button>
            );
        } else {
            return null;
        }
    };

    return (
        <div className="w-[1200px] max-w-[95vw] mx-auto flex flex-col justify-center items-center mb-[150px] xl:w-[95%]">
            {/* Header */}
            <div className="w-full flex justify-between items-center">
                <div className="text-[24px] font-bold leading-[26px] text-white">이달의 차트</div>
                <Button width="128" height="32" radius="3" onClick={ViewVoteModalHandler}>
                    {isOpen && <VoteModal title={IdolGender} setModalClose={setIsOpen} />}
                    <div className="flex items-center gap-[7px] text-[13px] px-[10px] py-[2px]">
                        <img src={chartImg} alt="차트이미지" />
                        <span>차트 투표하기</span>
                    </div>
                </Button>
            </div>

            {/* Gender Toggle */}
            <div className="w-full my-[20px] flex">
                <GenderToggleButton
                    value="female"
                    currentGender={IdolGender}
                    onChange={changeGender}
                    label="이달의 여자 아이돌"
                />
                <GenderToggleButton
                    value="male"
                    currentGender={IdolGender}
                    onChange={changeGender}
                    label="이달의 남자 아이돌"
                />
            </div>

            {/* Chart List */}
            <div
                className="
                    w-full grid grid-cols-2 gap-x-[25px]
                    xl:grid-cols-1
                "
            >
                {IdolData.map((item, i) => (
                    <IdolCard key={item.id} item={item} rank={i + 1} />
                ))}
            </div>

            {/* 더보기 버튼 */}
            <ShowMoreBtn />

            {/* 에러시 새로고침 버튼 */}
            {error && <RefreshButton />}
        </div>
    );
};

export default ThisMonthChart;
