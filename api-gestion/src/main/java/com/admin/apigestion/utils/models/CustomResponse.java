package com.admin.apigestion.utils.models;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class CustomResponse {
    private Integer status;
    private Boolean error;
    private String message;
    private String errorType;// Bootstrap alert code : danger, success, warning ...
    private Map<String, String> data;
}
