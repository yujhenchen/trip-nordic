import Logo from "./Logo";
import { Link } from "./Link";
import Sidebar from "./Sidebar";

export default function Header() {
  return (
    <header>
      <Sidebar>
        <Logo />
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/plan">Plan</Link>
        <Link href="/explore">Explore</Link>
      </Sidebar>
    </header>
  );
}
