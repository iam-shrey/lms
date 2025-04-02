package com.ravionics.employeemanagementsystem.services;

import com.ravionics.employeemanagementsystem.book.Book;
import com.ravionics.employeemanagementsystem.book.RequestStatus;
import com.ravionics.employeemanagementsystem.entities.Role;
import com.ravionics.employeemanagementsystem.entities.User;
import com.ravionics.employeemanagementsystem.repositories.BookRepository;
import com.ravionics.employeemanagementsystem.repositories.BookRequestRepository;
import com.ravionics.employeemanagementsystem.repositories.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    private BookRepository bookRepository;

    private BookRequestRepository bookRequestRepository;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, BookRepository bookRepository, BookRequestRepository bookRequestRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.bookRepository = bookRepository;
        this.bookRequestRepository = bookRequestRepository;
    }

    @Override
    public User saveUser(User user) {
        if(user.getId()==null)user.setId(UUID.randomUUID().toString());
        if(user.getPassword()==null)user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User User) {
        return userRepository.save(User);
    }

    @Override
    public User getUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    public User getUserById(String id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElseThrow(() -> new RuntimeException("User not found with email: " + id));
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User deleteUserById(String id) {
        User user = getUserById(id);
        userRepository.deleteById(id);
        return user;
    }



    @Override
    public String currentLoggedInUser(Authentication loggedInUser) {
        User user=(User) loggedInUser.getPrincipal();
        return user.getFirstName();
    }

    @Override
    public void returnBook(Book book, String userId) {
        User u = userRepository.findById(userId).get();
        u.getBooks().remove(book);
        userRepository.save(u);
    }

    public void uploadProfilePicture(String userId, MultipartFile file) throws IOException {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.setProfilePicture(file.getBytes());
        userRepository.save(user);
    }

    public byte[] getProfilePicture(String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found"));
        return user.getProfilePicture();
    }

    public Map<String, Integer> getMetrics(String username) {

        User user = userRepository.findByEmail(username).orElseThrow(() -> new RuntimeException("User not found"));
        int totalIssuedBooks = (int) user.getBooks().size();
        int totalBooks = (int) bookRepository.count();
        int pendingRequests = (int) bookRequestRepository.countByStatusAndUser(RequestStatus.PENDING, user);

        Map<String, Integer> metrics = new HashMap<>();
        metrics.put("issuedBooks", totalIssuedBooks);
        metrics.put("totalBooks", totalBooks);
        metrics.put("totalRequests", pendingRequests);

        return metrics;
    }

}
