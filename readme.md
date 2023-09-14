# Take home assignment - Project Management System

## Stack

Hi, we're suggesting `Bun` instead of `node` & `npm` as it's faster and a drop
in replacement. If you find it's not playing well with `Prisma` then use `node`.
`Typescript` will be language of choice.

1. System requirements -
   - Version Control - Git
   - NodeJs Runtime - [Bun](https://bun.sh/)
   - NPM Package Management - [Bun](https://bun.sh/)
   - Database - [Postgres](https://www.postgresql.org/download/)
   - Editor - VS Code
1. Backend - Typescript
   - Framework - [Hono](https://hono.dev/)
   - Logger - [Hono/logger](https://hono.dev/middleware/builtin/logger)
   - JWT - [Hono/JWT](https://hono.dev/middleware/builtin/jwt)
   - ORM - [Prisma](https://www.prisma.io/)
   - Schema Validation - [Zod](https://zod.dev/)
   - Unit Testing - [Jest](https://jestjs.io/docs/getting-started#using-typescript)
1. Frontend - Typescript
   - Framework - [ReactJs](https://react.dev/)
   - Store - [Redux](https://redux.js.org/)
   - Style - [Tailwind](https://tailwindcss.com/)
   - UI Library - [Flowbite](https://www.flowbite-react.com/)

## Project Setup

1. Create a private repository on Gitlab with name `mern-project-management-01`.
2. This repo will contain code for both frontend & backend.
3. Make sure you add scripts to `package.json` for running frontend & backend.
4. Also add some example data by creating seeders under `prisma` folder.
5. Give read access to `ganeshkhade` and `sushaa` of the repo.

## Goal

Build a Project Management System with above mentioned tech stack.

### Backend Steps

1. Create hono project using `bun create hono my-app`
2. Use Postgres as DB
3. Use JWT for Authentication
4. Add Logging Middleware for Exception logging
5. Add models -
   - User (firstName, lastName, *email, *password, \*role, createdAt, updatedAt, deletedAt)
   - Project (*name, description, *owner, status, createdBy, dueAt, completedAt, createdAt, deletedAt)
   - Task (*name, description, *owner, status, createdBy, dueAt, completedAt, createdAt, updatedAt)
   - SubTask (*name, description, *owner, status, createdBy, dueAt, completedAt, createdAt, updatedAt)
   - `owner`, `createdBy` are foreignkey to `User` table.
   - `dueAt` is deadline for that project or task.
   - `role` is enum type with values `['admin', 'staff', 'user']`. `use` is
     default role.
   - Fields ending with `At` represent timestamps.
   - Fields starting with `*` represent required fields.
   - `createdBy` will be automatically assigned to `user` who created the Project / Task.
   - `status` field can be `['pending', 'completed', 'started', 'aborted', 'scheduled']`.
6. Add relatioships -
   - User can own multiple Projects. Project can have multiple owners (many to many relationship)
   - Admin can create CRUD Any Project.
   - Staff can edit & update Any project.
   - Staff can CRUD project created by them.
   - User can edit & update projects assigned to them.
   - User can CRUD project created by them.
   - Project can have multiple Tasks (one to many relationship)
   - Task can have multiple SubTasks (one to many relationship)
   - Task can have multiple owners. User can own multiple Tasks (many to many relationship)
   - User can have multiple SubTasks but SubTask will have a single owner (one to many relationship).
7. Add REST APIs to add, delete, modify
   - User (s)
   - Project (es)
   - Task (s)
   - SubTask (s)
8. Lint your code using eslint [Typescript-Eslint](https://typescript-eslint.io/getting-started)
9. Write unit tests using Jest
   1. One test file covering for atleast a single controller with REST API
   2. One integration test
   3. Do not use model access in tests. You can it for verification if it is not possible with using only APIs
10. [Optional] Document your code using Swagger

### Frontend Steps

1. Create a React project using Flowbite UI library based on Tailwind CSS. This
   will be in Typescript.
2. Use redux store for state management
3. Use JWT for authentication purpose
4. Create Login, Register, Forget Password pages, implement form validation as
   well.
5. Create pages to list Users, Projects, Tasks, SubTask.
6. Create pages for create, edit, also implement form validation.
7. Except register / login pages. User needs to login.
8. Write unit tests for Projects CRUD Pages.

### Deliverables (pushed to private repo)

_**include this README and check if completed or explain why it isn't done**_

- [ ] Source code
- [ ] Development setup instructions including commands for running lint and tests with coverage

<br>_example template_

> ### Development Setup
>
> ```
> 1. git clone <your repo url here>
> 2. docker run postgres ...
> 3. npx prisma migrate deploy
> ...
> 4. npx eslint --fix .
> 5. npm test -- --coverage
> ```

- [ ] Lint run report (expected no errors or warnings)
- [ ] Coverage report (expected 100% code coverage)
- [ ] Postman json

### Selection Criteria

1. Make sure that checklist above is complete
2. In case any point on the checklist is failed to be accomplished please provide all attempt information and reason for failure in details
3. Incomplete submissions without proper explanation or documentation will be rejected

## Code Evaluation

Provide `ganeshkhade` and `sushaa` with **read** access to your repository
on Gitlab.

## Interview Demo

You'll have to demonstrate & answer questions on the Assignment.
