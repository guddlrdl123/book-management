package com.example.bookmanagementapi.dto;

import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookDto {
    private Long id;
    private String title;
    private String author;
    private Integer price;
    private Boolean available;
    private Boolean purchasable;
    private String coverUrl;
}
