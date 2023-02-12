import Link from "next/link";
import Image from "next/image";
import { type ReactElement } from "react";

const ArticleIcon = () => {
  return (
    <span className="inline-flex items-center rounded bg-fuchsia-800 px-2.5 py-0.5 text-xs font-medium text-white">
      <svg
        className="mr-1 h-3 w-3"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
          clipRule="evenodd"
        ></path>
        <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
      </svg>
      Article
    </span>
  );
};

const Card = ({
  href,
  header,
  body,
}: {
  href: string;
  header: string;
  body: string | ReactElement;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <article className="rounded-lg border border-gray-700 bg-white/10 p-6 text-white">
        <div className="mb-5 flex items-center justify-between text-gray-500">
          <ArticleIcon />
          <span className="text-sm">7 days ago</span>
        </div>
        <Link href={href} target="_blank">
          <h3 className="text-2xl font-bold xl:text-3xl">{header}</h3>
        </Link>
        <div className="block overflow-hidden overflow-ellipsis whitespace-nowrap py-6 font-light">
          {body}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              className="h-7 w-7 rounded-full bg-white/30"
              src="https://avatars.githubusercontent.com/u/6328360?s=96&v=4"
              width={28}
              height={28}
              alt="Mat Wilk avatar"
            />
            <span className="font-light text-white">Post Author</span>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 dark:text-primary-500 inline-flex items-center font-medium hover:underline"
          >
            Read more
            <svg
              className="ml-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </article>
    </div>
  );
};

export default Card;
