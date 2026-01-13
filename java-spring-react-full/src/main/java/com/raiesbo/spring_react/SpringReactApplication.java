package com.raiesbo.spring_react;

import com.raiesbo.spring_react.domain.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.Arrays;

@SpringBootApplication
public class SpringReactApplication implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(SpringReactApplication.class);
    private final CarRepository carRepository;
    private final OwnerRepository ownerRepository;
    private final AppUserRepository userRepository;

    public SpringReactApplication(CarRepository carRepository, OwnerRepository ownerRepository, AppUserRepository userRepository) {
        this.carRepository = carRepository;
        this.ownerRepository = ownerRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        Owner o1 = new Owner("John", "Doe");
        Owner o2 = new Owner("Jane", "Doe");

        ownerRepository.saveAll(Arrays.asList(o1, o2));

        carRepository.save(new Car("BMW", "Mustang", "White", "123456789", 2019, 10000, o1));
        carRepository.save(new Car("BMW", "X5", "White", "123456789", 2019, 10000, o2));
        carRepository.save(new Car("Nisan", "Mustang", "White", "123456789", 2019, 10000, o1));
        carRepository.save(new Car("Toyota", "Mustang", "White", "123456789", 2019, 10000, o2));

        // Fetch and log all cars
        for (Car car : carRepository.findAll()) {
            logger.info("brand: {}, model: {}", car.getBrand(), car.getModel());
        }

        // username: user, password: user
        userRepository.save(new AppUser("user", "$2a$10$NVM0n8ElaRgg7zWO1CxUdei7vWoPg91Lz2aYavh9.f9q0e4bRadue", "USER"));
        // Username: admin, password: admin
        userRepository.save(new AppUser("admin", "$2a$10$8cjz47bjbR4Mn8GMg9IZx.vyjhLXR/SKKMSZ9.mP9vpMu0ssKi8GW", "ADMIN"));
    }

    public static void main(String[] args) {
        SpringApplication.run(SpringReactApplication.class, args);

        logger.info("Spring React Application Started");
    }

}
