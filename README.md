# jin-GuestBook

## 프로젝트 구조

jin-guestbook/\
├─ backend/ # Spring Boot\
│ ├─ src/main/java/...\
│ ├─ src/main/resources/\
│ └─ build.gradle\
│
├─ frontend/ # Next.js\
│ ├─ app/\
│ ├─ package.json\
│ └─ tailwind.config.js\
│
└─ docs/\
└─ 02-api-spec.md

## 📅 일차별 진행 계획

### 1일차: 애플리케이션 개발 & 로컬 통합

목표: 로컬 환경에서 백엔드, 프론트엔드, 데이터베이스가 정상적으로 통신

백엔드 (Spring Boot)\
Entity 1개 (Guestbook) 생성\
Controller, Repository 작성\
MySQL 연동 설정\
CORS 설정 (프론트엔드 포트 허용)

프론트엔드 (Next.js)\
app/page.js 하나에 입력 폼과 리스트 구현\
fetch를 통해 백엔드 API 호출\
Tailwind CSS로 간단한 스타일링

### 1일차 산출물 체크리스트

[v] GitHub 리포지토리 생성 및 코드 Push\
[v] Backend/Frontend 폴더 분리\
[v] 로컬에서 데이터 저장/조회 성공 스크린샷\
[v] API 명세서 작성 (docs/02-api-spec.md)

### 2일차: 컨테이너화 & AWS 배포

목표: 내 컴퓨터가 아닌 환경(Docker, AWS)에서 애플리케이션 실행

### 2일차 산출물 체크리스트

[v] Dockerfile 2개 작성 (Backend, Frontend)
[v] docker-compose.yml 작성
[v] 로컬에서 docker-compose up 실행 확인
[v] AWS EC2에 수동 배포 성공
[x] EC2 IP 주소로 서비스 접속 확인

### 3일차: CI/CD 자동화 & 문서화

목표: 코드를 Push하면 자동으로 서버에 반영

3일차 산출물 체크리스트
[v] GitHub Actions 워크플로우 파일 작성
[v] 코드 수정 후 Push → 자동 배포 확인
[ ] 모든 문서 작성 완료
[ ] 회고 문서 작성
