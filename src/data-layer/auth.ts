import { storage } from "@/lib/storage";
import z from "zod";
import { $fetch } from "./fetch";

type LoginArgs = {
	phone_num: string;
	password: string;
};
const LoginOutputSchema = z.object({
	refresh: z.string(),
	access: z.string(),
});

function login(loginArgs: LoginArgs) {
	return $fetch("/user/token/", {
		method: "post",
		body: loginArgs,
		output: LoginOutputSchema,
	});
}

type RegisterArgs = {
	email: string;
	phone_num: string;
	full_name: string;
	password2: string;
	password: string;
};
const RegisterOutputSchema = z.object({});

function register(registerArgs: RegisterArgs) {
	return $fetch("/user/register/", {
		method: "post",
		body: registerArgs,
		output: RegisterOutputSchema,
	});
}

const ProfileOutputSchema = z.object({
	full_name: z.string(),
});
function profile() {
	const token = storage.getToken();

	return $fetch("/user/profile/", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		output: ProfileOutputSchema,
	});
}

export const auth = { login, register, profile };
