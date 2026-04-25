---
title: Microservices PT. Ciptapapan Dinamika
problem: As the ERP system grew, the monolithic architecture started to hit performance bottlenecks and became difficult to scale independently.
solution: Refactored critical business logic into a modern microservices architecture using .NET, RabbitMQ for messaging, and Docker for containerization.
tech_stack:
  - .NET
  - C#
  - Microservices
  - RabbitMQ
  - Docker
---

# The Challenge

Decoupling a large enterprise system without interrupting daily operations is a significant technical hurdle. We needed a way for different services to communicate reliably and handle high traffic bursts.

# Technical Implementation

I utilized **RabbitMQ** as the message broker to implement an event-driven architecture. This allowed for asynchronous communication and ensured that service failures wouldn't bring down the entire system.

### Key Architectural Decisions:

- **API Gateway**: Centralized entry point for all client requests, handling authentication and routing.
- **Service Discovery**: Implemented to allow services to find each other dynamically.
- **Dockerization**: Every service was containerized to ensure consistent behavior across development, staging, and production.

# Final Outcome

The transition to microservices improved system uptime to 99.9% and reduced response times for data-intensive modules by over 60%.
