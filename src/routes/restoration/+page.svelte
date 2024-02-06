<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { open } from '@tauri-apps/api/dialog';
	import { convertFileSrc } from '@tauri-apps/api/tauri';

	let localsrc = '';

	async function selectImage() {
		const selected = await open({
			multiple: false,
			filters: [
				{
					name: 'Images',
					extensions: ['png', 'webp', 'jpg', 'jpeg']
				}
			]
		});

		if (selected !== null) {
			localsrc = convertFileSrc(selected as string);
		}
	}
</script>

<div>
	<div class="flex flex-col items-center justify-center py-5">
		<Button on:click={selectImage}>Choose Image</Button>
		<p>This is under construction and does not work. WIP</p>
	</div>

	<div class="flex flex-col justify-between gap-6 md:space-x-10 lg:flex-row lg:p-4">
		{#if localsrc}
			<div class="sticky">
				<img src={localsrc} alt="Preview" class="max-w-full rounded-lg lg:max-w-md" />
			</div>
		{/if}
	</div>
</div>
