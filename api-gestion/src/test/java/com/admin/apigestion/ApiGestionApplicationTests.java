package com.admin.apigestion;

import com.admin.apigestion.entities.Role;
import com.admin.apigestion.entities.Work;
import com.admin.apigestion.repositories.RoleRepository;
import com.admin.apigestion.repositories.WorkRepository;
import com.admin.apigestion.services.mailing.MailService;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
public class ApiGestionApplicationTests {

    @Autowired
    private MailService mailService;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private WorkRepository workRepository;

    @Autowired
    PasswordEncoder passwordEncoder;


    @Test
    public void contextLoads() {
        //log.info(passwordEncoder.encode("123456"));
    }

//	@Test
//	public void sendSimpleMessage() throws UnirestException {
//		HttpResponse<JsonNode> request = Unirest.post("https://api.mailgun.net/v3/" + "sandboxaaf39d440e8c42d486d0fe1d99c56624.mailgun.org" + "/messages")
//				.basicAuth("api", "01bcf492bfca6f901b0e24f63f96be97-9c988ee3-56cd8e32")
//				.field("from", "RAFIKI Houssam <hssamconf@gmail.com>")
//				.field("to", "sallakimane9@gmail.com")
//				.field("subject", "hello")
//				.field("text", "testing")
//				.asJson();
//
//		request.getBody();
//	}

//	@Test
//	public void testSendGridMailingService() {
//		mailService.sendTestMail();
//	}

//	@Test
//	public void addRole() {
//		Role newRole = Role.builder()
//				.name("ROLE_USER")
//				.build();
//		newRole.setStatus(1);
//		roleRepository.save(newRole);
//	}

//    @Test
//    public void addRole() {
//        Role newRole = Role.builder()
//                .name("ROLE_ADMIN")
//                .build();
//        newRole.setStatus(1);
//        roleRepository.save(newRole);
//    }

//    @Test
//    public void addWorkValues() {
//        Work newWork = Work.builder()
//                .name("design")
//                .build();
//        newWork.setStatus(1);
//        workRepository.save(newWork);
//
//        Work newWork1 = Work.builder()
//                .name("code")
//                .build();
//        newWork1.setStatus(1);
//        workRepository.save(newWork1);
//        Work newWork2 = Work.builder()
//                .name("deploy")
//                .build();
//        newWork2.setStatus(1);
//        workRepository.save(newWork2);
//    }
}
