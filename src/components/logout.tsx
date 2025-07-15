import { useNavigate } from "@tanstack/react-router";
import { Button } from "./ui/button";

export function Logout() {
	const navigate = useNavigate();

	const logout = () => {
		sessionStorage.clear();
		navigate({ to: "/login" });
	};
	return <Button onClick={logout}>خروج</Button>;
}
