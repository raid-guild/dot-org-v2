import React from 'react';
import { Link, defaultTheme } from '@raidguild/design-system';

export interface NavLinkProps {
  item: {
    name: string;
    href: string;
  };
  basePath: string;
}

const NavLink: React.FC<NavLinkProps> = ({ item, basePath }) => {
  const isServices = item.name === 'Services';
  const isActive = basePath === item.href.split('/')[1];

  const hoverStyles = {
    opacity: '80%',
    borderBottom: `2px solid ${defaultTheme.colors.red[500]}`,
  };

  const linkStyles = {
    borderBottom: isActive && !isServices ? `2px solid ${defaultTheme.colors.red[500]}` : '',
    fontWeight: 600,
    color: defaultTheme.colors.primary[500],
  };

  return (
    <Link
      key={item.name}
      href={item.href}
      id={item.name}
      _hover={!isServices ? hoverStyles : { fontStyle: 'none' }}
      style={linkStyles}>
      {item.name}
    </Link>
  );
};

export default NavLink;
