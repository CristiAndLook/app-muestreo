import Sidebar from './Sidebar';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },

  
];

const PageLayout = ({ children }) => {
  return (
    <>
      <Sidebar navLinks={navLinks} />
      <main>{children}</main>
    </>
  );
};

export default PageLayout;