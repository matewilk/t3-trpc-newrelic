import Link from "next/link";
import { useRouter } from "next/router";

const Navigation = () => {
  const { pathname } = useRouter();

  return (
    <header
      className={`fixed top-0 left-0 z-50 h-auto w-full border-b border-white border-opacity-20 bg-opacity-80 backdrop-blur backdrop-filter`}
    >
      <nav className="flex-grow px-5 text-center">
        <ul className="mb-0 inline-flex list-none gap-7 pl-0">
          <li className="inline-block align-middle">
            <Link
              href="/"
              className={`group relative inline-block cursor-pointer py-6 text-lg font-medium uppercase tracking-wider text-white ${
                pathname === "/" ? "text-[hsl(280,100%,70%)]" : ""
              }`}
            >
              Home
              <span className="absolute left-0 top-auto bottom-5 inline-block h-[2px] w-full origin-top-right scale-0 bg-white align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
            </Link>
          </li>
          <li className="inline-block align-middle">
            <Link
              href="/blog"
              className={`group relative inline-block cursor-pointer py-6 text-lg font-medium uppercase tracking-wider text-white ${
                pathname === "/blog" ? "text-[hsl(280,100%,70%)]" : ""
              }`}
            >
              Blog
              <span className="absolute left-0 top-auto bottom-5 inline-block h-[2px] w-full origin-top-right scale-0 bg-white align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
