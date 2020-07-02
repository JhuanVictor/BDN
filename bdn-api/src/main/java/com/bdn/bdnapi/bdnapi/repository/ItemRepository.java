package com.bdn.bdnapi.bdnapi.repository;

import com.bdn.bdnapi.bdnapi.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> { }
