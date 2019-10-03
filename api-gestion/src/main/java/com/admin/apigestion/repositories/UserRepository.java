package com.admin.apigestion.repositories;

import com.admin.apigestion.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);

    @Query("select u FROM User u WHERE u.status = 0")
    List<User> getAllUserByStatus();

}
