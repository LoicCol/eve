export default {
  hello: "Bonjour",
  "hello.world": "Bonjour le monde !",
  welcome: "Bonjour {name} !",
  signIn: {
    title: "Se connecter",
  },
  signUp: {
    title: "S'inscrire",
  },
  events: {
    allEvents: "Tous les événements",
  },
  groups: {
    yourGroups: "Groupes dont vous faites partie",
    createGroup: "Créer un groupe",
    createNewGroup: "Créer un nouveau groupe",
    groupName: "Nom du groupe",
    enterGroupName: "Entrez le nom du groupe",
    createGroupSuccess: "Votre nouveau groupe a été créé avec succès.",
    createGroupError:
      "Il y a eu un problème lors de la création de votre groupe.",
    noGroupsFound: "Aucun groupe trouvé.",
  },
  eventDetails: {
    createdBy: "Créé par",
    participants: "Participants",
    description: "Description",
    participation: {
      participate: "Participer",
      maybe: "Peut-être",
      notGoing: "Ne participe pas",
    },
  },
  createEventForm: {
    title: "Créer un nouvel événement",
    eventName: "Nom de l'événement",
    enterEventName: "Entrez le nom de l'événement",
    location: "Lieu",
    enterEventLocation: "Entrez le lieu de l'événement",
    dateAndTime: "Date et heure",
    selectSection: "Sélectionner une section",
    optional: "Optionnel",
    selectSectionPlaceholder: "Sélectionnez une section",
    createEvent: "Créer l'événement",
  },
  eventsHeader: {
    linkEvents: "Lier des événements",
    createEvent: "Créer un événement",
    events: "Événements",
    groupEvents: "Événements du groupe",
  },
  groupDetails: {
    description: "Description",
    createdBy: "Créé par",
    members: "Membres",
  },
  groupEvents: {
    upcoming: "À venir",
    past: "Passés",
    noEventsFound: "Aucun événement trouvé",
  },
  joinButton: {
    joined: "Membre",
    join: "Rejoindre",
  },
  linkEvents: {
    title: "Lier des événements",
    description: "Sélectionnez les événements que vous souhaitez lier.",
    selectExistingSection: "Sélectionner une section existante",
    selectSectionPlaceholder: "Sélectionnez une section",
    createNewSection: "Créer une nouvelle section",
    newSectionNamePlaceholder: "Nom de la nouvelle section",
    newSectionDescription:
      "Laissez vide si vous voulez lier à une section existante.",
    submit: "Soumettre",
    otherSection: "Autre",
  },
  groupDefault: {
    events: "Événements",
  },
  createEvent: {
    title: "Créer un événement",
  },
} as const;
