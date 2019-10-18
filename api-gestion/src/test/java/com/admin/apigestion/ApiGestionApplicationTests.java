package com.admin.apigestion;

import com.admin.apigestion.services.mailing.MailService;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ApiGestionApplicationTests {

	@Autowired
	private MailService mailService;
	@Test
	public void contextLoads() {

	}

	@Test
	public void sendSimpleMessage() throws UnirestException {
		HttpResponse<JsonNode> request = Unirest.post("https://api.mailgun.net/v3/" + "sandboxaaf39d440e8c42d486d0fe1d99c56624.mailgun.org" + "/messages")
				.basicAuth("api", "01bcf492bfca6f901b0e24f63f96be97-9c988ee3-56cd8e32")
				.field("from", "RAFIKI Houssam <hssamconf@gmail.com>")
				.field("to", "sallakimane9@gmail.com")
				.field("subject", "hello")
				.field("text", "testing")
				.asJson();

		request.getBody();
	}

	@Test
	public void testSendGridMailingService() {
		mailService.sendTestMail();
	}

}
