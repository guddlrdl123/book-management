# 📚 도서 관리 시스템 (Book Management System)

소규모 서점의 온라인 도서 관리 풀스택 애플리케이션

## 기술 스택

| 구분 | 기술 |
|------|------|
| 백엔드 | Spring Boot 3.x, Spring Data JPA, H2 DB, Lombok |
| 프론트엔드 | Next.js 15 (App Router), TypeScript, CSS Variables |
| Java | 21 (LTS) |

## API 엔드포인트

| 메서드 | URL | 설명 |
|--------|-----|------|
| GET | /api/books | 전체 도서 목록 조회 |
| GET | /api/books?title={keyword} | 제목 키워드 검색 |
| GET | /api/books/{id} | 단건 도서 조회 |
| POST | /api/books | 도서 등록 |
| PUT | /api/books/{id} | 도서 수정 |
| DELETE | /api/books/{id} | 도서 삭제 |

## 실행 방법

### 백엔드 (포트 8080)
```bash
cd book-management-api
./gradlew bootRun
```
H2 콘솔: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:bookdb`

### 프론트엔드 (포트 3000)
```bash
cd book-management-front
npm install
npm run dev
```

## 프로젝트 구조

### 백엔드
```
src/main/java/com/yourname/bookapi/
├── BookApiApplication.java
├── DataInitializer.java       ← 샘플 데이터 초기화
├── controller/BookController.java
├── service/BookService.java
├── repository/BookRepository.java
├── entity/Book.java
└── dto/BookDto.java
```

### 프론트엔드
```
src/
├── app/
│   ├── layout.tsx             ← 공통 헤더/푸터
│   ├── page.tsx               ← 도서 목록 (RSC)
│   ├── loading.tsx            ← 스켈레톤 로딩
│   ├── error.tsx              ← 에러 처리
│   ├── not-found.tsx          ← 404 처리
│   ├── books/[id]/page.tsx    ← 도서 상세 (RSC)
│   ├── books/[id]/edit/page.tsx ← 도서 수정 (RCC)
│   └── register/page.tsx      ← 도서 등록 (RCC)
└── components/
    ├── BookCard.tsx
    ├── BookList.tsx            ← RSC
    ├── BookListSkeleton.tsx    ← 스켈레톤 UI
    ├── SearchBar.tsx           ← RCC
    └── DeleteButton.tsx        ← RCC
```

## 가산점 구현 항목

-  PUT /api/books/{id} 수정 기능
-  도서 검색 기능 (title keyword, Query Param)
-  Suspense + Skeleton UI (animate-pulse 대응)
