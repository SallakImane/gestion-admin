package com.admin.apigestion.controllers;

import com.admin.apigestion.entities.User;
import com.admin.apigestion.services.dashboard.DashService;
import com.admin.apigestion.utils.models.CustomResponse;
import com.admin.apigestion.utils.models.PostUserDetails;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
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

    @GetMapping(value = "/user/details")
    public ResponseEntity<?> getUser(Principal principal) {
        try {
            Map<String, Object> res = new HashMap<>();
            User user = dashService.getUserByPrincial(principal);
            res.put("user",user);
            log.info(res.toString());
            return  ResponseEntity.status(HttpStatus.OK).body(res);
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

    @PutMapping(value = "/save/detailsUser")
    public ResponseEntity<?> saveUserDetails(@RequestBody PostUserDetails post, Principal principal) {
        try {
            dashService.saveUserDetails(post, principal);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    CustomResponse.builder()
                            .status(HttpStatus.CREATED.value())
                            .error(false)
                            .errorType("success")
                            .message("Your Details was updated successfully.")
                            .build()
            );

        }catch (Exception e){
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
    @PutMapping(value = "/save/newUser")
    public ResponseEntity<?> saveNewUser(@RequestBody PostUserDetails post) {
        try {
            dashService.saveNewUser(post);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    CustomResponse.builder()
                            .status(HttpStatus.CREATED.value())
                            .error(false)
                            .errorType("success")
                            .message("Your Details was updated successfully.")
                            .build()
            );

        }catch (Exception e){
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
    @DeleteMapping(value = "/delete/user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable(value = "id") Long id ,Principal principal) {
        try {
            dashService.deleteUser(id,principal);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    CustomResponse.builder()
                            .status(HttpStatus.CREATED.value())
                            .error(false)
                            .errorType("success")
                            .message("User was deleted successfully.")
                            .build()
            );

        }catch (Exception e){
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
