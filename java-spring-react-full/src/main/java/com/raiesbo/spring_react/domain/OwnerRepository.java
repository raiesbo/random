package com.raiesbo.spring_react.domain;

import org.springframework.data.repository.CrudRepository;
import java.util.Optional;

public interface OwnerRepository extends CrudRepository<Owner, Long> {

    Optional<Owner> findByFirstname(String firstname);

}
