package com.admin.apigestion.services.dashboard;

import com.admin.apigestion.entities.Address;
import com.admin.apigestion.entities.User;
import com.admin.apigestion.entities.Work;
import com.admin.apigestion.repositories.AddressRepository;
import com.admin.apigestion.repositories.UserRepository;
import com.admin.apigestion.repositories.WorkRepository;
import com.admin.apigestion.utils.models.PostUserDetails;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class DashService implements IDashService{

    private final UserRepository userRepository;

    private final WorkRepository workRepository;

    private final AddressRepository addressRepository;

    public DashService(UserRepository userRepository,WorkRepository workRepository,AddressRepository addressRepository) {
        this.userRepository = userRepository;
        this.workRepository = workRepository;
        this.addressRepository = addressRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return  userRepository.getAllUserByStatus();
    }

    @Override
    public User getUserByPrincial(Principal principal) {
        return userRepository.findByUsernamePrincipal(principal.getName());
    }

    @Override
    public void saveUserDetails(PostUserDetails post, Principal principal) {
        Optional<Work> op_work = workRepository.findByName("ROLE_USER");
        Work work = op_work.orElseGet(() -> workRepository.save(Work.builder().name(post.getWork()).build()));
        log.info("work");
        log.info(work.toString());

        Address address = Address.builder()
                .country(post.getCountry())
                .city(post.getCity())
                .state(post.getState())
                .zipCode(post.getZipCode())
                .address(post.getAddress())
                .build();
        address.setStatus(1);
        addressRepository.save(address);

        log.info("address");
        log.info(address.toString());
        userRepository.findByEmail(principal.getName()).ifPresent(user -> {
            user.setFirstName(post.getFirstName());
            user.setLastName(post.getLastName());
            user.setPhone(post.getPhone());
            user.setWork(work);
            user.setAddress(address);
            userRepository.save(user);
        });
    }
}
