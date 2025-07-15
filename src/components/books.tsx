import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { book } from "@/data-layer/books";
import { useQuery } from "@tanstack/react-query";

export function Books() {
	const { data: books, error } = useQuery({
		queryKey: ["books"],
		queryFn: book.getBooks,
	});

	console.log({ error });

	return (
		<section className="grid place-items-center mt-4">
			<div className="flex flex-col items-center gap-3 w-full px-3 md:w-1/2">
				{books?.results.map(({ title, description, category }) => (
					<Card key={title} className="w-full max-w-sm">
						<CardHeader>
							<CardTitle>{title}</CardTitle>
							<CardDescription>
								<Badge>{category}</Badge>
							</CardDescription>
						</CardHeader>
						<CardContent>{description}</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
}
