import { NavLink } from "react-router-dom";

const Header = () => {
  const navLinks = [
    { label: "Explore", href: "/explore" },
    { label: "Animals", href: "/animals" },
    { label: "Trees", href: "/trees" },
    { label: "About", href: "/about" },
  ];

  return (
    <header className="border-b border-black bg-green-600 text-gray-900">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
        <h1 className="text-2xl font-semibold">Woodland Conservation Area</h1>

        <nav aria-label="Main navigation" className="flex flex-wrap gap-1">
          {navLinks.map(({ label, href }) => (
            <NavLink
              key={href}
              to={href}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 hover:bg-green-400 ${
                  isActive ? "bg-green-400 font-medium" : ""
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export { Header };
