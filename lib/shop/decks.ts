export type OracleDeck = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  imageSrc: string;
  shopUrl: string | null;
};

export const SHOP_ALL_URL =
  "https://www.makeplayingcards.com/sell/the-opaline-owl-oracle-decks";

export const decks: OracleDeck[] = [
  {
    id: "mystical-forest",
    title: "The Mystical Forest Oracle Deck",
    tagline:
      "For the wanderer, the animist, and the seeker who finds signs everywhere.",
    description:
      "Golden light filters through ancient trees. Owls watch from hidden branches. Keys, pathways, water, animals, and other symbols wait to be noticed. The Mystical Forest Oracle captures the enchanted feeling that the natural world may be communicating with us—if we become still enough to notice. Created for seekers drawn to synchronicity, symbolism, spirit animals, and nature-based spirituality, this deck transforms a card pull into a walk through a forest alive with meaning.",
    imageSrc: "/Shop/TOO Mystical Forest Oracle (1).png",
    shopUrl:
      "https://www.makeplayingcards.com/sell/marketplace/mystical-forest-oracle-deck.html",
  },
  {
    id: "veiled-goddess",
    title: "The Veiled Goddess Oracle Deck",
    tagline:
      "For the intuitive, the divine feminine, and the seeker drawn beyond the veil.",
    description:
      "Ethereal goddesses, jeweled veils, luminous color, and dreamlike landscapes give The Veiled Goddess Oracle its otherworldly beauty. Created for those drawn to feminine archetypes, intuition, ritual, and the mysteries that exist just beyond ordinary perception, this deck encourages you to quiet the conscious mind and listen more deeply. Each veiled figure becomes an invitation: What might be revealed when you trust what you sense, rather than only what you can see?",
    imageSrc: "/Shop/TOO Veiled Goddess Oracle.png",
    shopUrl:
      "https://www.makeplayingcards.com/sell/marketplace/veiled-goddess-oracle-deck.html",
  },
  {
    id: "green-witch",
    title: "The Green Witch Oracle Deck",
    tagline:
      "For the green witch, the earth-centered practitioner, and the wild-hearted mystic.",
    description:
      "Rooted in rich greens, botanical imagery, natural symbolism, and the quiet magic of the living world, The Green Witch Oracle is designed for those who find the sacred in forests, gardens, herbs, seasons, and cycles. Its imagery encourages grounding, observation, and intuitive connection with the natural world—a beautiful companion for nature-based ritual, meditation, journaling, or simply returning to yourself.",
    imageSrc: "/Shop/TOO Green Witch Oracle.png",
    shopUrl:
      "https://www.makeplayingcards.com/sell/marketplace/the-green-witch-oracle-deck.html",
  },
  {
    id: "gothic",
    title: "The Gothic Oracle Deck",
    tagline: "For the shadow worker, the mystic, and the lover of beautiful darkness.",
    description:
      "Steeped in Gothic imagery, dark academia, candlelight, skulls, and deep shades of violet, The Gothic Oracle invites you to explore what is hidden beneath the surface. Designed for those drawn to shadow work, ancestral wisdom, divination, and the mysteries of the unseen, this deck uses evocative imagery and archetypal symbolism to inspire honest self-reflection. Enter the darkness—not to remain there, but to discover what it has to teach you.",
    imageSrc: "/Shop/TOO Gothic Oracle.png",
    shopUrl:
      "https://www.makeplayingcards.com/sell/marketplace/the-gothic-oracle-deck.html",
  },
];
