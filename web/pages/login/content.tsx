import { Button } from "@/components/ui/button";
import { ContentContainer } from "@/components/common/contentContainer";
import { LogInForm } from "./loginForm";
import { useState } from "react";
import { LoadingOverlay } from "@/components/common/loadingOverlay";
import { navigate } from "vike/client/router";

export function Content() {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const startLoading = () => setIsLoading(true);
	const stopLoading = () => setIsLoading(false);

	if (isLoading) {
		return <LoadingOverlay />;
	}
	return (
		<ContentContainer>
			<LogInForm
				onMutateCallback={startLoading}
				onSettledCallback={stopLoading}
			/>
			<Button
				type="button"
				variant="link"
				onClick={() => navigate("/signup")}
				className="mx-auto"
			>
				<span>
					No account? <b>Sign up</b>
				</span>
			</Button>
		</ContentContainer>
	);
}
