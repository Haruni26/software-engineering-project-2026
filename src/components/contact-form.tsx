import { Button } from '@/components/button';
import { contactSchema, type ContactInput } from '@/schemas/contact';
import { useState, type FormEvent } from 'react';
import { z } from 'zod';

const fields = [
	{ name: 'name', label: 'Name', type: 'text', autoComplete: 'name', maxLength: 100 },
	{ name: 'email', label: 'Email', type: 'email', autoComplete: 'email', maxLength: 254 },
	{ name: 'subject', label: 'Subject', type: 'text', autoComplete: 'off', maxLength: 120 },
	{ name: 'message', label: 'Message', maxLength: 2000 },
] as const;

const fieldClasses = 'w-full px-3 py-2 rounded-lg border border-forest-800/25 bg-cream-50 text-base text-forest-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-700 aria-invalid:border-red-700 dark:border-cream-300/25 dark:bg-forest-800 dark:text-cream-50 dark:focus-visible:outline-cream-300 dark:aria-invalid:border-red-300';

const ContactForm = ({ email }: { email: string | undefined }) => {
	const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string[]>>>({});

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!email) return;

		const form = event.currentTarget;
		const result = contactSchema.safeParse(Object.fromEntries(new FormData(form)));

		if (!result.success) {
			const { fieldErrors } = z.flattenError(result.error);
			setErrors(fieldErrors);
			const firstInvalidField = fields.find(({ name }) => fieldErrors[name]?.length);
			if (firstInvalidField) {
				requestAnimationFrame(() => form.querySelector<HTMLElement>(`#contact-${firstInvalidField.name}`)?.focus());
			}
			return;
		}

		setErrors({});
		const { name, email: replyEmail, subject, message } = result.data;
		const body = `${message}\r\n\r\nFrom: ${name}\r\nReply email: ${replyEmail}`;
		window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject.replace(/[\r\n]/g, ' '))}&body=${encodeURIComponent(body)}`;
	};

	return (
		<form className='mt-6 flex flex-col gap-4' noValidate onSubmit={handleSubmit}>
			{fields.map((field) => {
				const id = `contact-${field.name}`;
				const error = errors[field.name]?.[0];
				const inputProps = {
					id,
					name: field.name,
					maxLength: field.maxLength,
					required: true,
					'aria-invalid': Boolean(error),
					'aria-describedby': error ? `${id}-error` : undefined,
					className: fieldClasses,
				};

				return (
					<div key={field.name} className='flex flex-col gap-1.5'>
						<label htmlFor={id} className='text-sm font-bold'>
							{field.label}
						</label>
						{field.name === 'message' ? (
							<textarea {...inputProps} rows={5} minLength={10} />
						) : (
							<input {...inputProps} type={field.type} autoComplete={field.autoComplete} />
						)}
						{error && (
							<p id={`${id}-error`} className='text-sm text-red-700 dark:text-red-300'>
								{error}
							</p>
						)}
					</div>
				);
			})}

			<div className='flex flex-col items-start gap-2'>
				<Button type='submit' disabled={!email}>Open email draft</Button>
				<p className='text-sm'>
					{email ? 'Review and send your message in your email app.' : 'Email drafts are unavailable until a public inbox is configured.'}
				</p>
			</div>
		</form>
	);
};

export { ContactForm };
