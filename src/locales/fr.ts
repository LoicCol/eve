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
    allEvents: "Tous les {evnts}",
  },
  groups: {
    yourGroups: "Vos {groups}",
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
    startDate: "Date de début",
    endDate: "Date de fin",
    location: "Lieu",
    participation: {
      participate: "Participer",
      maybe: "Peut-être",
      notGoing: "Ne participe pas",
    },
    noEndDate: "Pas de date de fin définie",
    noStartTime: "Pas d'heure de début définie",
    noEndTime: "Pas d'heure de fin définie",
    notFound: "Événement non trouvé",
  },
  eventForm: {
    eventName: "Nom de l'événement",
    enterEventName: "Entrez le nom de l'événement",
    location: "Lieu",
    enterEventLocation: "Entrez le lieu de l'événement",
    startDate: "Date de début",
    startTime: "Heure de début",
    endDate: "Date de fin",
    endTime: "Heure de fin",
    selectSection: "Sélectionner une section",
    optional: "Optionnel",
    selectSectionPlaceholder: "Sélectionnez une section",
    noSections: "Aucune section disponible",
    endDateEror: "La date de fin doit être après la date de début",
  },
  createEventForm: {
    title: "Créer un nouvel événement",
    successMessage: "Votre nouvel événement a été créé avec succès.",
    errorMessage:
      "Un problème est survenu lors de la création de votre événement. {error}",
    createEvent: "Créer l'événement",
  },
  editEventForm: {
    title: "Modifier l'événement",
    successMessage: "Votre événement a été mis à jour avec succès.",
    errorMessage:
      "Un problème est survenu lors de la mise à jour de votre événement. {error}",
    editEvent: "Modifier l'événement",
  },
  eventsHeader: {
    linkEvents: "Grouper",
    createEvent: "Créer un événement",
    editEvent: "Modifier l'événement",
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
    notFound: "Groupe non trouvé",
    errorLoadingEvents: "Échec du chargement des événements",
    grouped: "Regroupés",
    sorted: "Triés",
    groupedTooltip: "Regrouper les événements par section",
    sortedTooltip: "Trier les événements par date de début",
  },
  joinButton: {
    joined: "Membre",
    join: "Rejoindre",
    joinGroupTitle: "Voulez vous rejoindre le groupe ?",
    joinGroupDescription:
      "En rejoignant le groupe, vous pourrez participer aux événements et le faire figurer dans votre liste de groupes.",
    yes: "Oui",
    no: "Non",
  },
  linkEvents: {
    title: "Lier des événements",
    description:
      "Sélectionnez les événements que vous souhaitez lier. Ils seront regroupés dans une même section.",
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
    title: "Bienvenue sur",
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
        "Organisez vos groupes pour faciliter la planification d'événements.",
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
  eventList: {
    noEvents: "Aucun événement trouvé.",
    upcomingEvents: "Événements à venir",
    pastEvents: "Événements passés",
  },
  eventCard: {
    from: "Du",
    to: "au",
  },
} as const;
