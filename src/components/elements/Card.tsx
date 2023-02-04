import Link from "next/link";
import { type ReactElement } from "react";

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
    <Link href={href} target="_blank">
      <div className="flex max-w-xs flex-col gap-4 truncate rounded-xl bg-white/10 p-4 py-2 text-white hover:bg-white/20">
        <h3 className="text-2xl font-bold">{header}</h3>
        <div className="block overflow-hidden overflow-ellipsis whitespace-nowrap text-lg">
          {body}
        </div>
      </div>
    </Link>
  );
};

export default Card;
