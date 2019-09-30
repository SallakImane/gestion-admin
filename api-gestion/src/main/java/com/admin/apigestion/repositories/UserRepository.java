package com.admin.apigestion.repositories;

import com.admin.apigestion.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
