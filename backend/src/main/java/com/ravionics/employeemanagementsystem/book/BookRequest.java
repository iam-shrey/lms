package com.ravionics.employeemanagementsystem.book;

import com.ravionics.employeemanagementsystem.book.Book;
import com.ravionics.employeemanagementsystem.book.RequestStatus;
import com.ravionics.employeemanagementsystem.entities.User;
import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Entity
@Table(name = "book_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Book book;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RequestStatus status;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date requestedAt;

    @Temporal(TemporalType.TIMESTAMP)
    private Date processedAt;
}

