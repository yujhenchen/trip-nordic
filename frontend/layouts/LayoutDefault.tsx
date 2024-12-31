import "./style.css";

import "./tailwind.css";

import PageContent from "@/components/common/PageContent";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto">
      <Header />
      <PageContent>{children}</PageContent>
      <Footer />
    </div>
  );
}
