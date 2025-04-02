package com.ravionics.employeemanagementsystem.repositories;

import com.ravionics.employeemanagementsystem.book.BookRequest;
import com.ravionics.employeemanagementsystem.book.RequestStatus;
import com.ravionics.employeemanagementsystem.entities.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookRequestRepository extends JpaRepository<BookRequest, Long> {
    List<BookRequest> findByUserId(String userId);
    List<BookRequest> findByUserIdAndBookId(String userId, Integer bookId);
    List<BookRequest> findByStatusIn(List<RequestStatus> statuses);
    long countByStatus(RequestStatus status);
    long countByStatusAndUser(RequestStatus status, User user);

    @Modifying
    @Transactional
    @Query("DELETE FROM BookRequest br WHERE br.book.id = :bookId")
    void deleteAllByBookId(Integer bookId);
}
