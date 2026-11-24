/* ---------------------------------------------------------------
   Presentation content — bullet points only, like the PDF.
   Every slide uses a full-bleed photo with text on top
   (tone: "photo"); the cover keeps its own split layout.
----------------------------------------------------------------*/

window.SLIDES = [

  /* 01 — cover */
  {
    layout: "cover",
    kicker: "English presentation · Class 9a",
    title: "Christmas Island Red Crab",
    subtitle: "A fascinating land crab",
    meta: "Karl von Römer · 9a",
    image: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Besuch_beim_Drachenlord.jpg/1280px-Besuch_beim_Drachenlord.jpg",
      alt: "Drachenlord (Rainer Winkler) sitting at a table with posters and autograph cards",
    },
    credit: "Photo: Julia Seeliger / Wikimedia Commons (CC0)",
  },

  /* 02 — overview */
  {
    layout: "agenda",
    tone: "photo",
    kicker: "Overview",
    title: "What I'm presenting",
    image: {
      src: "images/island1.jpg",
      alt: "A red crab on the forest floor of Christmas Island",
    },
    credit: "Photo: DIAC images / Wikimedia Commons (CC BY 2.0)",
    items: [
      ["01", "Where do they live?"],
      ["02", "Appearance and food"],
      ["03", "The famous migration"],
      ["04", "Reproduction"],
      ["05", "Why are they important?"],
      ["06", "Conclusion"],
    ],
  },

  /* 03 — habitat */
  {
    layout: "split",
    tone: "photo",
    kicker: "01 · Where do they live?",
    title: "Where do they live?",
    image: {
      src: "images/dollybeach.jpg",
      alt: "Dolly Beach on Christmas Island, with the Indian Ocean in the background",
    },
    credit: "Photo: Chris Bray / Wikimedia Commons (CC BY-SA 4.0)",
    points: [
      "Christmas Island",
      "Indian Ocean",
      "Australian territory",
      "Tropical rainforests",
    ],
  },

  /* 04 — appearance and food */
  {
    layout: "split",
    tone: "photo",
    kicker: "02 · Appearance and food",
    title: "Appearance and food",
    image: {
      src: "images/crab.jpg",
      alt: "Close-up of a bright red Christmas Island red crab",
    },
    credit: "Photo: Chris Bray / Wikimedia Commons (CC BY-SA 4.0)",
    points: [
      "Bright red shell",
      "Carapace up to 11.6 cm",
      "Leaves, fruit and flowers",
      "Lives on land, not in the sea",
    ],
  },

  /* 05 — the migration */
  {
    layout: "split",
    tone: "photo",
    kicker: "03 · The famous migration",
    title: "The famous migration",
    image: {
      src: "images/migration.jpg",
      alt: "Many red crabs crossing a road during the annual migration",
    },
    credit: "Photo: Ian Usher / Wikimedia Commons (CC BY-SA 3.0)",
    points: [
      "Start of the rain season",
      "Crabs leave the rainforest",
      "Travel towards the ocean",
      "Roads are closed, crab bridges are built",
    ],
  },

  /* 06 — reproduction */
  {
    layout: "split",
    tone: "photo",
    kicker: "04 · Reproduction",
    title: "Reproduction",
    image: {
      src: "images/eggs.jpg",
      alt: "A female red crab carrying a large mass of eggs under her body",
    },
    credit: "Photo: Chris Bray / Wikimedia Commons (CC BY-SA 4.0)",
    points: [
      "Crabs travel to the coast",
      "Females lay up to 100,000 eggs",
      "Eggs are released into the ocean",
      "Baby crabs return to land",
    ],
  },

  /* 07 — baby crabs */
  {
    layout: "hero",
    kicker: "04 · Baby crabs",
    title: "Baby crabs return to land",
    points: [
      "About a month in the ocean",
      "Only 5 mm wide",
      "Most are eaten by fish",
    ],
    image: {
      src: "images/megalopae.jpg",
      alt: "Tiny baby red crabs swarming over rocks at the shore",
    },
    credit: "Photo: Chook keeper / Wikimedia Commons (CC BY-SA 4.0)",
  },

  /* 08 — why they matter */
  {
    layout: "facts",
    tone: "photo",
    kicker: "05 · Why are they important?",
    title: "Why are they important?",
    image: {
      src: "images/crab2.jpg",
      alt: "A red crab on the rainforest floor",
    },
    credit: "Photo: Dragon187 / Wikimedia Commons (CC BY-SA 3.0)",
    cards: [
      { tag: "Rainforest", title: "Rainforest ecosystem" },
      { tag: "Leaves", title: "Clean up fallen leaves" },
      { tag: "Soil", title: "Improving the soil" },
      { tag: "People", title: "Crab bridges, closed roads" },
    ],
  },

  /* 09 — crab bridges */
  {
    layout: "split",
    tone: "photo",
    kicker: "05 · People help the crabs",
    title: "Crab bridges and closed roads",
    image: {
      src: "images/crabbridge.jpg",
      alt: "A crab bridge with a mesh walkway built over a road, covered in red crabs",
    },
    credit: "Image: AI-generated illustration of a crab bridge",
    points: [
      "Crab bridges over the roads",
      "Roads closed during the migration",
      "People help and protect the crabs",
    ],
  },

  /* 10 — conclusion */
  {
    layout: "statement",
    tone: "photo",
    kicker: "Conclusion",
    title: "One island. Millions of crabs. One incredible migration.",
    image: {
      src: "images/hero.jpg",
      alt: "Thousands of red crabs crossing a road",
    },
    credit: "Photo: Chris Bray / Wikimedia Commons (CC BY-SA 4.0)",
  },

  /* 11 — sources */
  {
    layout: "sources",
    tone: "photo",
    kicker: "Sources",
    title: "My sources",
    note: "Slide 9: the crab bridge picture is an AI-generated illustration — no free-licence photo of the bridge exists.",
    image: {
      src: "images/island2.jpg",
      alt: "A red crab on the rainforest floor",
    },
    credit: "Photo: DIAC images / Wikimedia Commons (CC BY 2.0)",
    groups: [
      {
        heading: "Text",
        items: [
          {
            label: "Parks Australia — Red crab",
            href: "https://christmasislandnationalpark.gov.au/discover/nature/animals/crabs/red-crab/",
          },
          {
            label: "Parks Australia — Red crab migration",
            href: "https://christmasislandnationalpark.gov.au/red-crab-migration",
          },
          {
            label: "Christmas Island Tourism — Nature & wildlife",
            href: "https://www.christmas.net.au/nature-wildlife",
          },
          {
            label: "National Geographic Kids — Red crab",
            href: "https://kids.nationalgeographic.com/animals/invertebrates/facts/christmas-island-red-crab",
          },
        ],
      },
      {
        heading: "Photos (Wikimedia Commons)",
        items: [
          {
            label: "Chris Bray — crabs on the migration (CC BY-SA 4.0)",
            href: "https://commons.wikimedia.org/wiki/File:Crab_migration_extra_-_chris_bray-1_(cropped).jpg",
          },
          {
            label: "Chris Bray — red crab close-up (CC BY-SA 4.0)",
            href: "https://commons.wikimedia.org/wiki/File:Christmas_Island_Red_Crab.jpg",
          },
          {
            label: "Ian Usher — crabs on the road (CC BY-SA 3.0)",
            href: "https://commons.wikimedia.org/wiki/File:Christmas_Island_Crabs_on_annual_migration.JPG",
          },
          {
            label: "Chris Bray — female with eggs (CC BY-SA 4.0)",
            href: "https://commons.wikimedia.org/wiki/File:Christmas_island_red_crabs_-_female_with_eggs_chris_bray-2.jpg",
          },
          {
            label: "Chook keeper — baby crabs (CC BY-SA 4.0)",
            href: "https://commons.wikimedia.org/wiki/File:Christmas_Island_Red_Crab_Megalopae.jpg",
          },
          {
            label: "DIAC images — crabs in the rainforest (CC BY 2.0)",
            href: "https://commons.wikimedia.org/wiki/File:Christmas_Island_(5774532171).jpg",
          },
          {
            label: "Dragon187 — red crab (CC BY-SA 3.0)",
            href: "https://commons.wikimedia.org/wiki/File:Christmas_Red_Crab.JPG",
          },
          {
            label: "Chris Bray — Dolly Beach, Indian Ocean (CC BY-SA 4.0)",
            href: "https://commons.wikimedia.org/wiki/File:Dolly_Beach,_Christmas_Island.jpg",
          },
          {
            label: "Julia Seeliger — Drachenlord (CC0)",
            href: "https://commons.wikimedia.org/wiki/File:Besuch_beim_Drachenlord.jpg",
          },
        ],
      },
    ],
  },
];
