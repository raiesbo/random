package com.raiesbo.spring_react.web;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.raiesbo.spring_react.domain.Car;
import com.raiesbo.spring_react.domain.CarRepository;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class CarController {
    CarRepository carRepository;

    public CarController(CarRepository repository) {
        this.carRepository = repository;
    }

    @JsonIgnore
    @GetMapping("/cars")
    public Iterable<Car> getCars() {
        return carRepository.findAll();
    }

}
