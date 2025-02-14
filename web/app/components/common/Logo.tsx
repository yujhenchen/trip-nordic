import logoUrl from "../../assets/logo.svg";

export default function Logo() {
	return (
		<div className={"p-5 mb-2"}>
			<a href="/">
				<img src={logoUrl} height={64} width={64} alt="logo" />
			</a>
		</div>
	);
}
