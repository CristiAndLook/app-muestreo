import Link from 'next/link';

const Sidebar = ({navLinks}) => {
  return (
    <aside>
    <nav>
      <ul>
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>
           {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
  );
}

export default Sidebar;