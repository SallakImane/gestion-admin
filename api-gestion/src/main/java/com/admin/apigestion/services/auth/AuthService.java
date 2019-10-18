package com.admin.apigestion.services.auth;

import com.admin.apigestion.entities.Role;
import com.admin.apigestion.entities.User;
import com.admin.apigestion.repositories.RoleRepository;
import com.admin.apigestion.repositories.UserRepository;
import com.admin.apigestion.services.mailing.MailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;


@Service
@Slf4j
public class AuthService implements IAuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final MailService mailService;

    public AuthService(UserRepository userRepository,RoleRepository roleRepository, PasswordEncoder passwordEncoder,MailService mailService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailService = mailService;
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

    @Override
    public void forgotPassword(String username) throws Exception {
        Optional<User> optionalUser = userRepository.findByEmail(username);
        if(optionalUser.isPresent()){
            User tempUser = optionalUser.get();
            tempUser.setResetPasswordToken(UUID.randomUUID().toString());
            log.info("Generating TOKEN ... => " + tempUser.getResetPasswordToken());
            tempUser.setResetPasswordSentDate(LocalDateTime.now());
            mailService.sendResetPasswordMail(tempUser.getEmail(), tempUser.getResetPasswordToken());
            userRepository.save(tempUser);
            log.info("Done forgot password request.");
        } else {
            log.error("User not found");
            throw new Exception("Email address not found.");
        }

    }

    @Override
    public void changePassword(String token, String newPassword) throws Exception {
        Optional<User> optionalUser = userRepository.findByResetPasswordToken(token);
        if (optionalUser.isPresent()) {
            User tempUser = optionalUser.get();
            if (tempUser.getResetPasswordSentDate().plusHours(1).isBefore(LocalDateTime.now())) {
                log.error("Expired token (lifecycle 1 Hour) ... User '" + tempUser.getEmail());
                tempUser.setResetPasswordToken(null);
                tempUser.setResetPasswordSentDate(null);
                userRepository.save(tempUser);
                throw new Exception("Reset link has expired");
            }
            tempUser.setPassword(passwordEncoder.encode(newPassword));
            tempUser.setResetPasswordToken(null);
            tempUser.setPasswordChangedDate(LocalDateTime.now());
            userRepository.save(tempUser);
            mailService.sendPasswordChangedNotification(tempUser.getEmail());
            log.info("Password changed user '" + tempUser.getEmail() + "' success !");
        } else {
            log.error("User token not found.");
            throw new Exception("Reset link has expired");
        }
    }
}
