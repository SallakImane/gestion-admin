package com.admin.apigestion.controllers;


import com.admin.apigestion.services.auth.AuthService;
import com.admin.apigestion.utils.models.CustomResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/auth")
public class AuthController {

    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /*Method for Register User*/
    @PostMapping(value = "/registerForm")
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

}