package com.ravionics.employeemanagementsystem.services;

import com.ravionics.employeemanagementsystem.book.RequestStatus;
import com.ravionics.employeemanagementsystem.entities.Role;
import com.ravionics.employeemanagementsystem.entities.User;
import com.ravionics.employeemanagementsystem.repositories.BookRepository;
import com.ravionics.employeemanagementsystem.repositories.BookRequestRepository;
import com.ravionics.employeemanagementsystem.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookRequestRepository bookRequestRepository;

    public Map<String, Integer> getMetrics() {

        int totalUsers = (int) userRepository.countByRole(Role.USER);
        int totalBooks = (int) bookRepository.count();
        int pendingRequests = (int) bookRequestRepository.countByStatus(RequestStatus.PENDING);

        Map<String, Integer> metrics = new HashMap<>();
        metrics.put("totalUsers", totalUsers);
        metrics.put("totalBooks", totalBooks);
        metrics.put("pendingRequests", pendingRequests);

        return metrics;
    }

    public User updateEmployee(String id, User updatedEmployee) {
        return userRepository.findById(id)
                .map(employee -> {
                    employee.setFirstName(updatedEmployee.getFirstName());
                    employee.setLastName(updatedEmployee.getLastName());
                    employee.setEmail(updatedEmployee.getEmail());
                    employee.setPhoneNumber(updatedEmployee.getPhoneNumber());
                    return userRepository.save(employee);
                })
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
    }
}
