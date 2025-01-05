import { ReactNode } from "react";

export default function PageContent({ children }: { children: ReactNode }) {
  return (
    <main id="page-container" className="p-5 pb-12 min-h-screen">
      {children}
    </main>
  );
}
