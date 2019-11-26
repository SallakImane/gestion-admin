package com.admin.apigestion.services.dashboard;

import com.admin.apigestion.entities.Address;
import com.admin.apigestion.entities.Role;
import com.admin.apigestion.entities.User;
import com.admin.apigestion.entities.Work;
import com.admin.apigestion.repositories.AddressRepository;
import com.admin.apigestion.repositories.RoleRepository;
import com.admin.apigestion.repositories.UserRepository;
import com.admin.apigestion.repositories.WorkRepository;
import com.admin.apigestion.utils.models.PostUserDetails;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class DashService implements IDashService{

    private final UserRepository userRepository;

    private final WorkRepository workRepository;

    private final AddressRepository addressRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    private EntityManager manager;

    public DashService(UserRepository userRepository,WorkRepository workRepository,
                       AddressRepository addressRepository,RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder,EntityManager manager) {
        this.userRepository = userRepository;
        this.workRepository = workRepository;
        this.addressRepository = addressRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.manager = manager;
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
        Optional<Work> op_work = workRepository.findByName(post.getWork());
        Work work = op_work.orElseGet(() -> workRepository.save(Work.builder().name(post.getWork()).build()));

        Address address = Address.builder()
                .country(post.getCountry())
                .city(post.getCity())
                .state(post.getState())
                .zipCode(post.getZipCode())
                .address(post.getAddress())
                .build();
        address.setStatus(1);
        addressRepository.save(address);

        userRepository.findByEmail(principal.getName()).ifPresent(user -> {
            user.setFirstName(post.getFirstName());
            user.setLastName(post.getLastName());
            user.setPhone(post.getPhone());
            user.setWork(work);
            user.setAddress(address);
            log.info(user.toString());
            userRepository.save(user);
        });
    }

    @Override
    public void saveNewUser(PostUserDetails post) throws Exception {
        if(userRepository.findByEmail(post.getEmail()).isPresent()){
            throw new Exception("Email address already exist. Please Log in with your existing email.");
        }else{
            /*Affectation role type*/
            Optional<Role> op_role = roleRepository.findByName("ROLE_USER");
            Role role = op_role.orElseGet(() -> roleRepository.save(Role.builder().name("ROLE_USER").build()));

            /*Affectation work type*/
            Optional<Work> op_work = workRepository.findByName(post.getWork());
            Work work = op_work.orElseGet(() -> workRepository.save(Work.builder().name(post.getWork()).build()));

            /*creation Address*/
            Address address = Address.builder()
                    .country(post.getCountry())
                    .city(post.getCity())
                    .state(post.getState())
                    .zipCode(post.getZipCode())
                    .address(post.getAddress())
                    .build();
            address.setStatus(1);
            addressRepository.save(address);

            /*creation User*/
            User newUser = User.builder()
                    .firstName(post.getFirstName())
                    .lastName(post.getLastName())
                    .email(post.getEmail())
                    .password(passwordEncoder.encode(post.getPassword()))
                    .phone(post.getPhone())
                    .role(role)
                    .work(work)
                    .address(address)
                    .build();
            newUser.setStatus(1);
            newUser =userRepository.save(newUser);
        }
    }

    @Override
    public void deleteUser(Long id, Principal principal) throws Exception {
        User user = userRepository.findById(id).get();
       if(user !=null){
           if(principal.getName().equals(user.getEmail())) throw new Exception(" You can't delete this user ! ");
           else{
               userRepository.delete(user);
           }
       }

    }
}
