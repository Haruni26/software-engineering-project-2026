const Header = () => {
  const navLinks = [
    { label: "Explore", href: "/explore" },
    { label: "Animals", href: "/animals" },
    { label: "Trees", href: "/trees" },
    { label: "About", href: "/about" },
  ];

  return (
    <header>
      <h1 className="p-3 text-2xl bg-yellow-200">Woodland Conservation Area</h1>
      <nav aria-label="Main navigation">
        {navLinks.map(({ label, href }) => (
          <a key={href} href={href} className="p-3 hover:underline">
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
};

export { Header };
