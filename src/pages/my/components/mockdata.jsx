const mockdata = {
    list: [
        {
            id: 904,
            name: '로제',
            gender: 'female',
            group: '블랙핑크',
            profilePicture:
                'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1720765415011/rose.png',
            totalVotes: 50,
            teamId: 23,
        },
        {
            id: 912,
            name: '민지',
            gender: 'female',
            group: '뉴진스',
            profilePicture:
                'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1720765305537/minji.png',
            totalVotes: 32,
            teamId: 23,
        },
        {
            id: 915,
            name: '성한빈',
            gender: 'male',
            group: '제로베이스원',
            profilePicture:
                'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1721105698714/sunghanbin.png',
            totalVotes: 27,
            teamId: 23,
        },
        {
            id: 903,
            name: '제니',
            gender: 'female',
            group: '블랙핑크',
            profilePicture:
                'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1720765212694/jennie.png',
            totalVotes: 26,
            teamId: 23,
        },
        {
            id: 909,
            name: '유나',
            gender: 'female',
            group: '있지',
            profilePicture:
                'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1720765606069/yuna.png',
            totalVotes: 26,
            teamId: 23,
        },
        {
            id: 905,
            name: '예지',
            gender: 'female',
            group: '있지',
            profilePicture:
                'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1720765587714/yeji.png',
            totalVotes: 24,
            teamId: 23,
        },
        {
            id: 916,
            name: '장하오',
            gender: 'male',
            group: '제로베이스원',
            profilePicture:
                'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1721105739881/zhanghao.png',
            totalVotes: 23,
            teamId: 23,
        },
        {
            id: 1016,
            name: '해린',
            gender: 'female',
            group: '뉴진스',
            profilePicture:
                'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1721386408904/haerin.png',
            totalVotes: 21,
            teamId: 23,
        },
        {
            id: 1020,
            name: '버논',
            gender: 'male',
            group: '세븐틴',
            profilePicture:
                'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1721398128858/vernon.png',
            totalVotes: 21,
            teamId: 23,
        },
        {
            id: 920,
            name: '앤톤',
            gender: 'male',
            group: '라이즈',
            profilePicture:
                'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1720765000714/anton.png',
            totalVotes: 20,
            teamId: 23,
        },
        {
            id: 906,
            name: '리아',
            gender: 'female',
            group: '있지',
            profilePicture:
                'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1720765257106/lia.png',
            totalVotes: 19,
            teamId: 23,
        },
        {
            id: 908,
            name: '채령',
            gender: 'female',
            group: '있지',
            profilePicture:
                'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1720765143553/chaeryung.png',
            totalVotes: 18,
            teamId: 23,
        },
        {
            id: 919,
            name: '소희',
            gender: 'male',
            group: '라이즈',
            profilePicture:
                'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1720765502844/sohee.png',
            totalVotes: 18,
            teamId: 23,
        },
        {
            id: 1011,
            name: '카리나',
            gender: 'female',
            group: '에스파',
            profilePicture:
                'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1721386114015/karina.png',
            totalVotes: 15,
            teamId: 23,
        },
        {
            id: 917,
            name: '리키',
            gender: 'male',
            group: '제로베이스원',
            profilePicture:
                'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1720765391728/ricky.png',
            totalVotes: 14,
            teamId: 23,
        },
        {
            id: 921,
            name: '쇼타로',
            gender: 'male',
            group: '라이즈',
            profilePicture:
                'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1720765479645/shotaro.png',
            totalVotes: 13,
            teamId: 23,
        },
        {
            id: 1017,
            name: '다니엘',
            gender: 'female',
            group: '뉴진스',
            profilePicture:
                'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1721386436205/daniel.png',
            totalVotes: 13,
            teamId: 23,
        },
        {
            id: 1019,
            name: '도겸',
            gender: 'male',
            group: '세븐틴',
            profilePicture:
                'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1721397981499/dk.png',
            totalVotes: 12,
            teamId: 23,
        },
        {
            id: 911,
            name: '채원',
            gender: 'female',
            group: '르세라핌',
            profilePicture:
                'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1720765175316/chaewon.png',
            totalVotes: 11,
            teamId: 23,
        },
        {
            id: 925,
            name: '승관',
            gender: 'male',
            group: '세븐틴',
            profilePicture:
                'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1720765453818/seungkwan.png',
            totalVotes: 11,
            teamId: 23,
        },
        {
            id: 918,
            name: '한유진',
            gender: 'male',
            group: '제로베이스원',
            profilePicture:
                'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1721105780867/hanyujin.png',
            totalVotes: 10,
            teamId: 23,
        },
        {
            id: 922,
            name: '지민',
            gender: 'male',
            group: 'BTS',
            profilePicture:
                'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1721105285424/jimin.png',
            totalVotes: 9,
            teamId: 23,
        },
        {
            id: 1015,
            name: '리즈',
            gender: 'female',
            group: '아이브',
            profilePicture:
                'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1721386297313/liz.png',
            totalVotes: 9,
            teamId: 23,
        },
        {
            id: 1014,
            name: '이서',
            gender: 'female',
            group: '아이브',
            profilePicture:
                'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1721386270834/leeseo.png',
            totalVotes: 8,
            teamId: 23,
        },
    ],
    nextCursor: 1014,
};

export default mockdata;
