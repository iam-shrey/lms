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
import java.util.concurrent.TimeUnit;

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
//    public void calculateFine(BookRequest bookRequest) {
//
//        long diffInMillis = new Date().getTime() - bookRequest.getProcessedAt().getTime();
//        long diffInDays = TimeUnit.MILLISECONDS.toDays(diffInMillis);
//
//
//        if (diffInDays > 15) {
//            bookRequest.setFineAmount((int) (10 * (diffInDays - 15)));
//        } else {
//            bookRequest.setFineAmount(0);
//        }
//
//    }

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
            Book book = bookRequest.getBook();
            book.setQuantity(book.getQuantity() - 1);
            bookRequest.setBook(book);
            User u = bookRequest.getUser();
            u.getBooks().add(book);
            userRepository.save(u);
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
            bookRequest.setProcessedAt(new Date());
            bookRequestRepository.save(bookRequest);
        } else {
            throw new RuntimeException("BookRequest not found");
        }
    }

    public List<BookRequest> getBookRequestsForUser(String userId) {
        return bookRequestRepository.findByUserId(userId);
    }

    public List<BookRequest> getAllBookRequestsAndUpdateFines() {
        List<BookRequest> bookRequests = bookRequestRepository.findByStatusIn(
                List.of(RequestStatus.PROCESSED, RequestStatus.RETURNED)
        );

        for (BookRequest bookRequest : bookRequests) {
            bookRequest.calculateFine(); // Update fine for each request
        }

        bookRequestRepository.saveAll(bookRequests);

        return bookRequests; // Return the updated list
    }
}
