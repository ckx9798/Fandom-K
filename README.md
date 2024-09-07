# Fondom-K

![image](https://github.com/user-attachments/assets/f5fa4999-693e-437e-baf1-50458ee29155)

<br/>

## 배포 사이트

https://fandom-k-9-4.netlify.app/

<br/>

# 웹 서비스 소개

-   'Fandom-K'는 **아이돌 조공 플랫폼**입니다.
-   크레딧을 충전하여 아이돌에게 후원과 인기 투표를 할 수 있습니다.
-   모금된 크레딧과 아이돌 인기 순위를 실시간으로 확인 할 수 있습니다.
-   관심있는 아이돌을 마이페이지에서 팔로잉 할 수 있습니다.

<br/>

# 개발 팀 소개

|![image](https://github.com/user-attachments/assets/4241e134-685a-46a4-879a-d45061f775ad)|![image](https://github.com/user-attachments/assets/520afd17-12e7-488f-a0cc-766a77f8e1e9)|![image](https://github.com/user-attachments/assets/b34a97fa-0a95-4e53-86bb-d44b965857dc)|![image](https://github.com/user-attachments/assets/47322861-d05f-4f36-b25f-b4b06205ea18)|![image](https://github.com/user-attachments/assets/9a601237-1ce2-4cb2-b19d-f5fd498cac50)|
|---|---|---|---|---|
| 김민준 | 박문균 | 김충오 | 박상욱 | 문창기 |
|-  Project leader로서 팀 운영<br/>- List 페이지의 이달의 차트 기능 구현<br/>- 아이돌 프로필 컴포넌트 제작|- 랜딩 페이지 구현<br/>- 버튼 컴포넌트 제작<br/>- My 페이지 아이돌 추가,삭제  구현<br/>- My 페이지 무한스크롤 기능 구현<br/>- 헤더 일부 수정|- List 페이지의 조공 컴포넌트 구현<br/>- API 세팅<br/>- List 페이지 무한스크롤 기능 구현<br/>- 아이돌 데이터 추가<br/>- GitHub 레포지토리 세팅|- 헤더 컴포넌트 제작<br/>- My 페이지 제작<br/>- 아이돌 데이터 추가<br/>- PPT 제작|- 모달 컴포넌트 제작<br/>- List 페이지 크레딧 컴포넌트 제작<br/>- 노션의 트러블슈팅 업데이트 <br/>- 아이돌 데이터 추가<br/>- 발표 |

<br/>

# 기술 스택

|<img src="https://github.com/user-attachments/assets/215587a1-fb56-4dfd-87c4-5bb85517017a" width='100'/>|<img src="https://github.com/user-attachments/assets/ddf2f58e-6d06-4de1-8cda-d7d0660054f4" width='100'/>|<img src="https://github.com/user-attachments/assets/68263649-2ef8-46ae-82b5-51c9f617b7e6" width="100" /> |
|:---:|:---:|:---:|
| JavaScript | HTML | CSS |

<br/>

|<img src="https://github.com/user-attachments/assets/bbc20c4a-359b-4b5b-b416-e9caa4ecfff2" width="100" />|<img src="https://github.com/user-attachments/assets/140d878b-63b4-4236-8a1a-8a9b22423ce9" width='100'/>|
|:---:|:---:|
|Git|GitHub|

<br/>

|<img src="https://github.com/user-attachments/assets/4c914f4d-fa28-4789-beb0-25a383f0c5c0" width="100" /> |<img src="https://github.com/user-attachments/assets/51bf9b58-75c7-41f4-8f17-554ae03ef51d" width='100'/>|<img src="https://github.com/user-attachments/assets/6dde6a31-33dd-4817-b2ff-5d7a83adc132" width='100'/>|
|:---:|:---:|:---:|
|React|Vite|React-Router|

<br/>

# 페이지 기능

### 랜딩 페이지

-   '지금 시작하기' 버튼 클릭시 , localStorage 초기화하고 List 페이지로 이동
-   아래로 스크롤 시, 애니메이션 기능 구현

### List 페이지

-   '로고' 클릭 시 페이지 새로고침
-   상단의 프로필 이미지를 클릭시 `/mypage` 로 이동합니다.
-   크레딧 충전
    -   크레딧은 localstorage로 관리
    -   '충전하기' 버튼을 클릭 시 충전하기 모달창으로 이동
-   아이돌 후원하기
    -   PC에서 후원 리스트는 좌/우측 버튼 클릭 시 다음 순서의 후원 리스트가 보임
    -   Tablet, Mobile 에서 터치 스크롤
    -   '후원하기' 버튼을 누르면 해당 아이돌을 후원할 수 있는 모달창으로 이동
-   이달의 차트

    -   여자 아이돌, 남자 아이돌 탭 클릭 시, 해당 성별에 맞는 아이돌 목록을 투표가 많은 순으로 보여줌
    -   ‘차트 투표하기’ 버튼 클릭 시 투표하기 모달창으로 이동

-   크레딧 충전 모달
    -   충전할 금액 선택 후 “충전하기”버튼 클릭 시 localstorage로 관리되는 크레딧 충전
-   후원하기 모달
    -   ‘후원하기’ 버튼 클릭 시 후원 완료
    -   후원한 만큼 localStorage에서 관리되는 크레딧 차감
-   투표 모달
    -   크레딧을 차감하여 선택한 아이돌에 투표

### My 페이지

-   무한스크롤을 이용하여 아이돌 목록 데이터 로딩
-   전체, 남자, 여자 아이돌을 분류하는 기능
-   아이돌 목록에서 한 명 또는 여러 명의 아이돌을 관심 아이돌로 추가 및 삭제

<br/>

# 데모영상

-   랜딩페이지

![랜딩페이지](https://github.com/user-attachments/assets/8846da6a-ea36-4b09-bf28-209165f41c6d)


-   크레딧 충전하기

![충전하기](https://github.com/user-attachments/assets/06f46290-5309-42ea-9ed3-c2460291bdb2)


-   충전된 크레딧으로 후원하기

![후원하기](https://github.com/user-attachments/assets/6cf4cda3-214a-46c7-a053-bb5f437e754b)


-   투표 순위를 볼 수 있는 이달의 차트

![차트](https://github.com/user-attachments/assets/4d57f714-d87d-4e04-817a-75c5d9804587)


-   충전된 크레딧으로 투표하기

![투표하기](https://github.com/user-attachments/assets/72d1e1ba-47e7-4d93-8dff-a584dd9c6c8a)


-   관심있는 아이돌을 추가 할 수 있는 마이페이지

![마이페이지](https://github.com/user-attachments/assets/07727ce9-bcf6-4246-9acf-2be1a50425f0)

![마이페이지 반응형](https://github.com/user-attachments/assets/d8d47cf5-2f18-4947-8848-4b707acdd85b)

  
-   데이터 받아 오기 실패 시 에러메시지 출력

![오류](https://github.com/user-attachments/assets/c5b79c83-ea75-4b82-82eb-4012d65af6ca)

<br/>
