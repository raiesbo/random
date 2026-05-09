# Clean Architecture with Node

Application of Clean Architecture while developing an authentication module using Node.js.

## Structure:

### Presentation

This is the outermost layer of the system, the one closest to the end user who interacts with the application.

It can be built using Express, Fastify, or any other framework that helps define the API.

It should be easily interchangeable without major issues.

### Domain

This layer contains the core business rules of the application: use cases, interfaces (contracts) and how repositories and data sources should behave.

It should not depend on external libraries or frameworks.
Instead, all other layers depend on this one.

#### Data Sources

It includes the business rules of the application, not the implementation.

The repository will remain constant across the application, and the data source will be the one that will be used
to communicate with the database and can change without affecting the rest of the application.

#### Repositories

The repository rules, which will communicate with the data sources. Not the implementation.

### Infrastructure

This layer acts as the bridge between the Presentation and Domain layers.
It contains concrete implementations of data sources, repositories, mappers and other external integrations.

### Config

Will contain all the configuration elements such as the environment variables is such way that the related dependencies will be contained there and will server as the "adapter" for them.

