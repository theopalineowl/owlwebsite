/** Local images in /public — use literal paths; Next/Image encodes once. */
export const FIG_TREE_COVER_SRC = "/images/Blog Fig tree 1.jpg";
export const SIGNS_SYNCHRONICITIES_COVER_SRC =
  "/images/Blog signs and synchronicities.jpg";

export type StaticBlogPostDetail = {
  kind: "static";
  _id: string;
  slug: string;
  title: string;
  publishedAt: string;
  coverSrc: string;
  /** Full post body placeholder until you move this to Sanity or rich text. */
  bodyPlaceholder: string;
  /** Optional Tailwind classes for the hero `Image` (default: max-w-2xl). */
  coverImageClassName?: string;
};

export const STATIC_BLOG_POSTS: StaticBlogPostDetail[] = [
  {
    kind: "static",
    _id: "static-fig-tree",
    slug: "the-fig-tree",
    title: "The Fig Tree",
    publishedAt: "2026-04-09T12:00:00.000Z",
    coverSrc: FIG_TREE_COVER_SRC,
    bodyPlaceholder: `This past winter I spent a stretch of quiet days at our tiny lake house in Virginia.
The house itself is humble and cozy, perched beside a small dock and wrapped in windows that look out over the surrounding forest. Deer wander through the trees at dusk. Owls announce themselves in the evening hours. The mornings belong to birds.
It is the kind of place that naturally invites stillness.
On the porch we keep several large potted plants. One of them is a fig tree that my husband planted himself years ago from what was essentially a hopeful little twig. Over time—and with a bit of patience and care—that twig grew into a rather majestic little tree.
Like me, it enjoys sunlight and fresh air.
This winter, however, nature had other plans.
Virginia experienced one of the coldest stretches in recent memory. Ice storms swept through the region, coating the forest in glittering sheets and snapping branches from trees that had stood for decades. The temperatures dropped to levels that the fig tree could never survive.
So inside it came.
In our tiny lake house there are not many placement options for a large potted tree. After some rearranging, the only logical spot turned out to be directly behind my recliner, positioned in front of the sliding glass doors where the sunlight pours in.
The result?
The branches now form a leafy canopy above my favorite sitting space.
This chair has long been my little sanctuary. It is where I meditate, read, write, occasionally nap, and cuddle with our two cats and two very small dogs who believe the recliner was designed exclusively for them.
At first, I wasn’t thrilled with the new arrangement.
The branches made the space feel a bit cramped. Leaves brushed my shoulders when I leaned back. It felt… crowded.
But after a few days something shifted.
The light filtering through the leaves cast gentle patterns around the room. The soft green canopy above me created the feeling of sitting beneath a living shelter. The tree’s presence brought a kind of quiet vitality to the space.
It felt protective somehow.
Alive.
One afternoon during meditation I decided to keep my eyes open rather than closed. Instead of focusing on my breath, I let my gaze rest softly on one particular leaf.
It was broad and thick, a deep green with veins that branched outward like tiny rivers. Just beneath it hung a small green bulb—the promise of a future fig.
I studied the leaf the way one might study a landscape.
Its texture.
Its color.
The intricate network of veins carrying life through its body.
And suddenly something occurred to me.
Outside, the temperatures had dropped to record-breaking levels. Trees had lost limbs. The forest floor was locked under ice.
Yet this fig tree—this living being—was thriving.
In fact, it had begun producing fruit.
It had no idea what kind of winter was coming. It did not check weather forecasts. It did not analyze atmospheric data or listen to emergency alerts.
It simply existed.
Had I not moved it inside, the coming freeze would have destroyed it.
The tree could not save itself.
It lacks the senses to predict the future.
It lacks mobility.
It lacks the analytical mind that humans rely upon to navigate danger.
And yet… it lives.
It grows.
It responds to the conditions surrounding it with remarkable sophistication.
This realization led me to another.
In many ways, I serve as a kind of guardian for this tree. I observe the environment. I anticipate threats. I move it when necessary. I provide water and shelter.
The tree trusts the conditions it finds itself in.
But I am the one arranging those conditions.
And in that moment I found myself wondering about the unseen guardians that might exist in my own life.
In The Journey, we explore the idea that all living things are expressions of the same intelligent Source Energy. The fig tree, the deer in the woods, the owls calling through the night air, and you reading these words—all animated by the same underlying field of life.
Different forms.
Different levels of complexity.
Same Source.
Human beings possess a fascinating combination of abilities that other organisms do not. We have mobility. Self-awareness. Complex senses. Abstract reasoning.
And perhaps most importantly…
Free will.
Yet free will can be a double-edged sword.
Because while we have the ability to move ourselves away from danger, we do not always recognize the path that leads to greater harmony or safety. Social conditioning, fear, distraction, and chronic stress can cloud our perception.
Our nervous systems become dysregulated.
Our awareness narrows.
We miss signals.
In The Journey we discuss how a balanced nervous system allows us to perceive subtle information that is constantly flowing through our environment. The body becomes more sensitive. Intuition sharpens. Synchronicities become easier to recognize.
The communication from the greater field of intelligence—the Source that animates all things—becomes clearer.
Just as the fig tree responds to light, moisture, and temperature, we respond to a vast web of energetic signals.
But when our nervous systems are overwhelmed, the signal gets lost in the noise.
In that sense, perhaps guidance is always present.
Perhaps the universe is constantly attempting to “move” us—gently nudging us through intuition, coincidences, bodily sensations, and unexpected opportunities.
But if we are distracted, stressed, or disconnected from our bodies…
We simply can’t hear it.
The fig tree does not need to interpret signs. It responds automatically to its environment.
We, on the other hand, must learn to listen.
When we cultivate stillness through meditation, mindful movement, or time in nature, something remarkable happens within the body. The nervous system shifts from a survival state into a state of regulation and coherence.
Our internal vibration changes.
And suddenly the world feels different.
Clearer.
More connected.
More alive.
Perhaps in those moments we begin to perceive the subtle ways the larger intelligence of life is supporting us.
Guiding us.
Protecting us.
Not by controlling us—free will remains intact—but by offering signals and opportunities.
In a sense, I am to the fig tree what those unseen guides may be to us.
Watching.
`,
  },
  {
    kind: "static",
    _id: "static-signs-symbols",
    slug: "signs-symbols-and-the-quiet-language-of-the-universe",
    title: "Signs, Symbols, and the Quiet Language of the Universe",
    publishedAt: "2026-04-10T12:00:00.000Z",
    coverSrc: SIGNS_SYNCHRONICITIES_COVER_SRC,
    coverImageClassName:
      "mb-10 w-full max-w-[21rem] mx-auto h-auto object-contain",
    bodyPlaceholder: `Having spent much of my career as an English teacher, I have always been naturally attuned to symbolism. In literature, symbolism allows writers to communicate meaning beneath the surface of words. A simple object—a rose, a storm, a door—can carry emotional or philosophical weight far beyond its literal presence on the page. Years of teaching novels and poetry trained my mind to look for these deeper layers. What does this represent? Why did the author choose this image? What message might be hidden here? Over time I realized that this habit of interpretation did not remain confined to the classroom. I began noticing symbolism everywhere—in song lyrics drifting through the car speakers, in animals crossing my path during a walk, in patterns appearing in everyday life.
This tendency is not unusual, nor is it mystical in and of itself. In fact, it is deeply human. Cognitive science tells us that one of the primary ways our brains process information is through associative learning—the formation of connections between experiences, images, and meanings. Our brains are pattern-recognition machines. Neural networks constantly scan our environment looking for relationships between things so that we can predict outcomes and make sense of the world around us. Psychologists often refer to this as pattern recognition or apophenia, the mind’s ability to detect meaningful connections in the environment. This capacity helped our ancestors survive. Recognizing patterns in animal tracks, weather changes, or seasonal plant cycles allowed early humans to anticipate danger and locate resources.
Across cultures and throughout history, human societies have interpreted these patterns symbolically. Ancient Egyptians associated the scarab beetle with rebirth and transformation. Indigenous cultures across North America recognized animals as carriers of wisdom, each representing certain qualities or teachings. In Greek mythology, the owl symbolized wisdom and was sacred to Athena. Even today, many people instinctively pause when a particular animal appears repeatedly in their lives or when a song lyric seems to arrive at exactly the right moment. Whether one views these events as psychological pattern recognition or as communication from a deeper intelligence, the fact remains that humans have always listened for meaning in the language of symbols.
For the first thirty-eight years of my life, however, I was not listening very carefully.
Like many people, I spent decades moving through the world in a fairly constant state of fight-or-flight. High anxiety, chronic stress, and a generalized sense of urgency had become my baseline. My nervous system was perpetually activated, scanning for problems to solve or dangers to avoid. In such a state, awareness narrows. The body’s survival mechanisms take priority over curiosity and reflection. Life becomes a series of tasks and obligations rather than an unfolding conversation with the world around us.
Then I discovered mindfulness.
Through meditation, breathing practices, and intentional shifts in the way I moved through daily life, something remarkable began to happen. My nervous system gradually settled. The background noise of anxiety softened. I learned to observe my thoughts rather than react to them. And in the quiet space that emerged, my awareness widened in ways I had never experienced before.
Suddenly, the world seemed full of signals.
Signs and synchronicities did not simply appear when I was actively searching for them. Instead, by moving through my days in a calmer and more regulated state, I began to notice that meaningful patterns were everywhere. Conversations aligned in curious ways. Books seemed to fall into my hands at exactly the right time. Symbols repeated themselves in such unlikely circumstances that they felt almost impossible to ignore.
One particularly persistent series of signs appeared during the early stages of developing what would eventually become The Opaline Owl.
At the age of fifty, I found myself standing at a curious threshold in life. My sons were growing independent and preparing to leave home. My career was approaching retirement. Hormones were shifting, perspectives were changing, and a subtle but undeniable sense of transformation was underway. For perhaps the first time in my life, I felt free from the invisible pressure to please everyone around me. Instead, a quiet question emerged: What comes next?
I had always been fascinated by spirituality, mysticism, the occult traditions, history, and even quantum physics—the ways in which science and spirituality sometimes seem to echo each other across vastly different languages. As this new phase of life began unfolding, I started considering whether these lifelong interests might guide me toward something deeper, something meaningful enough to become what the Japanese call ikigai.
Ikigai is often translated as “a reason for being.” It refers to the intersection of four elements: what you love, what you are good at, what the world needs, and what you can be rewarded for. When these four areas overlap, life begins to feel purposeful and aligned.
As I explored ideas about how my own ikigai might take shape, I occasionally consulted my tarot deck—a practice I have enjoyed for many years, less as fortune-telling and more as a symbolic mirror for reflection.
And that is when the card began appearing.
Again.
And again.
And again.
The Fool.
Within the tarot system, The Fool belongs to the Major Arcana, the set of cards that represent significant life archetypes and spiritual lessons. In the classic Rider-Waite-Smith deck, The Fool stands at the edge of a cliff, gazing upward with a small dog at his heels and a white rose in hand. He carries only a small bundle of belongings and steps forward with an air of joyful innocence. Contrary to what the name might suggest, The Fool is not foolish in the negative sense. Rather, the card symbolizes new beginnings, leaps of faith, and the willingness to step into the unknown with curiosity rather than fear.
It is the beginning of the tarot journey.
The moment before transformation begins.
Each time the card appeared, my mind returned to the same thought: This is a new beginning.
As if that were not enough symbolism, I began noticing visual elements connected to the Fool appearing in unexpected places—tiny jester bells on decorations, diamond patterns reminiscent of a jester’s costume, playful references in books or images that mirrored the archetype of stepping into something new.
Around the same time, another symbol began appearing with surprising frequency.
The owl.
Owls have always resonated deeply with me. In fact, one is permanently etched onto my upper arm in the form of a floral tattoo. To me, the owl represents wisdom, quiet perception, magic, and the ability to see what others overlook. It is a creature of stillness and observation, moving silently through the night while the rest of the world sleeps.
And suddenly… owls were everywhere.
They appeared on clothing worn by strangers in public places. They popped up in television commercials. Most strikingly, one day at my day job, an owl stared up at me from the cover of a magazine sitting directly on top of a stack of mail that had just arrived.
Then came the final piece of symbolism.
My birthstone is the opal, a gem famous for its shifting colors and luminous glow. During a week in which I was actively thinking about rebranding and naming this new venture, the word “opaline”—an uncommon adjective referring to the iridescent luster of an opal—appeared three separate times in entirely unrelated places. First in a Taylor Swift lyric. Then in a jewelry advertisement online. And finally as a descriptive word in a novel I happened to be reading before bed.
The Fool.
The owl.
Opaline.
Each symbol arriving independently, yet together forming a message that felt unmistakable.
Every time I encountered one of these signs, a small spark of excitement ignited inside me. The quiet voice of fear that often accompanies new ventures—the voice that whispers about failure, embarrassment, or uncertainty—began to soften. In its place emerged a reassuring sense that something larger than my own anxious mind was gently encouraging me forward.
And then something else happened.
The people I needed began appearing.
Not through aggressive networking or carefully planned outreach, but through what could only be described as perfectly timed encounters. One evening I found myself chatting casually with one of my husband’s clients. The conversation drifted toward social media algorithms and online platforms, and during the discussion I discovered that this individual happened to be a web developer. I had not intended to reveal my half-formed ideas about building a coaching business focused on connection to Source through nervous system mastery. Yet somehow the topic surfaced naturally.
Not only did he become the developer who would help build my website, but his wife—who shared a strong interest in the very topics I was exploring—became my go-to person for marketing insight.
A few days later, while walking through the mall, I ran into a friend who is a professional photographer. He paused, studied my newly changed hairstyle, and joked that such a transformation clearly called for updated portraits.
And just like that… I had the photographer.
The exact people I needed seemed to fall effortlessly into my orbit.
Looking back, I realize that a younger version of myself might have missed these moments entirely. When we move through life in a dysregulated nervous system state—caught in the constant churn of stress and urgency—we often rush through interactions without noticing the subtle opportunities unfolding within them.
But when the nervous system is calm and awareness is open, something extraordinary becomes possible.
We begin to notice the patterns.
We start to recognize the quiet language of symbols, synchronicities, and perfectly timed meetings that weave through everyday life.
Whether one interprets these experiences as the brain’s remarkable pattern-recognition abilities or as gentle nudges from a deeper Source intelligence guiding us along our path, the effect is the same.
Life begins to feel less random.
More connected.
And infinitely more meaningful.`,
  },
];

export function getStaticPostBySlug(
  slug: string
): StaticBlogPostDetail | undefined {
  return STATIC_BLOG_POSTS.find((p) => p.slug === slug);
}
