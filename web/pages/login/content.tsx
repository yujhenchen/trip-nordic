import { Button } from "@/components/ui/button";
import { LogInForm } from "./logInForm";
import { ContentContainer } from "@/components/common/ContentContainer";

export function Content() {
	return (
		<ContentContainer>
			<LogInForm />
			<Button
				type="button"
				variant="link"
				onClick={() => location.assign("/signup")}
				className="mx-auto"
			>
				<span>
					No account? <b>Sign up</b>
				</span>
			</Button>
		</ContentContainer>
	);
}
