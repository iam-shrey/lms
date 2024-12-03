package com.ravionics.employeemanagementsystem.book;

import com.ravionics.employeemanagementsystem.entities.User;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String title;

    private String author;

    private String publisher;

    private String isbn;

    private Integer quantity;

    private boolean available;

    private LocalDate publishDate;

    @ManyToOne
    private User user;

}
