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

import java.security.Principal;
import java.util.List;
import java.util.Map;

@Slf4j
@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api/secured")
public class DashControllers {
    private final DashService dashService;

    public DashControllers(DashService dashService) {
        this.dashService = dashService;
    }

    @GetMapping(value = "/dashboard/users")
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

    @GetMapping(path = "/whoami")
    public ResponseEntity<?> index(Principal principal) {
        return ResponseEntity.ok().body(Map.of("email", principal.getName()));
    }
}
