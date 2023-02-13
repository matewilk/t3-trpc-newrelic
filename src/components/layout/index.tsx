import { type PropsWithChildren, type ReactElement } from "react";
import Navigation from "./Navigation";

const Layout: PropsWithChildren<any> = ({
  children,
}: {
  children: ReactElement;
}) => {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <Navigation />
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
