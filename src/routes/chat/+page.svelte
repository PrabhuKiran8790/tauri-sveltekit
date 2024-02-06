<script lang="ts">
	import { Textarea } from '$lib/components/ui/textarea';
	import { OpenAILogo } from '$lib/assets';
	import { Button } from '$lib/components/ui/button';
	import { SendHorizontal, CircleUserRound } from 'lucide-svelte';
	import Markdown from 'svelte-exmarkdown';

	import type { Plugin } from 'svelte-exmarkdown';
	import typescript from 'highlight.js/lib/languages/typescript';
	import javascript from 'highlight.js/lib/languages/javascript';
	import java from 'highlight.js/lib/languages/java';
	import python from 'highlight.js/lib/languages/python';
	import go from 'highlight.js/lib/languages/go';
	import 'highlight.js/styles/github.css';
	import rehypeHighlight from 'rehype-highlight';

	const plugins: Plugin[] = [
		{
			rehypePlugin: [
				rehypeHighlight,
				{ ignoreMissing: true, languages: { typescript, java, javascript, python, go } }
			]
		}
	];
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${localStorage.getItem('openai') as string}`
	};

	const data: {
		model: string;
		stream?: boolean;
		messages: { role: string; content: string }[];
	} = {
		model: 'gpt-3.5-turbo',
		stream: true,
		messages: []
	};

	let userInput: string = '';
	let loading: boolean = false;

	function handleSubmit() {
		if (userInput.length < 3) {
			return;
		}

		data.messages = [
			...data.messages,
			{
				role: 'user',
				content: userInput
			}
		];
		userInput = '';

		// return;

		fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(data)
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.body;
			})
			.then((body) => {
				loading = true;
				const reader = body?.getReader()!;
				const decoder = new TextDecoder('utf-8');

				data.messages = [
					...data.messages,
					{
						role: 'assistant',
						content: ''
					}
				];

				// find the last index of messages
				const lastIdx = data.messages.length - 1;

				function read() {
					return reader.read().then(({ done, value }) => {
						if (done) {
							// console.log('Stream complete');
							return;
						}

						loading = false;
						const decodedChunk = decoder.decode(value);
						const lines = decodedChunk
							.split('\n')
							.map((line) => line.replace('data: ', ''))
							.filter((line) => line.length > 0)
							.filter((line) => line !== '[DONE]')
							.map((line) => JSON.parse(line));

						for (const line of lines) {
							const {
								choices: [
									{
										delta: { content }
									}
								]
							} = line;

							if (content) {
								data.messages[lastIdx].content += content;
							}
						}
						return read();
					});
				}

				return read();
			})
			.catch((error) => {
				console.error('Fetch error:', error);
			});
	}

	$: {
		if (data.messages && data.messages.length > 0) {
			const chatContent = document.getElementById('chatContent');
			chatContent?.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<div class="h-full p-2">
	<div class="flex h-full flex-col">
		<div class="mb-16 flex flex-grow flex-col gap-3 overflow-y-scroll px-2 py-2">
			{#if data.messages.length === 0}
				<div class="flex h-full items-center justify-center overflow-hidden">
					<h1 class="text-4xl font-bold text-muted-foreground">Chat with AI</h1>
				</div>
			{/if}
			{#each data.messages as message}
				<div class="flex w-full items-center gap-5">
					{#if message.role === 'user'}
						<div class="my-1 ml-auto flex items-start justify-end gap-4">
							<div class="rounded-lg bg-sky-200 p-3">
								{message.content}
							</div>
							<CircleUserRound class="size-6" />
						</div>
					{:else}
						<div class="my-1 mr-auto flex w-3/4 items-start justify-start gap-4">
							<OpenAILogo />
							<div class="w-fit rounded-lg bg-gray-200 p-3">
								{#if !loading}
									{#key message.content}
										<!-- {message.content} -->
										<Markdown md={message.content} {plugins} />
									{/key}
								{:else}
									Thinking...
								{/if}
							</div>
						</div>
					{/if}
				</div>
			{/each}
			<div id="chatContent" class="mb-32" />
		</div>
		<form
			class="fixed bottom-0 right-0 mt-12 w-full bg-white p-3 pb-4 dark:bg-black"
			on:submit={handleSubmit}
		>
			<div class="flex items-center justify-center gap-3 px-2 md:ml-72 md:px-10 md:pb-4">
				<Textarea
					class="flex w-full resize-none items-center justify-center px-3 pb-1 text-sm"
					placeholder="Ask something..."
					rows={1}
					autofocus
					required
					minlength={3}
					bind:value={userInput}
					on:keydown={(e) => {
						if (e.key === 'Enter' && !e.shiftKey) {
							e.preventDefault();
							handleSubmit();
						}
					}}
				/>
				<Button on:click={handleSubmit} size="sm">
					<SendHorizontal class="h-6 w-6" />
				</Button>
			</div>
		</form>
	</div>
</div>
