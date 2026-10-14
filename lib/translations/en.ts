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
      "Two mock musician profiles for shaping the archive, each with a short biography, an interview link, and selected clickable tracks.",
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
        place: "Anogeia, Rethymno",
        image: "/musicians/koufianos5-7.jpg",
        imageAlt: "Portrait of Koufianos with a lyra",
        biography:
          "Koufianos is presented as a lyra player with a spare, lucid sound and a deep affection for older syrta. In this mock archive material, village memory, summer feasts, and informal improvisation become the center of his music. He is imagined as someone who learned by listening first: at doorways, in courtyards, beside older players who would repeat a phrase until the rhythm settled into the body. His repertory keeps a strong connection with mountain villages, but the playing is not treated like a museum object. Each tune bends slightly toward the room, the dancers, and the voices around him. The archive notes describe a musician who prefers a restrained introduction, then lets the bow grow sharper as the gathering becomes louder. In interviews, he would likely speak less about virtuosity and more about patience, breath, and the small variations that separate one village memory from another. His mock profile is useful for testing longer biographical passages because it includes place, style, lineage, performance context, and enough narrative detail to show how the page handles sustained text.",
        interviewHref: "/interviews/koufianos",
        tracks: [
          {
            id: "koufianos-pentozali",
            title: "Pentozali at Daybreak",
            area: "Rethymno",
            duration: "3:42",
          },
          {
            id: "koufianos-syrtos",
            title: "Syrtos on Psiloritis",
            area: "Mylopotamos",
            duration: "4:18",
          },
          {
            id: "koufianos-kondylies",
            title: "Cafe Kondylies",
            area: "Anogeia",
            duration: "5:05",
          },
        ],
      },
      {
        id: "kareklas",
        name: "Kareklas",
        place: "Kissamos, Chania",
        image: "/musicians/kareklas.svg",
        imageAlt: "Portrait of Kareklas with a laouto",
        biography:
          "Kareklas is a fictional laouto player for testing the archive content model. His style blends lively rhythm, clipped replies to the lyra, and stories from feasts where the singing lasted until first light. He is imagined as a musician shaped by western Crete, where the laouto often has to be both a rhythmic engine and a conversational partner. The mock notes place him in small celebrations, family tables, and late-night recordings where the microphone catches chair movement as clearly as the strings. His playing is direct, dry, and alert, with short accents that push dancers forward without crowding the melody. The biography also gives room to preview a more documentary tone: where he learned, who he accompanied, how his repertoire changed, and why certain songs stayed close to him. In a real archive entry, this section could carry dates, testimonies, recording details, and references to related performers. Here, the longer placeholder text helps test line length, wrapping, vertical rhythm, and whether the profile layout remains readable when a biography becomes a full note instead of a summary.",
        interviewHref: "/interviews/kareklas",
        tracks: [
          {
            id: "kareklas-maleviziotis",
            title: "Maleviziotis in the Square",
            area: "Chania",
            duration: "3:28",
          },
          {
            id: "kareklas-tabachaniotiko",
            title: "Tabachaniotiko Evening",
            area: "Kissamos",
            duration: "4:56",
          },
          {
            id: "kareklas-sousta",
            title: "Sousta on the Steps",
            area: "Western Crete",
            duration: "3:51",
          },
        ],
      },
    ],
  },
  tracksPage: {
    title: "Tracks",
    intro: "Mock destination page for archive tracks.",
    selectedLabel: "Selected track",
    backToMusicians: "Back to musicians",
  },
} as const;
