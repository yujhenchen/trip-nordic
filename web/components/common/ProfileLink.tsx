import useAuthStore from "@/states/useAuthStore";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "@radix-ui/react-navigation-menu";

export function ProfileLink() {
	const { user } = useAuthStore();
	return (
		<>
			{user ? (
				<Link href="/dashboard">Hello {user.email}</Link>
			) : (
				<Link href="/login">
					<Avatar>
						<AvatarImage
							src="https://placehold.co/150"
							className="rounded-full w-12 aspect-square"
						/>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</Link>
			)}
		</>
	);
}
