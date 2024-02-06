import { z } from 'zod';

export const imageFormSchema = z.object({
	prompt: z.string().min(3, 'Prompt should be atleast 3 characters long'),
	count: z.string().default('1'),
	resolution: z.string().default('256x256')
});

export type ImageFormSchema = typeof imageFormSchema;

type imageOptions = {
	value: string;
	label: string;
	diabled: boolean;
};

type resolutionOptions = {
	value: string;
	label: string;
	diabled: boolean;
};

export const ImageOptions: imageOptions[] = [
	{
		value: '1',
		label: '1 Image',
		diabled: false
	},
	{
		value: '2',
		label: '2 Images',
		diabled: false
	},
	{
		value: '3',
		label: '3 Images',
		diabled: false
	}
];

export const ResolutionOptions: resolutionOptions[] = [
	{
		value: '256x256',
		label: '256 x 256',
		diabled: false
	},
	{
		value: '512x512',
		label: '512 x 512',
		diabled: false
	},
	{
		value: '1024x1024',
		label: '1024 x 1024',
		diabled: false
	}
];
