package com.admin.apigestion.utils.models;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Data
public class PostUserDetails {
    private @NotEmpty String firstName;
    private @NotEmpty String lastName;
    private @NotEmpty String phone;
    private @NotEmpty @Email String email;
    private @NotEmpty String password;
    private String work;
    private String country;
    private String city;
    private String state;
    private String zipCode;
    private String address;
}
