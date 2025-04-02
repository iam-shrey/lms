package com.ravionics.employeemanagementsystem.book;

import com.ravionics.employeemanagementsystem.book.Book;
import com.ravionics.employeemanagementsystem.book.RequestStatus;
import com.ravionics.employeemanagementsystem.entities.User;
import jakarta.persistence.*;
import lombok.*;
import java.util.Date;
import java.util.concurrent.TimeUnit;

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

    private int fineAmount;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date requestedAt;

    @Temporal(TemporalType.TIMESTAMP)
    private Date processedAt;

    @Temporal(TemporalType.TIMESTAMP)
    private Date returnedAt;

    public void calculateFine() {

            long diffInMillis = new Date().getTime() - processedAt.getTime();
            long diffInDays = TimeUnit.MILLISECONDS.toDays(diffInMillis);


            if (diffInDays > 15) {
                fineAmount = (int) (10 * (diffInDays - 15));
            } else {
                fineAmount = 0;
            }

    }
}

