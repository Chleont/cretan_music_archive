export const el = {
  common: {
    openNavigation: "Άνοιγμα πλοήγησης",
    closeNavigation: "Κλείσιμο πλοήγησης",
    primaryNavigation: "Κύρια πλοήγηση",
    artistSelectLabel: "Επιλογή μουσικού",
    switchToEnglish: "Αλλαγή στα αγγλικά",
    switchToGreek: "Αλλαγή στα ελληνικά",
    englishLanguageLabel: "en",
    greekLanguageLabel: "ελ",
  },
  navigation: {
    home: "Αρχική",
    musicians: "Μουσικοί",
    tracks: "Κομμάτια",
    project: "Το αρχείο",
  },
  homePage: {
    ariaLabel: "Αρχική σελίδα αρχείου κρητικής μουσικής",
    title: "Μπαλούκιος",
    subtitle: "Εκπαιδευτικό αρχείο προπολεμικής κρητικής μουσικής",
  },
  musiciansPage: {
    eyebrow: "Αρχείο μουσικών",
    title: "Μουσικοί της Κρήτης",
    intro:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    menuLabel: "Επιλογή μουσικού",
    biographyLabel: "Σύντομο βιογραφικό",
    interviewLabel: "Συνέντευξη",
    interviewCta: "Διαβάστε τη συνέντευξη",
    testimoniesCta: "Μαρτυρίες σχετικά με τον καλλιτέχνη",
    tracksLabel: "Κομμάτια",
    tracksHint: "Τα κομμάτια οδηγούν στη σελίδα των tracks.",
    bornLabel: "Τόπος",
    musicians: [
      {
        id: "koufianos",
        name: "Κουφιανός",
        place: "Lorem ipsum",
        image: "/musicians/koufianos5-7.jpg",
        imageAlt: "Κουφιανός",
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
        name: "Καρεκλάς",
        place: "Lorem ipsum",
        image: "/musicians/kareklas.svg",
        imageAlt: "Καρεκλάς",
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
    selectedLabel: "Επιλεγμένο κομμάτι",
    backToMusicians: "Πίσω στους μουσικούς",
  },
} as const;
