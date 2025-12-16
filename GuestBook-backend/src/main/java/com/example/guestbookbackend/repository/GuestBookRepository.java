package com.example.guestbookbackend.repository;

import com.example.guestbookbackend.entity.GuestBook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestBookRepository extends JpaRepository<GuestBook,Long> {
}
