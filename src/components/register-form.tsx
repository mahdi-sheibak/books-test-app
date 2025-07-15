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
import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import z from "zod";

const RegisterSchema = z.object({
	email: z.email(),
	phone_num: z.string().min(11),
	full_name: z.string().min(1),
	password2: z.string().min(4),
	password: z.string().min(4),
});

const RegisterErrorSchema = z
	.object({
		detail: z.string().optional(),
	})
	.nullable()
	.optional();

export function RegisterForm() {
	const navigate = useNavigate();

	const { mutateAsync: registerMutation, error } = useMutation({
		mutationFn: auth.register,
		onSuccess() {
			navigate({ to: "/login" });
		},
	});

	const registerError = RegisterErrorSchema.parse(error?.cause);

	const form = useForm({
		defaultValues: {
			email: "",
			phone_num: "",
			full_name: "",
			password2: "",
			password: "",
		},
		validators: {
			onSubmit: RegisterSchema,
		},
		async onSubmit({ value }) {
			await registerMutation(value);
		},
	});

	return (
		<div className={cn("flex flex-col gap-6")}>
			<Card>
				<CardHeader>
					<CardTitle>ساخت حساب</CardTitle>
					<CardDescription>
						برای ساخت حساب اطلاعات زیر را وارد کنید.
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
						<div className="flex flex-col gap-3">
							<form.Field
								name="email"
								children={(field) => (
									<div className="grid gap-2">
										<Label htmlFor="email">ایمیل</Label>
										<Input
											data-valid={field.state.meta.isValid}
											className="data-[valid=false]:border-red-300"
											id="email"
											type="email"
											placeholder="m@example.com"
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
								)}
							/>
							<form.Field
								name="phone_num"
								children={(field) => (
									<div className="grid gap-2">
										<Label htmlFor="phone_num">شماره تلفن</Label>
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
								)}
							/>
							<form.Field
								name="full_name"
								children={(field) => (
									<div className="grid gap-2">
										<Label htmlFor="fullName">نام و نام خانوادگی</Label>
										<Input
											data-valid={field.state.meta.isValid}
											className="data-[valid=false]:border-red-300"
											id="fullName"
											type="text"
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
								)}
							/>
							<form.Field
								name="password"
								children={(field) => (
									<div className="grid gap-2">
										<div className="flex items-center">
											<Label htmlFor="password">رمز عبور</Label>
										</div>
										<Input
											data-valid={field.state.meta.isValid}
											className="data-[valid=false]:border-red-300"
											id="password"
											type="password"
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
								)}
							/>
							<form.Field
								name="password2"
								children={(field) => (
									<div className="grid gap-2">
										<div className="flex items-center">
											<Label htmlFor="password2">تکرار رمز عبور</Label>
										</div>
										<Input
											data-valid={field.state.meta.isValid}
											className="data-[valid=false]:border-red-300"
											id="password2"
											type="password"
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
								)}
							/>
							<p className="text-red-500" dir="ltr">
								{registerError?.detail}
							</p>
							<div className="flex flex-col gap-3">
								<Button
									type="submit"
									className="w-full"
									disabled={form.state.isSubmitting}
								>
									ثبت نام
								</Button>
							</div>
						</div>
						<div className="mt-4 text-center text-sm">
							حساب کاربری دارید؟{" "}
							<Link to="/login" className="underline underline-offset-4">
								ورود به حساب
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
