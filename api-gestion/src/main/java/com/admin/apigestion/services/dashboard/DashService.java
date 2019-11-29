package com.admin.apigestion.services.dashboard;

import com.admin.apigestion.entities.Address;
import com.admin.apigestion.entities.Role;
import com.admin.apigestion.entities.User;
import com.admin.apigestion.entities.Work;
import com.admin.apigestion.exception.EmailAlreadyExistException;
import com.admin.apigestion.repositories.AddressRepository;
import com.admin.apigestion.repositories.RoleRepository;
import com.admin.apigestion.repositories.UserRepository;
import com.admin.apigestion.repositories.WorkRepository;
import com.admin.apigestion.utils.models.PostUserDetails;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityManager;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class DashService implements IDashService {

    private final UserRepository userRepository;

    private final WorkRepository workRepository;

    private final AddressRepository addressRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    private EntityManager manager;

    public DashService(UserRepository userRepository, WorkRepository workRepository,
                       AddressRepository addressRepository, RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder, EntityManager manager) {
        this.userRepository = userRepository;
        this.workRepository = workRepository;
        this.addressRepository = addressRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.manager = manager;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.getAllUserByStatus();
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
        if (userRepository.findByEmail(post.getEmail()).isPresent()) {
            throw new Exception("Email address already exist. Please Log in with your existing email.");
        } else {
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
            newUser = userRepository.save(newUser);
        }
    }

    @Override
    public void deleteUser(Long id, Principal principal) throws Exception {
        User user = userRepository.findById(id).get();
        if (user != null) {
            if (principal.getName().equals(user.getEmail())) throw new Exception(" You can't delete this user ! ");
            else {
                userRepository.delete(user);
            }
        }

    }

    @Override
    public PostUserDetails getUserById(Long id) {
        User user = userRepository.findById(id).get();
        if (user != null) {
            PostUserDetails userPost = PostUserDetails.builder()
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .phone(user.getPhone())
                    .email(user.getEmail())
                    .work(user.getWork().getName())
                    .country(user.getAddress().getCountry())
                    .city(user.getAddress().getCity())
                    .state(user.getAddress().getState())
                    .zipCode(user.getAddress().getZipCode())
                    .address(user.getAddress().getAddress())
                    .build();
            return userPost;
        }
        return null;
    }

    @Override
    public User updateUser(Long id, PostUserDetails post) throws EmailAlreadyExistException {
        User old_user = userRepository.findById(id).get();
        var new_user = old_user;
        if (old_user != null) {
            old_user.setFirstName(post.getFirstName());
            old_user.setLastName(post.getLastName());
            old_user.setPhone(post.getPhone());
            old_user.setEmail(post.getEmail());
            /*Verify old password before insert new password*/
            if(post.getOldPassword()!=null){
                boolean result = passwordEncoder.matches(post.getOldPassword(), old_user.getPassword());
                if(result){
                    old_user.setPassword(passwordEncoder.encode(post.getPassword()));
                }else {
                    throw  new ResponseStatusException(HttpStatus.BAD_REQUEST,"It's not the same current password");
                }
            }
            old_user.getWork().setName(post.getWork());
            old_user.getAddress().setCountry(post.getCountry());
            old_user.getAddress().setCity(post.getCity());
            old_user.getAddress().setState(post.getState());
            old_user.getAddress().setZipCode(post.getZipCode());
            old_user.getAddress().setAddress(post.getAddress());
        }
        try {
             new_user = this.userRepository.save(old_user);
        } catch (DataIntegrityViolationException e) {
            if (e.getMostSpecificCause().getMessage().startsWith("Duplicate entry")) {
                throw new EmailAlreadyExistException("Email address already exist", e.getCause());
            }
            new_user = null;
        }
        return new_user;
    }
}
