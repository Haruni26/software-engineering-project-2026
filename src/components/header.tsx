import TreeIcon from '@/assets/img/tree-icon.png';
import { ChevronDown, Globe2, Moon, Sun, Volume2 } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

type NavLinkType = {
	to: string;
	label: string;
};

const NAV_LINKS: NavLinkType[] = [
	{
		to: '/',
		label: 'Home',
	},
	{
		to: '/explore',
		label: 'Explore',
	},
	{
		to: '/animals',
		label: 'Animals',
	},
	{
		to: '/trees',
		label: 'Trees',
	},
	{
		to: '/visit',
		label: 'Visit',
	},
	{
		to: '/kids',
		label: 'Kids',
	},
	{
		to: '/about',
		label: 'About',
	},
];

const Header = () => {
	return (
		<header className='z-50 h-20 w-full flex flex-wrap md:flex-nowrap md:justify-start border-b-2 border-[#15362f] bg-[#f5efd5]'>
			<nav className='relative w-full max-w-340 mx-auto py-2 px-4 sm:px-6 lg:px-8 md:flex md:items-center md:justify-between md:gap-3'>
				<div className='flex items-center justify-between gap-x-1'>
					<Link to='/' className='select-none flex flex-row items-center justify-start gap-2 shrink-0' aria-label='Woodland Conservation Area'>
						<img className='h-auto w-14 shrink-0' src={TreeIcon} alt='Tree' />

						<div className='flex flex-col items-start justify-center'>
							<span className='font-semibold text-xl! text-[#15362f] nunito'>Woodland Conservation Area</span>
							<p className='-mt-1 font-medium text-sm! text-neutral-600 nunito'>St. Margaret's Bay, Nova Scotia</p>
						</div>
					</Link>

					<button
						type='button'
						className='hs-collapse-toggle md:hidden relative size-9 flex justify-center items-center font-medium text-sm rounded-lg bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-neutral-700 focus:outline-hidden focus:bg-gray-50 dark:focus:bg-neutral-700 disabled:opacity-50 disabled:pointer-events-none'
						id='hs-header-base-collapse'
						aria-expanded='false'
						aria-controls='hs-header-base'
						aria-label='Toggle navigation'
						data-hs-collapse='#hs-header-base'>
						<svg className='hs-collapse-open:hidden size-4' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
							<line x1='3' x2='21' y1='6' y2='6' />
							<line x1='3' x2='21' y1='12' y2='12' />
							<line x1='3' x2='21' y1='18' y2='18' />
						</svg>
						<svg className='hs-collapse-open:block shrink-0 hidden size-4' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
							<path d='M18 6 6 18' />
							<path d='m6 6 12 12' />
						</svg>
						<span className='sr-only'>Toggle navigation</span>
					</button>
				</div>

				<div className='py-2 md:py-0 flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1'>
					<div className='flex flex-col md:flex-row md:items-center md:justify-end gap-0.5 md:gap-1'>
						{NAV_LINKS?.map((navLink: NavLinkType, idx: number) => {
							return (
								<NavLink key={idx} to={navLink?.to} className='nav-link min-h-10'>
									{navLink?.label}
								</NavLink>
							);
						})}
					</div>

					<div className='my-2 md:my-0 md:ml-2 md:mr-4'>
						<div className='select-none h-px md:h-4 w-full md:border-s border-[#15362f]'></div>
					</div>

					<div className='flex flex-wrap items-center justify-end gap-2'>
						<button type='button' onClick={() => {}} className='min-h-10 px-3 py-1.5 inline-flex items-center justify-center gap-2 rounded-lg font-semibold text-sm text-[#15362f] hover:text-[#15362f] focus:text-[#15362f] active:text-[#15362f] bg-[#dedcdb] hover:bg-[#dedcdb]/90 focus:bg-[#dedcdb]/90 active:bg-[#dedcdb]/90'>
							<span className='sr-only'>{/* TODO: ADD TEXT */}</span>
							<Globe2 className='size-5 shrink-0' />
							English
							<ChevronDown className='size-4 ml-1 shrink-0' />
						</button>

						<div role='group' className='btn grid h-10 w-20 p-0! grid-cols-2 gap-0! bg-[#15362f] overflow-hidden rounded-lg' aria-label='Theme'>
							<button type='button' onClick={() => {}} aria-label='Use light theme' className='h-full w-full inline-flex items-center justify-center rounded-l-lg hover:bg-[#15362f]/90 focus:bg-[#15362f]/90 focus:outline-hidden'>
								<Sun className='size-5 shrink-0 text-yellow-500' />
								<span className='sr-only'>Light theme</span>
							</button>

							<button type='button' onClick={() => {}} aria-label='Use dark theme' className='h-full w-full inline-flex items-center justify-center rounded-r-lg border-l-2 border-white/10 hover:bg-[#15362f]/90 focus:bg-[#15362f]/90 focus:outline-hidden'>
								<Moon className='size-5 shrink-0 text-white/50' />
								<span className='sr-only'>Dark theme</span>
							</button>
						</div>

						<button type='button' onClick={() => {}} className='btn btn-primary btn-icon min-h-10'>
							<Volume2 className='size-5 shrink-0' />
							<span className='sr-only'>{/* TODO: ADD TEXT */}</span>
						</button>
					</div>
				</div>
			</nav>
		</header>
	);
};

export { Header };
