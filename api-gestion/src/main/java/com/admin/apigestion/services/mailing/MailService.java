package com.admin.apigestion.services.mailing;

import com.admin.apigestion.dto.EmailDTO;
import com.admin.apigestion.dto.PayloadResponse;
import com.google.common.collect.ImmutableList;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class MailService implements IMail {

//    @Value("${angular.url}")
//    private String angularUrl;
    @Value("${mailgun.api}")
    private String api;
    @Value("${mailgun.endpoint}")
    private String endpoint;
    @Value("${mailgun.authorisation.key}")
    private String key;
    @Value("${mailgun.domain}")
    private String domain;
    @Value("${mailgun.connectTimeout}")
    private long connectTimeout;
    @Value("${mailgun.socketTimeout}")
    private long socketTimeout;



    @Override
    public void sendTestMail() {
        sendMail(EmailDTO.builder()
                .from("YourFatca <info@fatca.findl.lu>")
                .to(ImmutableList.of("sallakimane9@gmail.com"))
                .subject("Email Confirmation")
                .body("<html>Hi there ! <br /><br />" +
                        "Welcome to GestionAdmin.lu<br />" +
                        "Please confirm your email by clicking on the button below : <br /><br />" +
                        "<a style='background-color: #4CAF50; border: none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;border-radius: 12px;' href='http://localhost:8081/gestion-admin/'>Confirm</a> <br /> <br />" +
                        "GestionAdmin Team<br />" +
                        "gestion@admin.findl.lu </html>")

                .build());

    }

    private void sendMail(EmailDTO email) {
        try {
            Unirest.setTimeouts(connectTimeout, socketTimeout);
            HttpResponse<String> response = Unirest.post(api + domain + endpoint)
                    .basicAuth("api", key)
                    .queryString("from", email.getFrom())
                    .queryString("to", email.getTo())
                    .queryString("subject", email.getSubject())
                    .queryString("html", email.getBody())
                    .asString();

            PayloadResponse res = new PayloadResponse(response);
            log.info(res.toString());
        } catch (UnirestException e) {
            throw new RuntimeException("Error occurred while sending email through Mailgun: " + e.getMessage());
        }
    }
}
