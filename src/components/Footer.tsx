const Footer = () => (
  <footer>
    <div className="flex items-center justify-between">
      <span>© Aljaz Oblonsek</span>
      <span className="flex items-center gap-3 text-sm">
        <a href="/rss.xml" className="hover:text-violet-600 hover:underline">
          RSS
        </a>
        <a href="/llms.txt" className="hover:text-violet-600 hover:underline">
          llms.txt
        </a>
      </span>
    </div>
  </footer>
);

export default Footer;
