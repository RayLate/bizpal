import React from 'react';

interface VerticalNavProps {
  links: { label: string; href: string }[];
}

const VerticalNav: React.FC<VerticalNavProps> = ({ links }) => {
  return (
    <nav className="nav-pane">
      {links.map((link, index) => (
        <a key={index} href={link.href}>
          {link.label}
        </a>
      ))}
    </nav>
  );
};

export default VerticalNav;