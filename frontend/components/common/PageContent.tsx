import clsx from "clsx";
import { ReactNode } from "react";

export default function PageContent({ children }: { children: ReactNode }) {
  return (
    <main id="page-container">
      <div
        id="page-content"
        className={clsx(
          "p-5 pb-12"
          // , "min-h-screen"
        )}
      >
        {children}
      </div>
    </main>
  );
}
