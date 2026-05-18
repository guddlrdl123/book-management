package com.example.bookmanagementapi.controller;

import com.example.bookmanagementapi.dto.BookDto;
import com.example.bookmanagementapi.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    private final BookService bookService;

    // GET /api/books — 전체 목록 조회 (검색 파라미터 포함)
    @GetMapping
    public ResponseEntity<List<BookDto>> getBooks(
            @RequestParam(required = false) String title) {
        if (title != null && !title.isBlank()) {
            return ResponseEntity.ok(bookService.searchByTitle(title));
        }
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    // GET /api/books/{id} — 단건 조회
    @GetMapping("/{id}")
    public ResponseEntity<BookDto> getBook(@PathVariable Long id) {
        return ResponseEntity.ok(bookService.getBookById(id));
    }

    // POST /api/books — 도서 등록
    @PostMapping
    public ResponseEntity<BookDto> createBook(@RequestBody BookDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bookService.createBook(dto));
    }

    // PUT /api/books/{id} — 도서 수정
    @PutMapping("/{id}")
    public ResponseEntity<BookDto> updateBook(
            @PathVariable Long id,
            @RequestBody BookDto dto) {
        return ResponseEntity.ok(bookService.updateBook(id, dto));
    }

    // DELETE /api/books/{id} — 도서 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
}
