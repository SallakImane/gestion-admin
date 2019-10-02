package com.admin.apigestion.services.auth;

import com.admin.apigestion.entities.User;
import com.admin.apigestion.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;


@Service
@Slf4j
public class AuthService implements IAuthService{
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User register( Map<String, String> map) throws Exception {
        if(userRepository.findByEmail(map.get("email")).isPresent()){
            log.error("Email already exist");
            throw new Exception("Email address already exist. Please Log in with your existing email.");
        }
        User newUser = User.builder()
                .firstName(map.get("firstName"))
                .lastName(map.get("lastName"))
                .email(map.get("email"))
                .password(passwordEncoder.encode(map.get("password")))
                .phone(map.get("phone"))
                .build();
        newUser.setStatus(0);
        newUser =userRepository.save(newUser);
        return newUser;
    }
}
