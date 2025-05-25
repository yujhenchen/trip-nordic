import { Link } from "@radix-ui/react-navigation-menu";
import { ProfileDropdown } from "./profileDropdown";
import { usePageContext } from "vike-react/usePageContext";

export function ProfileMenuItem() {
	const pageContext = usePageContext();

	return (
		<>
			{pageContext.user ? (
				<ProfileDropdown trigger={<span>Welcome</span>} />
			) : (
				<Link href="/login">Login</Link>
			)}
		</>
	);
}
