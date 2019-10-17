package com.admin.apigestion.services.auth;

import com.admin.apigestion.entities.Role;
import com.admin.apigestion.entities.User;
import com.admin.apigestion.repositories.RoleRepository;
import com.admin.apigestion.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;


@Service
@Slf4j
public class AuthService implements IAuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    public AuthService(UserRepository userRepository,RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User register( Map<String, String> map) throws Exception {
        if(userRepository.findByEmail(map.get("email")).isPresent()){
            throw new Exception("Email address already exist. Please Log in with your existing email.");
        }
        Optional<Role> op_role = roleRepository.findByName("ROLE_USER");
        Role role = op_role.orElseGet(() -> roleRepository.save(Role.builder().name("ROLE_USER").build()));

        User newUser = User.builder()
                .firstName(map.get("firstName"))
                .lastName(map.get("lastName"))
                .email(map.get("email"))
                .password(passwordEncoder.encode(map.get("password")))
                .phone(map.get("phone"))
                .role(role)
                .build();
        newUser.setStatus(1);
        newUser =userRepository.save(newUser);
        return newUser;
    }
}
