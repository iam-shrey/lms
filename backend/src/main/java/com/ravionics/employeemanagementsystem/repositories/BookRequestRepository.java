package com.ravionics.employeemanagementsystem.repositories;

import com.ravionics.employeemanagementsystem.book.BookRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRequestRepository extends JpaRepository<BookRequest, Long> {
    List<BookRequest> findByUserId(String userId);
}
