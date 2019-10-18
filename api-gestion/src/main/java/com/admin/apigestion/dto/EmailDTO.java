package com.admin.apigestion.dto;

import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.List;

/**
 * Email Data Transfer Object for Mailgun
 */
@Data
@Builder
public class EmailDTO {

    @NotEmpty
    private List<@Email String> to;
    private List<@Email String> cc;
    private List<@Email String> bcc;
    @NotEmpty
    private String from;
    @NotEmpty
    private String subject;
    @NotEmpty
    private String body;
}