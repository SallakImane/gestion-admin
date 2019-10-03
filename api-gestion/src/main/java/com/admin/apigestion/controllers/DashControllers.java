package com.admin.apigestion.controllers;

import com.admin.apigestion.entities.User;
import com.admin.apigestion.services.dashboard.DashService;
import com.admin.apigestion.utils.models.CustomResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/dashboard")
public class DashControllers {
    private final DashService dashService;

    public DashControllers(DashService dashService) {
        this.dashService = dashService;
    }

    @GetMapping(value = "/users")
    public ResponseEntity<?> getAllUsers() {
        try {
            List<User> res = dashService.getAllUsers();
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (Exception e) {
            e.printStackTrace();
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
}
