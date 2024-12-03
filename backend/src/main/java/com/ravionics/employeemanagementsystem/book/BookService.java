package com.ravionics.employeemanagementsystem.book;

import com.ravionics.employeemanagementsystem.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    // Add a new book
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    // Get all books
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // Get a book by ID
    public Optional<Book> getBookById(Integer id) {
        return bookRepository.findById(id);
    }

    // Update a book
    public Book updateBook(Integer id, Book updatedBook) {
        return bookRepository.findById(id).map(book -> {
            book.setTitle(updatedBook.getTitle());
            book.setAuthor(updatedBook.getAuthor());
            book.setPublisher(updatedBook.getPublisher());
            book.setIsbn(updatedBook.getIsbn());
            book.setQuantity(updatedBook.getQuantity());
            book.setAvailable(updatedBook.isAvailable());
            book.setPublishDate(updatedBook.getPublishDate());
            return bookRepository.save(book);
        }).orElseThrow(() -> new RuntimeException("Book not found with ID: " + id));
    }

    // Delete a book
    public void deleteBook(Integer id) {
        bookRepository.deleteById(id);
    }

    public List<Book> getBooksByUser(String userId) {
        return bookRepository.findByUserId(userId);
    }
}
