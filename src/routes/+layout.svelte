<script lang="ts">
	import { Navbar, Sidebar } from '$lib/components/site';
	import '../app.pcss';
</script>

<div class="h-[96vh]">
	<div
		class="z-10 hidden h-full border-r border-foreground/10 lg:fixed lg:inset-y-0 lg:flex lg:w-72"
	>
		<Sidebar />
	</div>
	<main class="lg:pl-72">
		<div class="flex h-screen flex-col">
			<Navbar />
			<div class="mt-20 flex-grow">
				<slot />
			</div>
		</div>
	</main>
</div>
