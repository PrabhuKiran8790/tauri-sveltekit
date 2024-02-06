<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Eye, EyeOff } from 'lucide-svelte';
	import { onMount } from 'svelte';

	// function asyncget_env(name: string) {
	//   return await invoke("get_env", { name });
	// }

	export let open = false;

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

<Dialog.Root {open} onOpenChange={(e) => (open = !open)}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Add API Keys</Dialog.Title>
			<Dialog.Description>
				Add your OpenAI and Replicate API keys to start using the AI features
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
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
		</div>
		<Dialog.Footer>
			<Button
				type="submit"
				on:click={() => {
					localStorage.setItem('openai', openAiKey);
					localStorage.setItem('replicate', replicateKey);
					open = false;
				}}>Save</Button
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
