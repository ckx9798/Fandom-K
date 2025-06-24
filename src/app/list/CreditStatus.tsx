import CreditCharge from '../../../components/modals/CreditCharge';
import creditImg from '../../../assets/icon/credit.svg';
import useCredit from '../../../hooks/list/useCredit';
import { useState } from 'react';

const CreditStatus = () => {
    const [modalClose, setModalClose] = useState(true);
    const credit = useCredit();

    const handleChargeModal = () => {
        setModalClose((prev) => !prev);
    };

    return (
        <div
            className="
        max-w-[1200px] w-full
        px-[80px] py-[30px]
        border border-[rgba(241,238,249,0.8)]
        rounded-[8px]
        flex items-center justify-between
        md:px-[50px]
        sm:px-[30px]
      "
        >
            <div className="flex flex-col gap-[15px]">
                <h2 className="text-[rgba(255,255,255,0.6)] text-[16px] leading-[19.09px]">내 크레딧</h2>
                <div className="flex items-center gap-[4px] text-[rgba(255,255,255,0.87)]">
                    <img src={creditImg} alt="크레딧" className="w-[16px] h-[16px]" />
                    {credit !== 0 ? credit?.toLocaleString('ko-KR') : 0}
                </div>
            </div>
            <button
                className="
          bg-none border-none
          text-brand100
          text-[16px] font-bold
          tracking-[1.5px] leading-[26px]
        "
                onClick={handleChargeModal}
                type="button"
            >
                충전하기
            </button>
            {!modalClose && <CreditCharge setModalClose={setModalClose} />}
        </div>
    );
};

export default CreditStatus;
