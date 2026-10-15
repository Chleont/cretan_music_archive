export const en = {
  common: {
    openNavigation: "Open navigation",
    closeNavigation: "Close navigation",
    primaryNavigation: "Primary navigation",
    artistSelectLabel: "Choose musician",
    switchToEnglish: "Switch to English",
    switchToGreek: "Switch to Greek",
    englishLanguageLabel: "en",
    greekLanguageLabel: "ελ",
  },
  navigation: {
    home: "Home",
    musicians: "Musicians",
    tracks: "Tracks",
    project: "The project",
  },
  homePage: {
    ariaLabel: "Cretan music archive home",
    title: "Mpaloukios",
    subtitle: "Educational archive of pre-war Cretan music",
  },
  musiciansPage: {
    eyebrow: "Musician archive",
    title: "Musicians of Crete",
    intro:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    menuLabel: "Choose musician",
    biographyLabel: "Short biography",
    interviewLabel: "Interview",
    interviewCta: "Read the interview",
    testimoniesCta: "Testimonies related to the artist",
    tracksLabel: "Tracks",
    tracksHint: "Tracks route to the tracks page.",
    bornLabel: "Place",
    musicians: [
      {
        id: "koufianos",
        name: "Koufianos",
        place: "Lorem ipsum",
        image: "/musicians/koufianos5-7.jpg",
        imageAlt: "Koufianos",
        biography:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Praesent tristique magna sit amet purus gravida quis blandit turpis. Amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus. Viverra ipsum nunc aliquet bibendum enim facilisis gravida neque. Eget arcu dictum varius duis at consectetur lorem donec massa. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi.",
        interviewHref: "/interviews/koufianos",
        tracks: [
          {
            id: "koufianos-pentozali",
            title: "Lorem ipsum",
            area: "Lorem ipsum",
            duration: "--:--",
          },
          {
            id: "koufianos-syrtos",
            title: "Dolor sit amet",
            area: "Lorem ipsum",
            duration: "--:--",
          },
          {
            id: "koufianos-kondylies",
            title: "Consectetur adipiscing",
            area: "Lorem ipsum",
            duration: "--:--",
          },
        ],
      },
      {
        id: "kareklas",
        name: "Kareklas",
        place: "Lorem ipsum",
        image: "/musicians/kareklas.svg",
        imageAlt: "Kareklas",
        biography:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Praesent tristique magna sit amet purus gravida quis blandit turpis. Amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus. Viverra ipsum nunc aliquet bibendum enim facilisis gravida neque. Eget arcu dictum varius duis at consectetur lorem donec massa. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi.",
        interviewHref: "/interviews/kareklas",
        tracks: [
          {
            id: "kareklas-maleviziotis",
            title: "Sed do eiusmod",
            area: "Lorem ipsum",
            duration: "--:--",
          },
          {
            id: "kareklas-tabachaniotiko",
            title: "Tempor incididunt",
            area: "Lorem ipsum",
            duration: "--:--",
          },
          {
            id: "kareklas-sousta",
            title: "Ut labore et dolore",
            area: "Lorem ipsum",
            duration: "--:--",
          },
        ],
      },
    ],
  },
  tracksPage: {
    title: "Tracks",
    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    selectedLabel: "Selected track",
    backToMusicians: "Back to musicians",
  },
} as const;
