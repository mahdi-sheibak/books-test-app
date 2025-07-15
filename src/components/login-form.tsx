import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/data-layer/auth";
import { storage } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import z from "zod";

const LoginSchema = z.object({
	phone_num: z.string().min(10),
	password: z.string().min(4),
});

const LoginErrorSchema = z
	.object({
		detail: z.string().optional(),
	})
	.nullable()
	.optional();

export function LoginForm() {
	const navigate = useNavigate();

	const { mutateAsync: loginMutation, error } = useMutation({
		mutationFn: auth.login,
		onSuccess(data) {
			storage.setToken(data.access);
			navigate({ to: "/" });
		},
	});

	const loginError = LoginErrorSchema.parse(error?.cause);

	const form = useForm({
		defaultValues: {
			phone_num: "",
			password: "",
		},
		validators: {
			onSubmit: LoginSchema,
		},
		async onSubmit({ value }) {
			await loginMutation(value);
		},
	});

	return (
		<div className={cn("flex flex-col gap-6")}>
			<Card>
				<CardHeader>
					<CardTitle>ورود به حساب</CardTitle>
					<CardDescription>
						برای ورود به حساب کاربری، شماره خود را در زیر وارد کنید.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
					>
						<div className="flex flex-col gap-6">
							<form.Field
								name="phone_num"
								children={(field) => (
									<div className="grid gap-3">
										<Label htmlFor="phone_num">شماره تلفن</Label>
										<div>
											<Input
												data-valid={field.state.meta.isValid}
												className="data-[valid=false]:border-red-300"
												id="phone_num"
												type="text"
												placeholder="09111101100"
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
											/>
											{!field.state.meta.isValid && (
												<em className="text-sm text-red-600">
													{field.state.meta.errors
														.map((e) => e?.message)
														.join(",")}
												</em>
											)}
										</div>
									</div>
								)}
							/>
							<form.Field
								name="password"
								children={(field) => (
									<div className="grid gap-3">
										<div className="flex items-center">
											<Label htmlFor="password">رمز عبور</Label>
										</div>
										<div>
											<Input
												data-valid={field.state.meta.isValid}
												className="data-[valid=false]:border-red-300"
												id="password"
												type="password"
												placeholder="test"
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
											/>
											{!field.state.meta.isValid && (
												<em className="text-sm text-red-600">
													{field.state.meta.errors
														.map((e) => e?.message)
														.join(",")}
												</em>
											)}
										</div>
									</div>
								)}
							/>
							<p className="text-red-500" dir="ltr">
								{loginError?.detail}
							</p>
							<div className="flex flex-col gap-3">
								<Button
									type="submit"
									className="w-full"
									disabled={form.state.isSubmitting}
								>
									ورود
								</Button>
							</div>
						</div>
						<div className="mt-4 text-center text-sm">
							حساب کاربری ندارید؟{" "}
							<Link to="/register" className="underline underline-offset-4">
								ثبت نام کنید
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
