import { Link } from "react-router-dom";
import { PageHero } from "@/components";
import { cn } from "@/lib";

type Animal = {
  name: string;
  about: string;
  lookFor: string;
  bestTime: string;
};

type Habitat = {
  id: string;
  title: string;
  intro: string;
  // Full class string (not built from parts) so Tailwind can detect it
  accent: string;
  animals: Animal[];
};

// TODO: audio and translations. Every string below is English-only for now.
// Keeping the copy in data makes it easy to swap in French / Mi'kmaq text and
// to attach an <AudioButton /> to each habitat intro and animal description.
const habitats: Habitat[] = [
  {
    id: "in-the-trees",
    title: "In the trees",
    intro:
      "Look up and listen. Trunks, branches, and hollow trees give birds and squirrels food, shelter, and a place to nest.",
    accent: "border-sage-500",
    animals: [
      {
        name: "Barred owl",
        about:
          "Listen for a call that sounds like “who cooks for you?” Barred owls nest in hollow trees, so old trees with cavities matter to them.",
        lookFor:
          "A round face, dark eyes, and brown-and-white streaks on the chest.",
        bestTime: "Dusk and after dark.",
      },
      {
        name: "Pileated woodpecker",
        about:
          "Among the largest woodpeckers in North America, it chisels rectangular holes in dead and dying trees to reach ants and beetle larvae. Other animals move into those holes later.",
        lookFor:
          "A bright red crest, a loud ringing call, and fresh wood chips at the base of a tree.",
        bestTime: "Daytime, especially in the morning.",
      },
      {
        name: "Red squirrel",
        about:
          "Red squirrels stash spruce and pine cones in piles called middens and scold anyone who gets too close. Those caches feed them through winter.",
        lookFor:
          "A small reddish-brown squirrel and heaps of cone scales at the base of a tree.",
        bestTime: "Daytime, all year. They don’t hibernate.",
      },
    ],
  },
  {
    id: "on-the-forest-floor",
    title: "On the forest floor",
    intro:
      "Trails, fallen logs, and berry patches are busy places, mostly at the edges of the day.",
    accent: "border-forest-700 dark:border-sage-300",
    animals: [
      {
        name: "White-tailed deer",
        about:
          "Deer browse on twigs, buds, and leaves, and follow the same trails again and again. A fawn resting alone in the grass in early summer isn’t abandoned. Its mother is usually nearby.",
        lookFor:
          "Tracks shaped like two pointed halves, and a white tail flashing as they bound away.",
        bestTime: "Dawn and dusk.",
      },
      {
        name: "Black bear",
        about:
          "The black bear is the only bear in Nova Scotia. It eats berries, plants, insects, and whatever else it can find, and spends the coldest part of winter in a den.",
        lookFor: "Claw marks on tree bark and logs that have been rolled over.",
        bestTime:
          "Early morning and evening from spring to fall. Sightings are rare.",
      },
      {
        name: "Snowshoe hare",
        about:
          "Big hind feet help the snowshoe hare move on snow, and its coat turns from brown to white in winter so it blends in.",
        lookFor:
          "Long, oval hind-foot tracks in the snow and thickets of young trees where it hides.",
        bestTime: "Dusk, night, and dawn.",
      },
    ],
  },
  {
    id: "at-the-waters-edge",
    title: "At the water’s edge",
    intro:
      "Streams, ponds, and wet ground attract animals that need clean water to feed and breed.",
    accent: "border-mist-300",
    animals: [
      {
        name: "River otter",
        about:
          "Otters hunt fish, frogs, and other small water animals, and they slide down muddy or snowy banks. Clean water is what keeps them here.",
        lookFor:
          "A long, dark, sleek body, a thick tail, and slide marks on the bank.",
        bestTime: "Early morning and evening.",
      },
      {
        name: "Wood turtle",
        about:
          "Wood turtles are a species at risk. They spend much of the year in clear streams and wander the nearby forest in summer. If you find one, give it space and keep dogs away.",
        lookFor:
          "A bumpy, ridged shell and orange or yellow skin on the neck and legs.",
        bestTime: "Warm days from spring to early fall.",
      },
      {
        name: "Spring peeper",
        about:
          "This tiny frog is much easier to hear than to see. In spring, males call from wetlands and pond edges, and a whole group sounds like sleigh bells.",
        lookFor: "A small tan frog with a darker X on its back.",
        bestTime: "Spring evenings, once the ice is off the ponds.",
      },
    ],
  },
];

const visitorTips = [
  {
    title: "Give them space",
    text: "Watch from a distance and let animals move on their own. If you see a bear, stay calm, back away slowly, and don’t run.",
  },
  {
    title: "Never feed wildlife",
    text: "Human food can make animals sick and teaches them to look for people.",
  },
  {
    title: "Keep dogs on a leash",
    text: "Dogs can frighten wildlife, disturb nests, and get into trouble with animals like porcupines and bears.",
  },
  {
    title: "Stay on the trail",
    text: "Marked trails keep nests, dens, and young plants from being trampled.",
  },
];

const shell = "w-full max-w-340 mx-auto px-4 sm:px-6 lg:px-8";
const sectionHeading =
  "text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl";
const bodyCopy = "max-w-xl text-base leading-relaxed sm:text-lg";
const focusOnPage =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-800 dark:focus-visible:outline-cream-300";
const focusOnDark =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream-50";

export const AnimalsPage = () => {
  return (
    <main className="main text-forest-950 dark:text-cream-50">
      <PageHero
        title="Animals of the woodland"
        description="From the treetops to the stream bank, the woodland is full of animals going about their day. Learn who they are and how to share the space."
      />

      <section aria-labelledby="animals-intro" className={shell}>
        <div className="flex flex-col gap-6">
          <h2 id="animals-intro" className={sectionHeading}>
            Who lives in the woodland
          </h2>
          <p className={bodyCopy}>
            The forest around St. Margaret’s Bay has layers, and each one has
            its own residents. Pick a layer to see who lives there, what to look
            for, and when you’re most likely to spot them.
          </p>
          <nav aria-label="Jump to a habitat">
            <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {habitats.map((habitat) => (
                <li key={habitat.id}>
                  <a
                    href={`#${habitat.id}`}
                    className={cn(
                      "btn btn-primary w-full min-h-11 sm:w-auto",
                      focusOnPage,
                    )}
                  >
                    {habitat.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {habitats.map((habitat) => (
        <section
          key={habitat.id}
          id={habitat.id}
          aria-labelledby={`${habitat.id}-heading`}
          className={cn(shell, "scroll-mt-28")}
        >
          <div
            className={cn(
              "grid grid-cols-1 gap-8 p-6",
              "rounded-4xl bg-sage-100 text-forest-950",
              "sm:p-8 lg:grid-cols-5 lg:gap-10 lg:p-10",
              "dark:bg-forest-600 dark:text-cream-50",
            )}
          >
            <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:col-span-2 lg:self-start">
              <h2 id={`${habitat.id}-heading`} className={sectionHeading}>
                {habitat.title}
              </h2>
              <p className={bodyCopy}>{habitat.intro}</p>
            </div>

            <ul className="flex flex-col gap-4 lg:col-span-3">
              {habitat.animals.map((animal) => (
                <li
                  key={animal.name}
                  className={cn(
                    "p-5",
                    "rounded-xl border-l-4 bg-cream-100/85",
                    "sm:p-6",
                    "dark:bg-forest-800/90",
                    habitat.accent,
                  )}
                >
                  <h3 className="nunito">{animal.name}</h3>
                  <p className="mt-2 text-base leading-relaxed">
                    {animal.about}
                  </p>
                  <dl
                    className={cn(
                      "flex flex-col gap-3 mt-4 pt-4",
                      "border-t border-forest-800/15",
                      "text-base leading-relaxed text-forest-800",
                      "sm:flex-row sm:gap-8",
                      "dark:border-cream-300/20 dark:text-muted-green-400",
                    )}
                  >
                    <div className="sm:flex-1">
                      <dt className="font-bold">Look for</dt>
                      <dd>{animal.lookFor}</dd>
                    </div>
                    <div className="sm:flex-1">
                      <dt className="font-bold">Best time</dt>
                      <dd>{animal.bestTime}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section aria-labelledby="respect-heading" className={cn(shell, "mb-20")}>
        <div
          className={cn(
            "flex flex-col gap-8 p-6",
            "rounded-4xl border border-transparent bg-forest-800 text-cream-50",
            "sm:p-8 lg:p-10",
            "dark:border-cream-300/20 dark:bg-forest-950",
          )}
        >
          <div className="flex flex-col gap-4">
            <h2 id="respect-heading" className={sectionHeading}>
              Meeting wildlife respectfully
            </h2>
            <p className={bodyCopy}>
              Most animals hear you long before you see them. A few simple
              habits keep them safe and keep your visit calm.
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
            {visitorTips.map((tip) => (
              <li key={tip.title} className="pt-4 border-t border-cream-300/20">
                <h3 className="text-xl font-bold tracking-tight">
                  {tip.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed">{tip.text}</p>
              </li>
            ))}
          </ul>

          <Link
            to="/trees"
            className={cn(
              "btn btn-secondary w-full min-h-13 md:w-auto md:self-start",
              focusOnDark,
            )}
          >
            Meet the trees
          </Link>
        </div>
      </section>
    </main>
  );
};
