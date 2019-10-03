package com.admin.apigestion.services.dashboard;

import com.admin.apigestion.entities.User;
import com.admin.apigestion.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class DashService implements IDashService{

    private final UserRepository userRepository;

    public DashService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return  userRepository.getAllUserByStatus();
    }
}
