import "./style.css";

import "./tailwind.css";

import React from "react";
import logoUrl from "../assets/logo.svg";
import { Link } from "../components/Link.jsx";
import Footer from "@/components/Footer";

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto">
      <Sidebar>
        <Logo />
        <Link href="/">Home</Link>
        {/* <Link href="/todo">Todo</Link>
        <Link href="/star-wars">Data Fetching</Link> */}
        <Link href="/login">Login</Link>
        <Link href="/plan">Plan</Link>
        <Link href="/explore">Explore</Link>
      </Sidebar>
      <Content>{children}</Content>
      <Footer />
    </div>
  );
}

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="sidebar"
      className={"p-5 flex flex-col shrink-0 border-r-2 border-r-gray-200"}
    >
      {children}
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-container">
      <div id="page-content" className={"p-5 pb-12 min-h-screen"}>
        {children}
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className={"p-5 mb-2"}>
      <a href="/">
        <img src={logoUrl} height={64} width={64} alt="logo" />
      </a>
    </div>
  );
}
