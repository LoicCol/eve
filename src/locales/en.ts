export default {
  hello: "Hello",
  "hello.world": "Hello world!",
  welcome: "Hello {name}!",
  signIn: {
    title: "Sign In",
  },
  signUp: {
    title: "Sign Up",
  },
  events: {
    allEvents: "All your groups events",
  },
  groups: {
    yourGroups: "Groups you are in",
    createGroup: "Create Group",
    createNewGroup: "Create New Group",
    groupName: "Group Name",
    enterGroupName: "Enter group name",
    createGroupSuccess: "Your new group has been successfully created.",
    createGroupError: "There was a problem creating your group.",
    noGroupsFound: "No groups found.",
  },
  eventDetails: {
    createdBy: "Created by",
    participants: "Participants",
    description: "Description",
    participation: {
      participate: "Participate",
      maybe: "Maybe",
      notGoing: "Not going",
    },
  },
  createEventForm: {
    title: "Create New Event",
    eventName: "Event Name",
    enterEventName: "Enter event name",
    location: "Location",
    enterEventLocation: "Enter event location",
    dateAndTime: "Date and Time",
    selectSection: "Select Section",
    optional: "Optional",
    selectSectionPlaceholder: "Select a section",
    createEvent: "Create Event",
  },
  eventsHeader: {
    linkEvents: "Link Events",
    createEvent: "Create Event",
    events: "Events",
    groupEvents: "Group's Events",
  },
  groupDetails: {
    description: "Description",
    createdBy: "Created by",
    members: "Members",
  },
  groupEvents: {
    upcoming: "Upcoming",
    past: "Past",
    noEventsFound: "No events found",
  },
  joinButton: {
    joined: "Joined",
    join: "Join",
  },
  linkEvents: {
    title: "Link Events",
    description: "Select the events you want to link.",
    selectExistingSection: "Select Existing Section",
    selectSectionPlaceholder: "Select a section",
    createNewSection: "Create New Section",
    newSectionNamePlaceholder: "New section name",
    newSectionDescription:
      "Leave empty if you want to link to an existing section.",
    submit: "Submit",
    otherSection: "Other",
  },
  groupDefault: {
    events: "Events",
  },
  createEvent: {
    title: "Create Event",
  },
  locale: "en-UK",
  eventCardDropdown: {
    delete: "Delete",
  },
  breadcrumb: {
    appName: "Eve",
    userGroups: "{name}'s groups",
  },
  header: {
    events: "Events",
    groups: "Groups",
  },
  participantList: {
    participating: "Participating",
    maybe: "Maybe",
  },
  themeToggle: {
    toggleTheme: "Toggle theme",
    light: "Light",
    dark: "Dark",
    system: "System",
  },
} as const;
