package com.admin.apigestion.repositories;


import com.admin.apigestion.entities.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
