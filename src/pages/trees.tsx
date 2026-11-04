import { Link } from "react-router-dom";
import { PageHero } from "@/components";
import { cn } from "@/lib";

type Tree = {
  name: string;
  about: string;
  leaves: string;
  bark: string;
};

type TreeGroup = {
  id: string;
  title: string;
  intro: string;
  // "Needles" for evergreens, "Leaves" for the rest
  leafLabel: string;
  // Full class string (not built from parts) so Tailwind can detect it
  accent: string;
  trees: Tree[];
};

// TODO: audio and translations. Every string below is English-only for now.
// Keeping the copy in data makes it easy to swap in French / Mi'kmaq text and
// to attach an <AudioButton /> to each group intro and tree description.
const treeGroups: TreeGroup[] = [
  {
    id: "evergreens",
    title: "Evergreens",
    intro:
      "These trees stay green all year, so they’re the ones that stand out on a winter walk. Check the needles first, then the bark.",
    leafLabel: "Needles",
    accent: "border-forest-700 dark:border-sage-300",
    trees: [
      {
        name: "Red spruce",
        about:
          "Red spruce is Nova Scotia’s provincial tree and a backbone of the Acadian forest. Trees can stand for centuries.",
        leaves:
          "Short, stiff, and four-sided, so you can roll one between your fingers.",
        bark: "Reddish-brown to grey, breaking into thin scales.",
      },
      {
        name: "Balsam fir",
        about:
          "The classic Christmas-tree smell comes from balsam fir. Its cones stand upright on the branches instead of hanging down.",
        leaves: "Flat, soft, and blunt, with two pale stripes underneath.",
        bark: "Smooth and grey on young trees, with small resin blisters you can feel.",
      },
      {
        name: "Eastern hemlock",
        about:
          "Hemlocks grow well in deep shade and can live for centuries. Their dense branches shelter birds and other animals in winter.",
        leaves: "Very short and flat, with two white stripes underneath.",
        bark: "Brown to grey, with deep ridges on older trees.",
      },
      {
        name: "Eastern white pine",
        about:
          "White pines can grow taller than the trees around them, so they often poke up above the canopy.",
        leaves: "Long, soft, and bundled in groups of five.",
        bark: "Smooth and greenish on young trees, deeply furrowed on old ones.",
      },
    ],
  },
  {
    id: "changing-leaves",
    title: "Trees that drop their leaves",
    intro:
      "These trees change with the seasons. Look at leaf shape in summer, colour in fall, and bark once the branches are bare.",
    leafLabel: "Leaves",
    accent: "border-sage-500",
    trees: [
      {
        name: "Red maple",
        about:
          "One of the first trees to show colour each year, with red flowers in spring and bright red leaves in fall. It grows in both wet and dry soil.",
        leaves: "Three main lobes with toothed edges and pale undersides.",
        bark: "Smooth and grey when young, dark and ridged with age.",
      },
      {
        name: "Yellow birch",
        about:
          "Snap a fallen twig and sniff it: yellow birch smells like wintergreen. Young trees often start out growing on old stumps and logs.",
        leaves: "Oval with a pointed tip and sharply toothed edges.",
        bark: "Shiny yellow-bronze, curling off in thin strips.",
      },
      {
        name: "White birch",
        about:
          "Also called paper birch. It grows back quickly after a forest is cleared or disturbed, so it is often one of the first trees to return.",
        leaves: "Oval to triangular, with double-toothed edges.",
        bark: "Bright white and peeling in papery sheets. Please leave it on the tree.",
      },
      {
        name: "Tamarack",
        about:
          "A conifer that turns gold in fall and then drops its needles. Look for it in wet ground, like bogs and swamp edges.",
        leaves: "Soft needles in tufts along short, stubby twigs.",
        bark: "Reddish-brown and flaky.",
      },
    ],
  },
];

const seasons = [
  {
    title: "Spring",
    text: "Buds swell, and red maple flowers give the treetops a red haze before the leaves open.",
  },
  {
    title: "Summer",
    text: "Full canopies shade the trail, and leaf shapes are at their easiest to compare.",
  },
  {
    title: "Fall",
    text: "Red maples turn bright red, birches turn yellow, and tamaracks go gold before dropping their needles.",
  },
  {
    title: "Winter",
    text: "Evergreens stay green against bare branches, and bark patterns are easy to see.",
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

const TreesPage = () => {
  return (
    <main className="main text-forest-950 dark:text-cream-50">
      <PageHero
        title="Trees"
        description="Get to know the trees of the Acadian forest around St. Margaret’s Bay, and learn how to tell them apart."
      />

      <section aria-labelledby="trees-intro" className={shell}>
        <div className="flex flex-col gap-6">
          <h2 id="trees-intro" className={sectionHeading}>
            Reading the forest
          </h2>
          <p className={bodyCopy}>
            Telling trees apart is easier than it looks. Start with the needles
            or leaves, then check the bark. A few of the most common trees in
            the woodland are below.
          </p>
          <nav aria-label="Jump to a group of trees">
            <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {treeGroups.map((group) => (
                <li key={group.id}>
                  <a
                    href={`#${group.id}`}
                    className={cn(
                      "btn btn-primary w-full min-h-11 sm:w-auto",
                      focusOnPage,
                    )}
                  >
                    {group.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {treeGroups.map((group) => (
        <section
          key={group.id}
          id={group.id}
          aria-labelledby={`${group.id}-heading`}
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
              <h2 id={`${group.id}-heading`} className={sectionHeading}>
                {group.title}
              </h2>
              <p className={bodyCopy}>{group.intro}</p>
            </div>

            <ul className="flex flex-col gap-4 lg:col-span-3">
              {group.trees.map((tree) => (
                <li
                  key={tree.name}
                  className={cn(
                    "p-5",
                    "rounded-xl border-l-4 bg-cream-100/85",
                    "sm:p-6",
                    "dark:bg-forest-800/90",
                    group.accent,
                  )}
                >
                  <h3 className="nunito">{tree.name}</h3>
                  <p className="mt-2 text-base leading-relaxed">{tree.about}</p>
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
                      <dt className="font-bold">{group.leafLabel}</dt>
                      <dd>{tree.leaves}</dd>
                    </div>
                    <div className="sm:flex-1">
                      <dt className="font-bold">Bark</dt>
                      <dd>{tree.bark}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section aria-labelledby="seasons-heading" className={cn(shell, "mb-20")}>
        <div
          className={cn(
            "flex flex-col gap-8 p-6",
            "rounded-4xl border border-transparent bg-forest-800 text-cream-50",
            "sm:p-8 lg:p-10",
            "dark:border-cream-300/20 dark:bg-forest-950",
          )}
        >
          <div className="flex flex-col gap-4">
            <h2 id="seasons-heading" className={sectionHeading}>
              What to look for through the year
            </h2>
            <p className={bodyCopy}>
              The same trail looks different in every season. Come back and see
              how many of these trees you can name.
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
            {seasons.map((season) => (
              <li
                key={season.title}
                className="pt-4 border-t border-cream-300/20"
              >
                <h3 className="text-xl font-bold tracking-tight">
                  {season.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed">{season.text}</p>
              </li>
            ))}
          </ul>

          <Link
            to="/animals"
            className={cn(
              "btn btn-secondary w-full min-h-13 md:w-auto md:self-start",
              focusOnDark,
            )}
          >
            Meet the animals
          </Link>
        </div>
      </section>
    </main>
  );
};

export { TreesPage };
