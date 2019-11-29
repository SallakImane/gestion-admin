package com.admin.apigestion.services.dashboard;

import com.admin.apigestion.entities.User;
import com.admin.apigestion.exception.EmailAlreadyExistException;
import com.admin.apigestion.utils.models.PostUserDetails;

import java.security.Principal;
import java.util.List;

public interface IDashService {

    List<User> getAllUsers ();

    User getUserByPrincial(Principal principal);

    void saveUserDetails(PostUserDetails post, Principal principal);

    void saveNewUser(PostUserDetails post) throws Exception;

    void deleteUser(Long id, Principal principal) throws Exception;

    PostUserDetails getUserById(Long id);

    User updateUser (Long id ,PostUserDetails postUserDetails) throws EmailAlreadyExistException;

}
