package com.ravionics.employeemanagementsystem.book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/book-requests")
public class BookRequestController {

    @Autowired
    private BookRequestService bookRequestService;

    // Create a new book request
    @PostMapping("/request")
    public BookRequest createBookRequest(@RequestParam String userId, @RequestParam Integer bookId) {
        return bookRequestService.createBookRequest(userId, bookId);
    }

    // Get all book requests (admin only)
    @GetMapping("/all")
    public List<BookRequest> getAllBookRequests() {
        return bookRequestService.getAllBookRequests();
    }

    // Process a book request (admin only)
    @PutMapping("/process/{id}")
    public BookRequest processBookRequest(@PathVariable Long id) {
        return bookRequestService.processBookRequest(id);
    }

    // Cancel a book request (admin or user)
    @DeleteMapping("/cancel/{id}")
    public void cancelBookRequest(@PathVariable Long id) {
        bookRequestService.cancelBookRequest(id);
    }

    @GetMapping("/user/{userId}")
    public List<BookRequest> getBookRequestsForUser(@PathVariable String userId) {
        return bookRequestService.getBookRequestsForUser(userId);
    }
}
