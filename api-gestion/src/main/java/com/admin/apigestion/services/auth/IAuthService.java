package com.admin.apigestion.services.auth;
import com.admin.apigestion.entities.User;
import java.util.Map;

public interface IAuthService {
    User register(Map<String, String> map) throws Exception;

    void forgotPassword(String username) throws Exception;

    void changePassword(String token, String newPassword) throws Exception;


}
