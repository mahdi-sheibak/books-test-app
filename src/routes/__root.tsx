// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
	queryClient: QueryClient;
}

import * as z from "zod";
import { fa } from "zod/locales";

z.config(fa());

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => (
		<>
			<Outlet />
			{/* <TanStackRouterDevtools /> */}
			{/* <ReactQueryDevtools buttonPosition="bottom-right" /> */}
		</>
	),
});
