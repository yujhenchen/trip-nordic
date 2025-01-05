import "./style.css";

import "./tailwind.css";

import PageContent from "@/components/common/PageContent";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="container mx-auto">
        <Header />
        <PageContent>{children}</PageContent>
        <Footer />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
