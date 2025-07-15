import { auth } from "@/data-layer/auth";
import { useQuery } from "@tanstack/react-query";

export function Profile() {
	const { data } = useQuery({
		queryKey: ["profile"],
		queryFn: auth.profile,
	});

	return <div>{data?.full_name}</div>;
}
