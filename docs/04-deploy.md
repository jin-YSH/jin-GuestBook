# AWS 배포 설명

## 1. EC2를 선택한 이유

OS: Amazon Linux 2023

인스턴스 타입: t3.micro

선택 이유: 비용 효율적이고, Docker 환경 구성 및 소규모 서비스 배포에 적합.

## 2. 보안 그룹 설정 이유

### 포트 프로토콜 목적

- 22 TCP SSH 접속용
- 80 TCP HTTP 접속용, 브라우저에서 서비스 확인
- 3000 TCP 프론트엔드 개발 서버 접근용
- 8080 TCP 백엔드(Spring Boot) 서버 접근용

모든 포트의 소스는 0.0.0.0/0로 열려 있으며, 외부 어디서나 접근 가능하도록 설정.

## 3. 서버에서 실행한 명령 흐름

### EC2 인스턴스 접속

인스턴스 IP 주소가 변경될 수 있으므로, .env 또는 별도의 설정 파일에서 IP를 관리하도록 권장
예시: EC2_HOST=54.206.21.97

```bash
ssh -i "spring-boot-key.pem" ec2-user@$EC2_HOST
```

### Docker 및 Docker Compose 설치

```bash
sudo amazon-linux-extras enable docker
sudo yum install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user
```

### Git 또는 로컬 소스 복사 후 Docker 이미지 빌드

```bash
docker build -t guestbook-backend ./GuestBook-backend
docker build -t guestbook-frontend ./guestbook-frontend
```

### Docker 컨테이너 실행 (개별 또는 Compose 사용)

```bash
docker run -p 8080:8080 guestbook-backend
docker run -p 3000:3000 guestbook-frontend

또는 prod.yml 기반 Docker Compose 실행

docker-compose -f prod.yml up -d
```

## 4. 배포 후 접속 방식

### SSH 접속

IP 주소 변경을 고려하여, 설정 파일에서 관리된 IP를 사용

```bash
ssh -i "spring-boot-key.pem" ec2-user@$EC2_HOST
```

### 브라우저를 통한 서비스 접속

- 백엔드: http://$EC2_HOST:8080/guestbooks
- 프론트엔드: http://$EC2_HOST:3000
- 퍼블릭 DNS 사용 가능: http://ec2-$EC2_HOST.ap-southeast-2.compute.amazonaws.com:3000

IP가 변경될 경우, .env 또는 설정 파일의 EC2_HOST만 수정하면 코드/접속 경로를 일괄적으로 갱신 가능
