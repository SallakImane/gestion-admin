package com.admin.apigestion.controllers;


import com.admin.apigestion.services.auth.AuthService;
import com.admin.apigestion.utils.models.CustomResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@Slf4j
@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/public")
public class AuthController {

    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    @GetMapping(path = "/whoami")
    public ResponseEntity<?> privateHome(Principal principal) {
        return ResponseEntity.ok().body(Map.of("whoami", "anonym"));
    }
    /*Method for Register User*/
    @PostMapping(value = "/auth/registerForm")
    public ResponseEntity<?> register(@RequestBody Map<String, String> post) {
        if (post != null) {
            try {
                log.info(post.toString());
                authService.register(post);
                return ResponseEntity.status(HttpStatus.CREATED).body(
                        CustomResponse.builder()
                                .status(HttpStatus.CREATED.value())
                                .error(false)
                                .errorType("success")
                                .message("Your Account was created successfully.")
                                .build()
                );
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.ACCEPTED).body(
                        CustomResponse.builder()
                                .status(HttpStatus.ACCEPTED.value())
                                .error(true)
                                .errorType("danger")
                                .message(e.getMessage())
                                .build()
                );
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    /*Method for Forgot Password*/
    @PostMapping(value = "/auth/forgotPassword")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> post){
        log.info("post");
        log.info(post.toString());
        if (post.get("username") != null) {
            try {
                authService.forgotPassword(post.get("username"));
                return ResponseEntity.status(HttpStatus.OK).body(
                        CustomResponse.builder()
                                .status(HttpStatus.OK.value())
                                .error(false)
                                .errorType("success")
                                .message("We have sent a password reset link to your username address.")
                                .build()
                );
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        CustomResponse.builder()
                                .status(HttpStatus.OK.value())
                                .error(true)
                                .errorType("danger")
                                .message(e.getMessage())
                                .build()
                );
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    /*Method for Forgot Password*/
    @PostMapping(value = "/auth/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> post) {
        if (post.get("token") != null && post.get("new-password") != null) {
            try {
                authService.changePassword(post.get("token"), post.get("new-password"));
                return ResponseEntity.status(HttpStatus.OK).body(
                        CustomResponse.builder()
                                .status(HttpStatus.OK.value())
                                .error(false)
                                .errorType("success")
                                .message("Congratulations! You've successfully changed your password.")
                                .build()
                );
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        CustomResponse.builder()
                                .status(HttpStatus.OK.value())
                                .error(true)
                                .errorType("danger")
                                .message(e.getMessage())
                                .build()
                );
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

}