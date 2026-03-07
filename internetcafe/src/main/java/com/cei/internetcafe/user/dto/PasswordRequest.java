package com.cei.internetcafe.user.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PasswordRequest {
    private String oldPassword;
    private String newPassword;

    public PasswordRequest() {}

    public PasswordRequest(String oldPassword, String newPassword) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }
}