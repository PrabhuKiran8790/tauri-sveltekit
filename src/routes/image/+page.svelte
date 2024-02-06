<script lang="ts">
	import { Download, Loader2, Sparkles } from 'lucide-svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import { ImageOptions, ResolutionOptions } from './constants';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';

	let prompt = '';
	let n = '1';
	let resolution = '256x256';
	let loading = false;

	let result: {
		data: {
			url: string;
		}[];
	} | null = null;

	function handleSubmit() {
		if (!localStorage.getItem('openai')) {
			alert('Please add your OpenAI API key in the settings');
			return;
		}

		if (prompt.length < 3) {
			alert('Prompt is too short');
			return;
		}

		loading = true;
		fetch('https://api.openai.com/v1/images/generations', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('openai') as string}`
			},
			body: JSON.stringify({
				model: 'dall-e-2',
				prompt,
				n: +n,
				size: resolution
			})
		})
			.then((response) => response.json())
			.then((data) => {
				loading = false;
				result = data;
				console.log(result?.data);
			})
			.catch((error) => console.error('Error:', error));
	}
</script>

<div>
	<div class="mt-5 p-3">
		<div class="container w-full max-w-4xl space-y-2 rounded-lg border p-3">
			<div class="space-y-2">
				<Label>Prompt</Label>
				<Textarea bind:value={prompt} class="resize-none" placeholder="ask something" />
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div class="space-y-2">
					<Label>Count</Label>
					<Select.Root selected={ImageOptions[0]}>
						<Select.Trigger>
							<Select.Value placeholder="Theme" />
						</Select.Trigger>
						<Select.Content>
							{#each ImageOptions as option}
								<Select.Item
									value={option.value}
									disabled={option.diabled}
									on:click={() => {
										n = option.value;
									}}>{option.label}</Select.Item
								>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
				<div class="space-y-2">
					<Label>Resolution</Label>
					<Select.Root selected={ResolutionOptions[0]}>
						<Select.Trigger>
							<Select.Value placeholder="Theme" />
						</Select.Trigger>
						<Select.Content>
							{#each ResolutionOptions as option}
								<Select.Item
									value={option.value}
									on:click={() => {
										resolution = option.value;
									}}
									disabled={option.diabled}>{option.label}</Select.Item
								>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
			</div>
			<div class="flex items-center justify-center">
				<Button
					variant="secondary"
					class="w-96 border border-foreground/40"
					type="submit"
					on:click={() => {
						handleSubmit();
					}}
				>
					{#if loading}
						Generating...
						<Loader2 class="ml-3 h-5 w-5 animate-spin" />
					{:else}
						Generate
						<Sparkles class="ml-3 h-5 w-5" />
					{/if}
				</Button>
			</div>
		</div>
	</div>

	<div class="mt-10 flex items-center justify-center">
		{#if loading}
			<span class="loader" />
		{:else if result}
			<div class="mb-32 flex">
				<div class="mt-8 flex flex-col gap-4 md:flex-row lg:px-32">
					{#each result.data as src}
						<Card.Card class="overflow-hidden rounded-xl">
							<div class="relative aspect-square">
								<!-- svelte-ignore a11y-img-redundant-alt -->
								<img src={src.url} alt="Image" />
							</div>
							<Card.CardFooter class="p-2">
								<Button variant="secondary" class="w-full" on:click={() => window.open(src.url)}>
									<Download class="mr-2 h-4 w-4" />
									Download
								</Button>
							</Card.CardFooter>
						</Card.Card>
					{/each}
				</div>
			</div>
		{:else}
			<p />
		{/if}
	</div>
</div>

<style>
	.loader {
		transform: rotateZ(45deg);
		perspective: 1000px;
		border-radius: 50%;
		width: 75px;
		height: 75px;
		color: #1681d2;
	}
	.loader:before,
	.loader:after {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: inherit;
		height: inherit;
		border-radius: 50%;
		transform: rotateX(70deg);
		animation: 1s spin linear infinite;
	}
	.loader:after {
		color: #ff3d00;
		transform: rotateY(70deg);
		animation-delay: 0.4s;
	}

	@keyframes rotate {
		0% {
			transform: translate(-50%, -50%) rotateZ(0deg);
		}
		100% {
			transform: translate(-50%, -50%) rotateZ(360deg);
		}
	}

	@keyframes rotateccw {
		0% {
			transform: translate(-50%, -50%) rotate(0deg);
		}
		100% {
			transform: translate(-50%, -50%) rotate(-360deg);
		}
	}

	@keyframes spin {
		0%,
		100% {
			box-shadow: 0.2em 0px 0 0px currentcolor;
		}
		12% {
			box-shadow: 0.2em 0.2em 0 0 currentcolor;
		}
		25% {
			box-shadow: 0 0.2em 0 0px currentcolor;
		}
		37% {
			box-shadow: -0.2em 0.2em 0 0 currentcolor;
		}
		50% {
			box-shadow: -0.2em 0 0 0 currentcolor;
		}
		62% {
			box-shadow: -0.2em -0.2em 0 0 currentcolor;
		}
		75% {
			box-shadow: 0px -0.2em 0 0 currentcolor;
		}
		87% {
			box-shadow: 0.2em -0.2em 0 0 currentcolor;
		}
	}
</style>
