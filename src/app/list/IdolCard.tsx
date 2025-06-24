function IdolCard({ item, rank }) {
    return (
        <div className="flex justify-between items-center border-b border-white/10 text-white">
            {/* 프로필, 랭크, 이름 */}
            <div className="flex items-center gap-[14px] my-[10px]">
                {/* 프로필 이미지 */}
                <div className="w-[70px] h-[70px] border border-[#f96d69] rounded-full flex justify-center items-center">
                    <img
                        src={item.profilePicture}
                        alt="프로필이미지"
                        className="w-[60px] h-[60px] rounded-full object-cover"
                    />
                </div>
                {/* 랭크 */}
                <div className="font-normal text-[#f96d69] text-[16px]">{rank}</div>
                {/* 이름 */}
                <div className="text-white/90 text-[16px] font-medium">{item.name}</div>
            </div>
            {/* 투표수 */}
            <div className="flex items-center justify-center text-white/60 text-[16px] font-medium">
                {item.totalVotes.toLocaleString()} 표
            </div>
        </div>
    );
}

export default IdolCard;
