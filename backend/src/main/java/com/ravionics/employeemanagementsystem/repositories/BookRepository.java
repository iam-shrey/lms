package com.ravionics.employeemanagementsystem.repositories;

import com.ravionics.employeemanagementsystem.book.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {
    long count();
}
