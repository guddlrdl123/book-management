CREATE TABLE IF NOT EXISTS books (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    price INT,
    available BOOLEAN DEFAULT TRUE,
    purchasable BOOLEAN DEFAULT TRUE,
    cover_url VARCHAR(500)
);

INSERT IGNORE INTO books (id, title, author, price, available, purchasable) VALUES
(1, '클린 코드', '로버트 C. 마틴', 28000, true, true),
(2, '객체지향의 사실과 오해', '조영호', 26000, true, true),
(3, '이펙티브 자바', '조슈아 블로크', 36000, false, true);