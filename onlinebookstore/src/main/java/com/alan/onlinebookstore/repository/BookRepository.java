package com.alan.onlinebookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alan.onlinebookstore.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
		
}
