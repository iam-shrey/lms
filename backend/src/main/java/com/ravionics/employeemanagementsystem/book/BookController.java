package com.ravionics.employeemanagementsystem.book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

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
}
