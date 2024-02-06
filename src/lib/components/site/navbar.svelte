<script>
	import { page } from '$app/stores';
	import { getRoutes } from '$lib/config';
	import { cn } from '$lib/utils';
	import { Button } from '../ui/button';
	import * as Dialog from '$lib/components/ui/dialog';

	let routes = getRoutes(['/dashboard']);

	let open = false;
</script>

<div
	class="fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between border-b bg-white p-2 text-foreground/60 dark:bg-black lg:ml-72"
>
	<div class="flex-1">
		{#each routes as route (route.href)}
			<div class={$page.url.pathname === route.href ? 'ml-2 border-0 shadow-none' : 'hidden'}>
				<div class="flex items-center justify-between">
					<div class="flex items-center justify-center gap-3">
						<svelte:component
							this={route.icon}
							class={cn('h-8 w-8 rounded-lg p-1', route.color, route.background_color)}
						/>
						<div class="relative flex flex-col">
							<h1 class="text-foreground">{route.label}</h1>
							<p class="hidden text-sm text-muted-foreground md:block">
								{#if route.description}
									{route.description}
								{/if}
							</p>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
	<div class="flex items-center justify-center">
		<Button on:click={() => (open = true)}>About</Button>
	</div>
</div>

<Dialog.Root {open} onOpenChange={(e) => (open = !open)}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Corgi AI</Dialog.Title>
			<Dialog.Description>
				This is an experimental application built using tauri and sveltekit
			</Dialog.Description>
		</Dialog.Header>

		<div class="">
			<p>Find the source code here</p>
		</div>
	</Dialog.Content>
</Dialog.Root>
