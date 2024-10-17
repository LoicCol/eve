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
    successMessage: "Votre nouvel événement a été créé avec succès.",
    errorMessage:
      "Un problème est survenu lors de la création de votre événement. {error}",
    noSections: "Aucune section disponible",
  },
  eventsHeader: {
    linkEvents: "Lier des évmts",
    createEvent: "Créer un évmt",
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
  locale: "fr-FR",
  eventCardDropdown: {
    delete: "Supprimer",
    deleteError: "Échec de la suppression de l'événement. Veuillez réessayer.",
  },
  breadcrumb: {
    appName: "Eve",
    userGroups: "Groupes de {name}",
  },
  header: {
    events: "Événements",
    groups: "Groupes",
  },
  participantList: {
    participating: "Participe",
    maybe: "Peut-être",
  },
  themeToggle: {
    toggleTheme: "Changer de thème",
    light: "Clair",
    dark: "Sombre",
    system: "Système",
  },
  home: {
    title: "Bienvenue sur Event Manager",
    description:
      "Organisez et gérez facilement des événements avec vos amis. Créez des groupes, planifiez des événements et suivez qui participe.",
    upcomingEvents: {
      title: "Événements à venir",
      description: "Consultez et gérez vos prochains événements ici.",
      content: "Restez à jour avec toutes vos activités planifiées.",
      button: "Voir les événements",
    },
    yourGroups: {
      title: "Vos groupes",
      description: "Gérez vos groupes d'amis et créez-en de nouveaux.",
      content:
        "Organisez vos amis en groupes pour faciliter la planification d'événements.",
      button: "Voir les groupes",
    },
  },
  errors: {
    createGroup: "Échec de la création du groupe",
    joinGroup: "Échec de l'adhésion au groupe",
    deleteEvent: "Échec de la suppression de l'événement",
    getEventsForGroup: "Échec de la récupération des événements pour le groupe",
  },
  createGroupForm: {
    errors: {
      nameRequired: "Le nom du groupe est requis",
    },
    success: "Groupe créé avec succès",
    error: "Échec de la création du groupe",
  },
} as const;
