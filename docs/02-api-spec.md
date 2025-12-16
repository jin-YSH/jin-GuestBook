# Guestbook API 명세서

## 1. 방명록 목록 조회

- **Endpoint:** `/api/guestbooks`
- **Method:** `GET`
- **Request Header:** 없음
- **Request Body:** 없음
- **Response Body:**

```json

  {
    "id": 1,
    "nickname": "철수",
    "content": "첫 번째 방명록입니다.",
    "createdAt": "2025-12-16T06:29:27"
  },
  {
    "id": 2,
    "nickname": "영희",
    "content": "백엔드 공부 중입니다!",
    "createdAt": "2025-12-16T06:29:27"
  }
```

- **Status Code:** 200 OK
- **Description:** 모든 방명록을 조회합니다.

---

## 2. 방명록 등록

- **Endpoint:** `/api/guestbooks`
- **Method:** `POST`
- **Request Header:**
  - Content-Type: application/json
- **Request Body:**

```json
{
  "nickname": "홍길동",
  "content": "새로운 방명록 작성!"
}
```

- **Response Body:**

```json
{
  "id": 11,
  "nickname": "홍길동",
  "content": "새로운 방명록 작성!",
  "createdAt": "2025-12-16T15:55:00"
}
```

- **Status Code:** 200 OK
- **Description:** 방명록을 저장하고 저장된 데이터를 반환합니다.
