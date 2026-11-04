import { Button, PageHero } from '@/components';
import { ContactForm } from '@/components/contact-form';
import { ArrowRight, Mail, MapPin } from 'lucide-react';

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim();

const ContactPage = () => {
	return (
		<main className='main'>
			<PageHero title='Contact' description="Find information about Woodland Conservation Area and exploring St. Margaret's Bay." />

			<div className='grid grid-cols-1 gap-6 w-full max-w-340 mx-auto px-4 pb-16 sm:px-6 lg:grid-cols-2 lg:px-8'>
				<section className='p-6 rounded-4xl border border-forest-800/15 bg-cream-100 text-forest-950 sm:p-8 dark:border-cream-300/20 dark:bg-forest-900 dark:text-cream-50'>
					<Mail aria-hidden='true' className='size-6 text-forest-700 dark:text-sage-300' />
					<h2 className='mt-4 text-2xl font-bold tracking-tight'>Get in touch</h2>

					{contactEmail ? (
						<>
							<p className='mt-3 leading-relaxed'>Email us with questions about the conservation area or feedback about this website.</p>
							<a href={`mailto:${contactEmail}`} className='mt-5 inline-block rounded-sm font-semibold underline underline-offset-4 break-all text-forest-700 focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-sage-300'>
								{contactEmail}
							</a>
						</>
					) : (
						<p className='mt-3 leading-relaxed'>A public contact email is currently unavailable. Learn more about the conservation area on our About page.</p>
					)}

					<ContactForm email={contactEmail} />

					<div className='mt-6'>
						<Button to='/about' variant='secondary'>
							About the area
							<ArrowRight aria-hidden='true' className='size-4 shrink-0' />
						</Button>
					</div>
				</section>

				<section className='p-6 rounded-4xl bg-forest-800 text-cream-50 sm:p-8 dark:bg-forest-950'>
					<MapPin aria-hidden='true' className='size-6 text-sage-300' />
					<h2 className='mt-4 text-2xl font-bold tracking-tight'>Explore the area</h2>
					<p className='mt-3 leading-relaxed'>Woodland Conservation Area is in St. Margaret&apos;s Bay, Nova Scotia. Discover its woodland trails, trees, and wildlife.</p>

					<div className='mt-6'>
						<Button to='/explore' variant='secondary'>
							Explore Woodland
							<ArrowRight aria-hidden='true' className='size-4 shrink-0' />
						</Button>
					</div>
				</section>
			</div>
		</main>
	);
};

export { ContactPage };
