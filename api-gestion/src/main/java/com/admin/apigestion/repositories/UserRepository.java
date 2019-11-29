package com.admin.apigestion.repositories;

import com.admin.apigestion.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);

    @Query("select u FROM User u WHERE u.status = 1")
    List<User> getAllUserByStatus();

    Optional<User> findByResetPasswordToken(String token);

    @Query("SELECT u FROM User u WHERE u.email = (:username)")
    User findByUsernamePrincipal(@Param("username") String username);
}
