package com.raiesbo.spring_react;

import com.raiesbo.spring_react.domain.Owner;
import com.raiesbo.spring_react.domain.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import java.util.Optional;

@DataJpaTest
public class OwnerRepositoryTest {
    @Autowired
    OwnerRepository repository;

    @Test
    void saveOwner() {
        repository.save(new Owner("John90", "Doe"));

        assertThat(
                repository.findByFirstname("John90").isPresent()
        ).isTrue();
    }

    @Test
    void deleteOwners() {
        repository.save(new Owner("John91", "Doe"));
        repository.deleteAll();

        assertThat(
                repository.count()
        ).isEqualTo(0);
    }
}
