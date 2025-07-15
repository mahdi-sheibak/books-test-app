import z from "zod";
import { $fetch } from "./fetch";

const BooksOutputSchema = z.object({
	count: z.number(),
	results: z.array(
		z.object({
			title: z.string(),
			description: z.string(),
			image: z.string(),
			is_available: z.boolean(),
			price: z.number(),
			category: z.string(),
		}),
	),
});

function getBooks() {
	return $fetch("/books/?format=json", {
		output: BooksOutputSchema,
	});
}

export const book = { getBooks };
