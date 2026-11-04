import { z } from 'zod';

export const contactSchema = z.object({
	name: z.string().trim().min(1, 'Enter your name.').max(100, 'Use 100 characters or fewer.'),
	email: z.string().trim().max(254, 'Use 254 characters or fewer.').pipe(z.email('Enter a valid email address.')),
	subject: z.string().trim().min(1, 'Enter a subject.').max(120, 'Use 120 characters or fewer.'),
	message: z.string().trim().min(10, 'Enter at least 10 characters.').max(2000, 'Use 2,000 characters or fewer.'),
});

export type ContactInput = z.infer<typeof contactSchema>;
