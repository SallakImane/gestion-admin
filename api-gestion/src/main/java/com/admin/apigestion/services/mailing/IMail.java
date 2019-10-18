package com.admin.apigestion.services.mailing;

public interface IMail {
    void sendTestMail();

    void sendResetPasswordMail(String email,String token);

    void sendPasswordChangedNotification(String email);

}
