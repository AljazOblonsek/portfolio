import Link from 'next/link';

const Header = () => (
  <header>
    <nav className="flex justify-between">
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold hover:text-violet-600">
          Aljaz Oblonsek
        </Link>
      </div>
      <div className="flex items-center">
        <Link href="/about" className="mr-4 text-xl hover:text-violet-600">
          About
        </Link>
        <Link href="/posts" className="text-xl hover:text-violet-600">
          Blog
        </Link>
      </div>
    </nav>
  </header>
);

export default Header;
