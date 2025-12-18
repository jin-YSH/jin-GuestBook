# CI/CD 설명

## 1. GitHub Actions를 사용하는 이유

- 코드 변경 시 자동으로 빌드, 테스트, 배포를 수행할 수 있음
- Docker 이미지 생성 및 AWS EC2 배포까지 연결 가능
- 수동 배포 없이 안정적이고 반복 가능한 배포 프로세스를 구현 가능

## 2. 워크플로우 실행 조건

- main 브랜치에 push 발생 시 자동 실행
- pull request merge 시에도 배포를 위한 빌드 확인 가능
- .github/workflows/prod.yml 파일에 정의된 조건에 따라 실행됨

## 3. 자동화된 단계별 흐름

### 1) Checkout

GitHub Actions가 리포지토리 코드를 가져옴

```bash
name: Checkout repository
uses: actions/checkout@v3
```

### 2) Docker 이미지 빌드

- Backend와 Frontend 각각 빌드
- 멀티스테이지 Dockerfile을 기반으로 빌드 수행

```bash
name: Build Docker images
run: |
docker build -t guestbook-backend ./GuestBook-backend
docker build -t guestbook-frontend ./guestbook-frontend
```

### 3) 테스트 및 검증

- 필요 시 Gradle 테스트 수행 (./gradlew test)
- Frontend는 npm run build로 빌드 검증

### 4) Docker Push (선택적)

- 레지스트리를 사용하는 경우 이미지 Push 수행
- 현재 프로젝트는 AWS EC2에 직접 배포하므로 생략 가능

### 5) AWS EC2 배포

- SSH를 통해 EC2에 접속
- Docker Compose prod.yml 기반으로 컨테이너 실행

```bash
name: Deploy to AWS EC2
run: |
ssh -i "spring-boot-key.pem" ec2-user@$EC2_HOST "
cd ~/guestbook
docker-compose -f prod.yml pull
docker-compose -f prod.yml up -d
"
```

4. 실패했을 때 원인과 해결 과정

SSH 접속 실패: IP 변경, PEM 키 권한 문제, 보안 그룹 미설정
→ IP는 .env 등 환경 변수로 관리, PEM 권한 확인, 보안 그룹 확인

Docker 빌드 실패: 의존성 문제 또는 Dockerfile 문법 오류
→ 로컬에서 사전 빌드 후 오류 수정

컨테이너 실행 실패: 포트 충돌, 환경 변수 미설정
→ docker ps로 포트 확인, .env에서 DB/서버 설정 확인
