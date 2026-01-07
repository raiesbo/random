package com.raiesbo.spring_react;

import com.raiesbo.spring_react.domain.Car;
import com.raiesbo.spring_react.domain.CarRepository;
import com.raiesbo.spring_react.domain.Owner;
import com.raiesbo.spring_react.domain.OwnerRepository;
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

    public SpringReactApplication(CarRepository carRepository, OwnerRepository ownerRepository) {
        this.carRepository = carRepository;
        this.ownerRepository = ownerRepository;
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
    }

    public static void main(String[] args) {
        SpringApplication.run(SpringReactApplication.class, args);

        logger.info("Spring React Application Started");
    }

}
