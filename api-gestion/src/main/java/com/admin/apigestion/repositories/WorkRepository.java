package com.admin.apigestion.repositories;

import com.admin.apigestion.entities.Work;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface WorkRepository extends JpaRepository<Work, Long> {
    Optional<Work> findByName(String work_name);

}
