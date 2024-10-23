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
    allEvents: "All {evnts}",
  },
  groups: {
    yourGroups: "Your {groups}",
    createGroup: "Create Group",
    createNewGroup: "Create a Group",
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
    noStartTime: "No start time set",
    noEndTime: "No end time set",
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
    successMessage: "Your new event has been successfully created.",
    errorMessage: "There was a problem creating your event. {error}",
    noSections: "No sections available",
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
    description:
      "Select the events you want to link. They will be grouped in a section.",
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
    deleteError: "Failed to delete the event. Please try again.",
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
  home: {
    title: "Welcome on",
    description:
      "Organize and manage events with your friends easily. Create groups, plan events, and keep track of who's attending.",
    upcomingEvents: {
      title: "Upcoming Events",
      description: "View and manage your upcoming events here.",
      content: "Stay up to date with all your planned activities.",
      button: "View Events",
    },
    yourGroups: {
      title: "Your Groups",
      description: "Manage your friend groups and create new ones.",
      content: "Organize your friends into groups for easier event planning.",
      button: "View Groups",
    },
  },
  errors: {
    createGroup: "Failed to create group",
    joinGroup: "Failed to join group",
    deleteEvent: "Failed to delete event",
    getEventsForGroup: "Failed to fetch events for group",
  },
  createGroupForm: {
    errors: {
      nameRequired: "Group name is required",
    },
    success: "Group created successfully",
    error: "Failed to create group",
  },
  eventList: {
    noEvents: "No events found.",
    upcomingEvents: "Upcoming Events",
    pastEvents: "Past Events",
  },
} as const;
