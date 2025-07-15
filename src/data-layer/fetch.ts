import { createFetch } from "@better-fetch/fetch";

export const $fetch = createFetch({
	baseURL: "https://sepehrtech.pythonanywhere.com",
	throw: true,
	retry: {
		type: "linear",
		attempts: 2,
		delay: 1000,
	},
});
