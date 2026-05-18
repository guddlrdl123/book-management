package com.example.bookmanagementapi;


import com.example.bookmanagementapi.entity.Book;
import com.example.bookmanagementapi.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;

// 애플리케이션 실행 시 초기 데이터 삽입을 위한 클래스

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final BookRepository bookRepository;

    @Override
    public void run(String... args) {
        bookRepository.saveAll(List.of(
                Book.builder()
                        .title("클린 코드")
                        .author("로버트 C. 마틴")
                        .price(28000)
                        .available(true)
                        .purchasable(true)
                        .coverUrl("https://image.yes24.com/goods/11681152/XL")
                        .build(),
                Book.builder()
                        .title("객체지향의 사실과 오해")
                        .author("조영호")
                        .price(26000)
                        .available(true)
                        .purchasable(true)
                        .coverUrl("https://image.yes24.com/goods/18249021/XL")
                        .build(),
                Book.builder()
                        .title("이펙티브 자바 3판")
                        .author("조슈아 블로크")
                        .price(36000)
                        .available(false)
                        .purchasable(true)
                        .coverUrl("https://image.yes24.com/goods/65551284/XL")
                        .build(),
                Book.builder()
                        .title("스프링 부트와 AWS로 혼자 구현하는 웹 서비스")
                        .author("이동욱")
                        .price(32000)
                        .available(true)
                        .purchasable(false)
                        .coverUrl("https://image.yes24.com/goods/83849117/XL")
                        .build(),
                Book.builder()
                        .title("모던 자바스크립트 Deep Dive")
                        .author("이웅모")
                        .price(45000)
                        .available(true)
                        .purchasable(true)
                        .coverUrl("https://image.yes24.com/goods/92742567/XL")
                        .build(),
                Book.builder()
                        .title("혼자 공부하는 컴퓨터 구조+운영체제")
                        .author("강민철")
                        .price(28000)
                        .available(false)
                        .purchasable(true)
                        .coverUrl("https://image.yes24.com/goods/111378840/XL")
                        .build(),
                Book.builder()
                        .title("데이터베이스 개론")
                        .author("김연희")
                        .price(34000)
                        .available(true)
                        .purchasable(false)
                        .coverUrl("https://image.yes24.com/goods/117430818/XL")
                        .build(),
                Book.builder()
                        .title("그림으로 배우는 HTTP & Network Basic")
                        .author("우에노 센")
                        .price(26000)
                        .available(true)
                        .purchasable(true)
                        .coverUrl("https://image.yes24.com/goods/15894097/XL")
                        .build()
        ));
    }
}
