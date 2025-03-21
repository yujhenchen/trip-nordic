import useAuthStore from "@/states/useAuthStore";
import { Link } from "@radix-ui/react-navigation-menu";
import { ProfileDropdown } from "./profileDropdown";

export function ProfileLink() {
	const { user } = useAuthStore();
	return (
		<>
			{user ? (
				<ProfileDropdown trigger={<span>Hello {user.email}</span>} />
			) : (
				<Link href="/login">Login</Link>
			)}
		</>
	);
}
