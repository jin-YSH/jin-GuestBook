package com.example.guestbookbackend.controller;

import com.example.guestbookbackend.entity.GuestBook;
import com.example.guestbookbackend.repository.GuestBookRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guestbooks")
@CrossOrigin(origins = "http://localhost:3000")
public class GuestBookController {
    private final GuestBookRepository guestBookRepository;

    public GuestBookController(GuestBookRepository guestBookRepository) {
        this.guestBookRepository = guestBookRepository;
    }

    @GetMapping
    public List<GuestBook> getGuestBooks(){
        return guestBookRepository.findAll();
    }

    @PostMapping
    public GuestBook createGuestBook(@RequestBody GuestBook guestBook){
        return guestBookRepository.save(guestBook);
    }
}
