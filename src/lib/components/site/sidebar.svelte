<script>
	import { page } from '$app/stores';
	import corgiTyping from '$lib/assets/corgi-typing.png';
	import { getRoutes } from '$lib/config';
	import { cn } from '$lib/utils';
	import { buttonVariants } from '../ui/button';
	import { Badge } from '$lib/components/ui/badge';

	let routes = getRoutes();
</script>

<div class="dark:grainy flex w-full flex-col">
	<div class="flex-1 px-3 py-2">
		<a href="/" class="mb-5 flex items-center gap-0 space-x-0">
			<div class="relative h-24 w-24">
				<img src={corgiTyping} alt="Corgi" />
			</div>
			<div>
				<h1 class="gfont text-4xl">Corgi</h1>
			</div>
		</a>
		<div class="-mt-2 space-y-1.5">
			{#each routes as route (route.href)}
				<a
					data-sveltekit-preload-data
					href={route.href}
					class={cn(
						buttonVariants({
							variant: 'ghost'
						}),
						'w-full',
						`${
							$page.url.pathname === route.href
								? 'bg-foreground/10 font-semibold tracking-wide text-foreground transition-all duration-500 hover:bg-foreground/5'
								: 'text-foreground/60 hover:bg-foreground/10'
						}`
					)}
				>
					<div class="relative flex flex-1 items-center gap-2">
						<svelte:component this={route.icon} class={cn('h-7 w-7', route.color)} />
						<div class="ml-2 flex w-full items-center justify-between">
							<div>
								{route.label}
							</div>
						</div>
						{#if route.status}
							<Badge class="absolute -right-2 top-0">{route.status}</Badge>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>
