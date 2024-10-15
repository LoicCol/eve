
Little application to manage events in group of friends accessible here:

(still in development)[live](https://www.eve-nts.app/)

[group example](https://www.eve-nts.app/groups/vgh9vcg7HdVtHMfYrjtbGH)

Stack:
- NextJS
- shadcn
- postgres
- drizzle
- clerk
- tailwind
- react query


TODO

- [x] Change schema to have events that are linked to groups
- [x] Group Details UI with events linked
  - [x] Event creation from group details
  - [x] Add users to groups
  - [x] improve ui
  - [x] Event details in group
- [x] Improve breadcrumb
  - [x] add photo and name
  - [x] add selected event name
- [x] User management / Authentication
  - [x] Auth
  - [x] Syjc user updates on production
- [x] Deployment on Vercel
- [x] Event details
- [x] Event details improve UI
- [x] Event details edit
  - [x] Title / Date / Location
  - [x] Description
- [x] Delete event
- [x] Edit Group
  - [x] Title
  - [x] Description
- [x] Delete group
- [x] responsiveness
  - [x] usage of Drawer
  - [x] group details
  - [x] breadcrumb
  - [x] event details
- [x] Find a way to link events between them (weekend / festival)
- [ ] Limit edition to admin (creator for now)
- [ ] List events of all groups i'm in
  - [ ] add search
  - [ ] add filters
- [ ] Participants on event cards
- [ ] enhance user tooltip
- [ ] users group custom names
- [ ] comments section
- [ ] only 1 person should be able to edit at a time (websocket?)
- [ ] event suggestion in a group
- [ ] notifications 
- [ ] history in events
- [ ] first production release
- [ ] translations
- [ ] improve readme
- [ ] rate limiting
