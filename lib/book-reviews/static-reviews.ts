import type { ReviewListItem } from "@/lib/sanity/types";

/** Local image in /public — use literal path; Next/Image encodes once. */
export const WEYWARD_COVER_SRC = "/images/Book Review Weyward.jpg";

export type StaticBookReviewDetail = {
  kind: "static";
  _id: string;
  slug: string;
  title: string;
  bookAuthor?: string;
  publishedAt: string;
  coverSrc: string;
  rating: number;
  /** Optional override; list page tease is derived from `bodyPlaceholder` when set. */
  excerpt?: string;
  /** Full-review page body placeholder */
  bodyPlaceholder: string;
};

export const STATIC_BOOK_REVIEWS: StaticBookReviewDetail[] = [
  {
    kind: "static",
    _id: "static-weyward",
    slug: "listening-to-the-wild-weyward",
    title:
      "Listening to the Wild: A Reflection on Weyward by Emilia Hart",
    bookAuthor: "Emilia Hart",
    publishedAt: "2026-04-09T12:00:00.000Z",
    coverSrc: WEYWARD_COVER_SRC,
    rating: 5,
    bodyPlaceholder: `Every now and then a novel finds its way into your hands at exactly the right moment. The timing feels almost intentional, as if the story itself were patiently waiting until you were ready to hear what it had to say. That is how it felt when I began reading Weyward by Emilia Hart.
At first glance, Weyward is simply an engaging and beautifully written novel about three women living in different time periods, all connected through a mysterious family lineage. The narrative moves between the seventeenth century, the mid-twentieth century, and the present day, weaving together the lives of women who have all, in their own ways, been constrained by the expectations and limitations placed upon them. Yet threaded through their stories is something far older and deeper: a quiet, almost instinctive connection to the natural world.
This connection is what the villagers around them would call witchcraft.
What the reader begins to recognize, however, is that the word witch is often simply a label applied to women who possess a deep attunement to nature and a refusal to ignore their inner knowing. Hart’s witches are not the broomstick-riding caricatures that popular culture sometimes imagines. Instead, they are women who feel the movement of wind and weather in their bones, who notice the small signals of animals and plants, and who instinctively understand that the natural world is not something separate from us, but something we belong to.
As someone who has spent much of my adult life exploring mindfulness, symbolism, and our energetic relationship with the living world around us, I found this aspect of the novel especially compelling.
Although Weyward is a work of fiction, the themes are surprisingly familiar. Throughout history, people across cultures have believed that certain individuals were particularly sensitive to the rhythms of nature. In ancient traditions, healers and wise women often developed intimate knowledge of herbs, weather patterns, and animal behavior simply through observation and experience. Over time, these abilities were sometimes misunderstood or feared, eventually becoming associated with accusations of witchcraft.
Hart’s novel invites us to reconsider those assumptions. What if the so-called “magic” in these stories is really a heightened form of awareness? What if the ability to sense the subtle language of nature is something that has always been available to human beings, but which many of us have forgotten how to access?
These ideas resonate strongly with the philosophy behind The Opaline Owl.
In The Journey, we talk often about the importance of regulating the nervous system and cultivating stillness. When the body moves out of chronic fight-or-flight and into a more balanced state, our awareness expands. We begin noticing details that might otherwise pass us by: the shift in the wind before a storm, the sudden quiet of birds in the trees, the subtle signals our own bodies send us when something feels right… or wrong.
The women in Weyward possess this type of awareness almost instinctively. Their connection to the natural world allows them to feel when something is changing around them, to communicate with animals in subtle ways, and to draw strength from the land itself.
Reading these passages reminded me of something I often reflect upon when spending time in nature. There is a quiet intelligence present in living systems that operates beyond human language. Plants communicate through complex underground networks of roots and fungi. Animals detect vibrations and scents far beyond our sensory range. Even the rhythms of the ocean and the pull of the moon demonstrate that the natural world operates through interconnected patterns of energy and influence.
When viewed through this lens, the witches of Weyward seem less supernatural and more like individuals who have simply remained in conversation with the natural world.
Of course, the novel is also wonderfully readable.  Hart has a talent for crafting characters whose struggles feel deeply personal and authentic. Each of the three protagonists faces her own set of challenges, yet all of them share the quiet determination to reclaim their autonomy and rediscover their own inner strength. The pacing moves quickly enough to keep the pages turning, while still leaving room for moments of reflection and atmospheric description of the English countryside where much of the story unfolds.
There is something undeniably satisfying about watching these women gradually step into their own power...
And perhaps that is part of the deeper message woven through the book.
Throughout history, individuals (particularly, but not only women) who trusted their intuition or cultivated unusual knowledge were often marginalized or misunderstood. Yet the ability to observe, to listen, and to form a relationship with the natural world has always been one of humanity’s greatest strengths.
In many ways, Weyward feels like a reminder of that forgotten relationship.
For those of us exploring mindfulness, spiritual awareness, or simply a more intentional way of living, the novel offers a gentle invitation to reconsider the boundaries we often draw between ourselves and nature. What if the wind rustling through the trees is not just background noise, but a rhythm we can learn to notice? What if the sudden appearance of an animal along our path is not meaningless coincidence, but an opportunity to pause and observe?
Reading Weyward left me thinking about the quiet magic that exists in everyday awareness.
Not the kind of magic that bends the laws of physics, but the kind that emerges when we slow down enough to recognize that we are part of something larger than ourselves.
In that sense, the witches of Emilia Hart’s novel may not be so different from any of us.
They are simply women who remembered how to listen.
And in a world that often encourages us to rush past the subtle signals of life, that might be the most powerful magic of all.`,
  },
];

export function getStaticReviewBySlug(
  slug: string
): StaticBookReviewDetail | undefined {
  return STATIC_BOOK_REVIEWS.find((r) => r.slug === slug);
}

/** Home “featured” strip + any list that uses `ReviewListItem`. */
export function staticReviewsAsFeaturedItems(): ReviewListItem[] {
  return STATIC_BOOK_REVIEWS.map((r) => ({
    _id: r._id,
    title: r.title,
    slug: r.slug,
    publishedAt: r.publishedAt,
    rating: r.rating,
    localCoverSrc: r.coverSrc,
  }));
}
