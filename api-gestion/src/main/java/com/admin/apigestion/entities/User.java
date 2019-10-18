package com.admin.apigestion.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User extends AbstractEntity {
    @Column(name="first_name" ,nullable = false)
    private String firstName;

    @Column(name="last_name" ,nullable = false)
    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    @JsonIgnore
    private String password;

    @Column(nullable = false)
    private String phone;
    @JsonIgnore
    private String resetPasswordToken;
    @JsonIgnore
    private LocalDateTime resetPasswordSentDate;
    @JsonIgnore
    private LocalDateTime passwordChangedDate;

    @ManyToOne
    private Role role;
}