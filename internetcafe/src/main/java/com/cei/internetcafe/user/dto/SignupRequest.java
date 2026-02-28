package com.cei.internetcafe.user.dto;

import lombok.Getter;
import lombok.Setter;

public class SignupRequest {

            @Setter
            @Getter
            private String email;

            @Getter
            @Setter
            private String password;

            @Getter
            @Setter
            private String fname;

            @Getter
            @Setter
            private String lname;

            // Constructors
            public SignupRequest() {}

            public SignupRequest(String email, String password,String fname,String lname) {
                 this.fname = fname;
                 this.lname = lname;
                 this.email = email;
                 this.password = password;
            }

}