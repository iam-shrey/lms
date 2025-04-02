package com.ravionics.employeemanagementsystem.book;

import com.ravionics.employeemanagementsystem.repositories.BookRequestRepository;
import com.ravionics.employeemanagementsystem.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;
    @Autowired
    private UserService userService;
    @Autowired
    private BookRequestRepository bookRequestRepository;

    // Add a new book
    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return bookService.addBook(book);
    }

    // Get all books
    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    // Get a book by ID
    @GetMapping("/{id}")
    public Optional<Book> getBookById(@PathVariable Integer id) {
        return bookService.getBookById(id);
    }

    // Update a book
    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Integer id, @RequestBody Book book) {
        return bookService.updateBook(id, book);
    }

    // Delete a book
    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable Integer id) {
        bookService.deleteBook(id);
        return "Book with ID " + id + " has been deleted.";
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Book>> getBooksByUser(@PathVariable String userId) {
        List<Book> books = bookService.getBooksByUser(userId);
        return ResponseEntity.ok(books);
    }

    @PutMapping("/user/return")
    public ResponseEntity<String> returnBook(@RequestParam String userId, @RequestParam Integer bookId) {
        Book book = bookService.getBookById(bookId).get();
        book.setQuantity(book.getQuantity() + 1);
        List<BookRequest> request = bookRequestRepository.findByUserIdAndBookId(userId, bookId);
        BookRequest r = request.stream().max(Comparator.comparing(BookRequest::getRequestedAt)).get();
        r.setStatus(RequestStatus.RETURNED);
        r.setReturnedAt(new Date());
        bookRequestRepository.save(r);
        bookService.updateBook(bookId, book);
        userService.returnBook(book, userId);
        return ResponseEntity.ok("Book with ID " + bookId + " has been returned.");
    }
}
