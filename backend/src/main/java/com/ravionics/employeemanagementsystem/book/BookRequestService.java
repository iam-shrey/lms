package com.ravionics.employeemanagementsystem.book;

import com.ravionics.employeemanagementsystem.book.Book;
import com.ravionics.employeemanagementsystem.book.BookRequest;
import com.ravionics.employeemanagementsystem.book.RequestStatus;
import com.ravionics.employeemanagementsystem.entities.User;
import com.ravionics.employeemanagementsystem.repositories.BookRepository;
import com.ravionics.employeemanagementsystem.repositories.BookRequestRepository;
import com.ravionics.employeemanagementsystem.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BookRequestService {

    @Autowired
    private BookRequestRepository bookRequestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    // Create a new book request
    @Transactional
    public BookRequest createBookRequest(String userId, Integer bookId) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Book> bookOpt = bookRepository.findById(bookId);

        if (userOpt.isPresent() && bookOpt.isPresent()) {
            BookRequest bookRequest = BookRequest.builder()
                    .user(userOpt.get())
                    .book(bookOpt.get())
                    .status(RequestStatus.PENDING)
                    .requestedAt(new Date())
                    .processedAt(null)
                    .build();

            return bookRequestRepository.save(bookRequest);
        }
        throw new RuntimeException("User or Book not found");
    }

    // Get all book requests (admin only)
    public List<BookRequest> getAllBookRequests() {
        return bookRequestRepository.findAll();
    }

    // Process a book request (admin only)
    @Transactional
    public BookRequest processBookRequest(Long id) {
        Optional<BookRequest> bookRequestOpt = bookRequestRepository.findById(id);
        if (bookRequestOpt.isPresent()) {
            BookRequest bookRequest = bookRequestOpt.get();
            bookRequest.setStatus(RequestStatus.PROCESSED);
            bookRequest.setProcessedAt(new Date());
            return bookRequestRepository.save(bookRequest);
        }
        throw new RuntimeException("BookRequest not found");
    }

    // Cancel a book request (admin or user)
    @Transactional
    public void cancelBookRequest(Long id) {
        Optional<BookRequest> bookRequestOpt = bookRequestRepository.findById(id);
        if (bookRequestOpt.isPresent()) {
            BookRequest bookRequest = bookRequestOpt.get();
            bookRequest.setStatus(RequestStatus.CANCELLED);
            bookRequestRepository.save(bookRequest);
        } else {
            throw new RuntimeException("BookRequest not found");
        }
    }

    public List<BookRequest> getBookRequestsForUser(String userId) {
        return bookRequestRepository.findByUserId(userId);
    }
}
