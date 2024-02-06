<script>
	import { Badge } from '$lib/components/ui/badge';
	import { getRoutes } from '$lib/config';
	import { ArrowRight } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card';
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import { APIDialog } from '$lib/components/site';
	let routes = getRoutes(['/', '/settings']);

	let dialogOpen = false;
</script>

<div class="mb-8 mt-4 lg:mt-10">
	<div class="mb-8 flex w-full flex-col items-center space-y-2 p-3 text-center">
		<h2 class="text-center font-sans text-2xl font-extrabold text-foreground/90 md:text-4xl">
			Create anything, with AI
		</h2>
		<p class="text-sm text-muted-foreground">
			use our AI to create anything you want, from images to text, we got you covered
		</p>

		<div class="flex items-center justify-between pt-4">
			<Button
				class="transition-transform duration-200 ease-in-out active:scale-95"
				on:click={() => (dialogOpen = true)}>Configure API Keys</Button
			>
		</div>
	</div>
	<div class="w-full space-y-4 px-4 md:px-20 lg:px-32">
		{#each routes as route (route.href)}
			<a href={route.href} class="block cursor-pointer rounded-lg" data-sveltekit-preload-datay>
				<Card.Root class="hover:bg-foreground/5 dark:bg-foreground/5 dark:hover:bg-foreground/10">
					<Card.Header class="py-[21px]">
						<div class="flex items-center justify-between">
							<div class="flex items-center justify-center gap-5">
								<svelte:component this={route.icon} class={cn('h-8 w-8 rounded-lg', route.color)} />
								<div class="relative flex flex-col">
									{#if route.status}
										<Badge class="absolute -top-3 right-0">{route.status}</Badge>
									{/if}
									<h1>{route.label}</h1>
									<Card.Description>{route.description}</Card.Description>
								</div>
							</div>
							<ArrowRight class="h-6 w-6" />
						</div></Card.Header
					>
				</Card.Root>
			</a>
		{/each}
	</div>
</div>

<APIDialog bind:open={dialogOpen} />
