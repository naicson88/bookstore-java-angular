package com.alan.onlinebookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alan.onlinebookstore.entity.BookCategory;

public interface BookCategoryRepository extends JpaRepository<BookCategory, Long> {

}
