import { Books } from "@/components/books";
import { Logout } from "@/components/logout";
import { Profile } from "@/components/profile";
import { storage } from "@/lib/storage";

import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
	loader() {
		const token = storage.getToken();

		if (!token) {
			throw redirect({ to: "/login" });
		}
	},
});

function App() {
	return (
		<main>
			<div className="m-3 flex items-center justify-between">
				<Profile />
				<Logout />
			</div>
			<Books />
		</main>
	);
}
