package com.admin.apigestion.utils.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostUserDetails {
    private @NotEmpty String firstName;
    private @NotEmpty String lastName;
    private @NotEmpty String phone;
    private @NotEmpty @Email String email;
    private String oldPassword;
    private String password;
    private String work;
    private String country;
    private String city;
    private String state;
    private String zipCode;
    private String address;
}
