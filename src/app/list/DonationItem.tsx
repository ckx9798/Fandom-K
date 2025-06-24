import React, { forwardRef, useState } from 'react';

import Button from '../../../components/Button';
import SupportModal from '../../../components/modals/SupportModal';
import creditImg from '../../../assets/icon/credit.svg';
import { dDay } from '../../../utils/dDay';

const DonationItem = forwardRef(({ item, pageSize }, ref) => {
    const [modalClose, setModalClose] = useState(false);
    const ratio = Math.floor((item.receivedDonations / item.targetDonation) * 100);
    const deadline = item.receivedDonations >= item.targetDonation;

    const handleChargeModal = () => {
        setModalClose((prev) => !prev);
    };

    // Tailwind의 커스텀 색상은 config에 등록하거나, 임시로 hex값 사용
    const brand100 = 'text-[#6C5DD3]'; // 예시
    const white200 = 'text-white'; // 예시
    const gray100 = 'text-gray-400'; // 예시

    // 이미지/버튼 크기 반응형
    const imgWidth = pageSize === 'mobile' ? 158 : 282;
    const imgHeight = pageSize === 'mobile' ? 206 : 293;
    const btnBottom = pageSize === 'mobile' ? 8 : 24;
    const btnLeft = pageSize === 'mobile' ? 8 : 24;
    const subtitleMargin = pageSize === 'mobile' ? 'mt-[10px]' : 'mt-[12px]';
    const subtitleSize = pageSize === 'mobile' ? 'text-[12px]' : 'text-[16px]';
    const titleMargin = pageSize === 'mobile' ? 'mt-[6px]' : 'mt-[8px]';
    const titleSize = pageSize === 'mobile' ? 'text-[14px]' : 'text-[18px]';
    const donationMargin = pageSize === 'mobile' ? 'mt-[20px]' : 'mt-[24px]';

    return (
        <div ref={ref} className="flex flex-col w-fit">
            {/* 이미지 박스 */}
            <div className="relative">
                <img
                    src={item.idol.profilePicture}
                    alt="프로필 사진"
                    className={`object-cover rounded-[8px]`}
                    style={{ width: imgWidth, height: imgHeight }}
                />
                {/* 오버레이 */}
                <div
                    className="absolute top-0 left-0"
                    style={{
                        width: imgWidth,
                        height: imgHeight,
                        background: 'linear-gradient(180deg, rgba(0,0,0,0) 58.9%, #000 100%)',
                    }}
                />
                {/* 버튼 */}
                <div className="absolute" style={{ bottom: btnBottom, left: btnLeft }}>
                    {pageSize !== 'mobile' ? (
                        <Button onClick={handleChargeModal} disabled={deadline}>
                            {deadline ? '후원마감' : '후원하기'}
                        </Button>
                    ) : (
                        <Button width={142} height={31} onClick={handleChargeModal} disabled={deadline}>
                            {deadline ? '후원마감' : '후원하기'}
                        </Button>
                    )}
                </div>
            </div>

            {/* 서브타이틀 */}
            <p className={`${subtitleMargin} ${subtitleSize} ${gray100}`}>{item.subtitle}</p>
            {/* 타이틀 */}
            <p className={`${titleMargin} ${titleSize} font-medium ${white200}`}>{item.title}</p>
            {/* 기부 현황 */}
            <div className={`flex justify-between items-center text-[12px] ${donationMargin}`}>
                <p className={`flex items-center gap-1 ${brand100}`}>
                    <img src={creditImg} alt="크레딧" className="h-[16px]" />
                    {item.receivedDonations?.toLocaleString('ko-KR')} / {item.targetDonation?.toLocaleString('ko-KR')}
                </p>
                <p className={`${white200}`}>{dDay(item.deadline)}</p>
            </div>
            {/* 퍼센트 바 */}
            <div className="w-full mt-[8px] h-[1px] bg-white relative">
                <div
                    className="absolute top-0 left-0 h-[1px] bg-[#6C5DD3]"
                    style={{ width: `${ratio > 100 ? 100 : ratio}%` }}
                />
            </div>
            {/* 모달 */}
            {modalClose && <SupportModal item={item} setModalClose={setModalClose} />}
        </div>
    );
});

export default DonationItem;
