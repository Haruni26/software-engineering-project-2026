import { Link } from "react-router-dom";
import { PageHero } from "@/components";
import { cn } from "@/lib";

type CareItem = {
  title: string;
  text: string;
};

type TeamRole = {
  role: string;
  name?: string;
  about: string;
};

// TODO: audio and translations. Every string below is English-only for now.
// Keeping the copy in data makes it easy to swap in French / Mi'kmaq text and
// to attach an <AudioButton /> to each block of copy.
const careItems: CareItem[] = [
  {
    title: "The forest",
    text: "Red spruce, balsam fir, hemlock, and birch make up an Acadian forest. Old trees and fallen logs stay where they are, because they feed and shelter other living things.",
  },
  {
    title: "Streams and wetlands",
    text: "Clean water moves through the woodland on its way to the bay. Wetlands filter and store it, and they are home to frogs, turtles, and otters.",
  },
  {
    title: "Wildlife",
    text: "From owls to deer, animals need room to feed, nest, and travel. Protecting large, connected areas of habitat gives them that room.",
  },
  {
    title: "Visitors",
    text: "Families, visitors, and learners are welcome on the trails. We want everyone to leave knowing a little more about the woodland than when they arrived.",
  },
];

// TODO: add a name for each role once the team is confirmed
const team: TeamRole[] = [
  {
    role: "Land steward",
    about:
      "Keeps an eye on the health of the forest, streams, and wildlife, and decides where and how the land is cared for.",
  },
  {
    role: "Trail and visitor services",
    about:
      "Looks after the trails and signs, and is the friendly face for anyone planning or taking a visit.",
  },
  {
    role: "Education and programs",
    about:
      "Plans school visits, guided walks, and the activities for kids, and turns what we learn about the woodland into stories.",
  },
  {
    role: "Volunteer coordinator",
    about:
      "Organizes trail days, clean-ups, and planting, and helps neighbours find a way to pitch in.",
  },
];

const shell = "w-full max-w-340 mx-auto px-4 sm:px-6 lg:px-8";
const sectionHeading =
  "text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl";
const bodyCopy = "max-w-xl text-base leading-relaxed sm:text-lg";
const focusOnDark =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream-50";

const AboutPage = () => {
  return (
    <main className="main text-forest-950 dark:text-cream-50">
      <PageHero
        title="About"
        description="Learn about the woodland, the people who look after it, and why St. Margaret’s Bay is worth protecting."
      />

      <section aria-labelledby="about-intro" className={shell}>
        <div className="flex flex-col gap-6">
          <h2 id="about-intro" className={sectionHeading}>
            A woodland on the bay
          </h2>
          <p className={bodyCopy}>
            Woodland Conservation Area protects forest, streams, and wetlands on
            the shore of St. Margaret’s Bay, a short drive west of Halifax on
            Nova Scotia’s Atlantic coast.
          </p>
          <p className={bodyCopy}>
            It is a place to walk, listen, and learn, for families, visitors,
            and anyone curious about the Acadian forest.
          </p>
          <p
            className={cn(
              "max-w-xl pl-4",
              "border-l-4 border-forest-700",
              "text-base leading-relaxed text-forest-800",
              "dark:border-sage-300 dark:text-muted-green-400",
            )}
          >
            St. Margaret’s Bay is part of Mi’kma’ki, the ancestral and unceded
            territory of the Mi’kmaq. We are grateful to care for and learn from
            this land.
          </p>
        </div>
      </section>

      <section aria-labelledby="care-heading" className={shell}>
        <div
          className={cn(
            "grid grid-cols-1 gap-8 p-6",
            "rounded-4xl bg-sage-100 text-forest-950",
            "sm:p-8 lg:grid-cols-5 lg:gap-10 lg:p-10",
            "dark:bg-forest-600 dark:text-cream-50",
          )}
        >
          <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:col-span-2 lg:self-start">
            <h2 id="care-heading" className={sectionHeading}>
              What we look after
            </h2>
            <p className={bodyCopy}>
              The land is a patchwork of forest, water, and rock, and every part
              of it depends on the others.
            </p>
          </div>

          <ul className="flex flex-col gap-4 lg:col-span-3">
            {careItems.map((item) => (
              <li
                key={item.title}
                className={cn(
                  "p-5",
                  "rounded-xl border-l-4 border-sage-500 bg-cream-100/85",
                  "sm:p-6",
                  "dark:bg-forest-800/90",
                )}
              >
                <h3 className="nunito">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="team-heading" className={shell}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 id="team-heading" className={sectionHeading}>
              Meet the team
            </h2>
            <p className={bodyCopy}>
              A small group of stewards, educators, and volunteers looks after
              the woodland and welcomes everyone who visits.
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
            {team.map((member) => (
              <li
                key={member.role}
                className="pt-4 border-t border-forest-800/15 dark:border-cream-300/20"
              >
                <h3 className="nunito">{member.role}</h3>
                {member.name && (
                  <p className="mt-1 text-base font-bold text-forest-800 dark:text-muted-green-400">
                    {member.name}
                  </p>
                )}
                <p className="mt-2 text-base leading-relaxed">{member.about}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="visit-heading" className={cn(shell, "mb-20")}>
        <div
          className={cn(
            "flex flex-col gap-8 p-6",
            "rounded-4xl border border-transparent bg-forest-800 text-cream-50",
            "sm:p-8 lg:p-10",
            "dark:border-cream-300/20 dark:bg-forest-950",
          )}
        >
          <div className="flex flex-col gap-4">
            <h2 id="visit-heading" className={sectionHeading}>
              Come and see it for yourself
            </h2>
            <p className={bodyCopy}>
              The trails are open to everyone. Plan your visit, or get in touch
              if you have a question.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/visit"
              className={cn(
                "btn btn-secondary w-full min-h-13 sm:w-auto",
                focusOnDark,
              )}
            >
              Plan your visit
            </Link>
            <Link
              to="/contact"
              className={cn(
                "btn btn-secondary w-full min-h-13 sm:w-auto",
                focusOnDark,
              )}
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export { AboutPage };
