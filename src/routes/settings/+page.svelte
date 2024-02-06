<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { onMount } from 'svelte';
	import { Eye, EyeOff } from 'lucide-svelte';

	let openaiShow = false;
	let replicateShow = false;

	let openAiKey = '';
	let replicateKey = '';

	onMount(() => {
		if (localStorage.getItem('openai')) {
			openAiKey = localStorage.getItem('openai') as string;
		}
		if (localStorage.getItem('replicate')) {
			replicateKey = localStorage.getItem('replicate') as string;
		}
	});
</script>

<div class="grid w-1/2 gap-4 p-5">
	<div class="space-y-2">
		<Label class="text-right">OpenAI</Label>
		<div class="flex items-center justify-between gap-4">
			<Input
				type={openaiShow ? 'text' : 'password'}
				id="name"
				bind:value={openAiKey}
				class="col-span-3"
			/>
			<Button
				on:click={() => (openaiShow = !openaiShow)}
				size="sm"
				class="size-9 p-2"
				variant="secondary"
			>
				{#if openaiShow}
					<Eye />
				{:else}
					<EyeOff />
				{/if}
			</Button>
		</div>
	</div>
	<div class="space-y-2">
		<Label class="text-right">Replicate</Label>
		<div class="flex items-center justify-between gap-4">
			<Input
				type={replicateShow ? 'text' : 'password'}
				id="username"
				bind:value={replicateKey}
				class="col-span-3"
			/>
			<Button
				on:click={() => (replicateShow = !replicateShow)}
				size="sm"
				class="size-9 p-2"
				variant="secondary"
			>
				{#if replicateShow}
					<Eye />
				{:else}
					<EyeOff />
				{/if}
			</Button>
		</div>
	</div>
	<Button
		type="submit"
		class="w-fit"
		on:click={() => {
			localStorage.setItem('openai', openAiKey);
			localStorage.setItem('replicate', replicateKey);
		}}>Save</Button
	>
</div>

<div class="p-5">
	Created by <a
		href="https://prabhukirankonda.vercel.app"
		class="text-sky-500 underline underline-offset-8"
		rel="noopener noreferrer"
		target="_blank">Prabhu Kiran Konda</a
	>
</div>
