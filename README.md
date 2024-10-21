# Event Management Application

Welcome to the **Event Management Application**! This little application helps you manage events within a group of friends. It's currently in development, but you can check out the live version here:

[Live Demo](https://www.eve-nts.app/)

### Group Example

See how groups and events work in this example:  
[Group Example](https://www.eve-nts.app/groups/vgh9vcg7HdVtHMfYrjtbGH)

---

## Tech Stack

This application is built using the following technologies:

- **Next.js** - A React framework for server-rendered applications.
- **shadcn** - UI component library for building modern web applications.
- **PostgreSQL** - Relational database for storing data.
- **Drizzle** - A JavaScript ORM for managing database interactions.
- **Clerk** - User authentication and management.
- **Tailwind CSS** - A utility-first CSS framework for styling.
- **React Query** - A data-fetching library for React.

---

## Features and To-Do List

### Completed Tasks

- [x] Change schema to link events to groups.
- [x] Implement Group Details UI with linked events.
  - [x] Enable event creation from group details.
  - [x] Add users to groups.
  - [x] Improve UI design.
  - [x] Display event details within the group.
- [x] Enhance breadcrumb navigation.
  - [x] Include user photo and name.
  - [x] Show the selected event name.
- [x] User management and authentication.
  - [x] Implement authentication.
  - [x] Sync user updates in production.
- [x] Successful deployment on Vercel.
- [x] Implement event details view.
- [x] Improve event details UI.
- [x] Enable editing of event details.
  - [x] Title, date, and location.
  - [x] Description.
- [x] Enable event deletion.
- [x] Enable group editing.
  - [x] Edit group title.
  - [x] Edit group description.
- [x] Enable group deletion.
- [x] Ensure responsiveness across devices.
  - [x] Implement usage of Drawer for navigation.
  - [x] Ensure responsive group details view.
  - [x] Improve breadcrumb responsiveness.
  - [x] Ensure responsive event details view.
- [x] Implement a method to link related events (e.g., weekends or festivals).
- [x] Show participants on event cards.
- [x] Add support for translations.
- [x] Improve this README for clarity and usability.
- [x] PWA - Chrome
- [x] New sidebar

### Upcoming Features

- [ ] Well manage the events time.
- [ ] Limit editing permissions to admin (currently only the creator).
- [x] List events for all groups a user is in.
  - [ ] Add search functionality.
  - [ ] Implement filters for events.
- [ ] Enhance user tooltips for better usability.
- [ ] Allow users to set custom group names.
- [ ] Implement a comments section for events.
- [ ] Restrict editing to one user at a time (consider using WebSockets).
- [ ] Enable event suggestions within groups.
- [ ] Implement notifications for users.
- [ ] Create a history of changes for events.
- [ ] Prepare for the first production release.
- [ ] Implement rate limiting for API requests.
- [ ] Use ATP.

---

Thank you for checking out our Event Management Application! We hope you find it useful and exciting as we continue to develop and enhance its features.
