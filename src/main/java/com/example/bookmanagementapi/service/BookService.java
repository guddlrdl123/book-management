package com.example.bookmanagementapi.service;


import com.example.bookmanagementapi.dto.BookDto;
import com.example.bookmanagementapi.entity.Book;
import com.example.bookmanagementapi.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookService {

    // Repository 주입
    private final BookRepository bookRepository;

    // CRUD + 검색 로직 구현
    public List<BookDto> getAllBooks() {
        return bookRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    // 단건 조회
    public BookDto getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found: " + id));
        return toDto(book);
    }

    // 등록
    public BookDto createBook(BookDto dto) {
        Book book = Book.builder()
                .title(dto.getTitle())
                .author(dto.getAuthor())
                .price(dto.getPrice())
                .available(dto.getAvailable() != null ? dto.getAvailable() : true)
                .purchasable(dto.getPurchasable() != null ? dto.getPurchasable() : true)
                .coverUrl(dto.getCoverUrl())
                .build();
        return toDto(bookRepository.save(book));
    }

    // 수정
    public BookDto updateBook(Long id, BookDto dto) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found: " + id));
        book.setTitle(dto.getTitle());
        book.setAuthor(dto.getAuthor());
        book.setPrice(dto.getPrice());
        book.setAvailable(dto.getAvailable());
        book.setPurchasable(dto.getPurchasable());
        book.setCoverUrl(dto.getCoverUrl());
        return toDto(bookRepository.save(book));
    }

    // 삭제
    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) throw new RuntimeException("Book not found: " + id);
        bookRepository.deleteById(id);
    }

    // 검색
    public List<BookDto> searchByTitle(String title) {
        return bookRepository.findByTitleContainingIgnoreCase(title).stream()
                .map(this::toDto).collect(Collectors.toList());
    }

    // Entity -> DTO 변환 메서드
    private BookDto toDto(Book book) {
        return BookDto.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .price(book.getPrice())
                .available(book.getAvailable())
                .purchasable(book.getPurchasable())
                .coverUrl(book.getCoverUrl())
                .build();
    }
}
