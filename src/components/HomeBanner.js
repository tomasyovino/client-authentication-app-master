import { Link } from 'react-router-dom';

const HomeBanner = () => {
  return (
    <section className='card border border-[#828282] rounded-xl items-center justify-start mt-3 p-6 flex flex-col gap-3 max-w-md min-h-[60vh]'>
        <h1 className='text-4xl text-center font-bold tracking-tight text-gray-900'>Authentication APP</h1>
        <div>
            <p className='mt-6 text-lg leading-8 text-gray-600 text-justify'>Welcome to my solution to the Authentication APP challenge from devChallenges.io. To start testing the demo just click <Link to="/Register" className='rounded-md bg-[#2F80ED] px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F80ED]'>Get Started</Link></p>
            <p className='text-lg leading-8 text-gray-600 text-justify'>Register or log in to your account if you already have one.</p>
            <div className='flex w-full justify-between px-10 mt-8'>
                <Link to="/login" className='rounded-md bg-transparent px-3.5 py-1.5 text-base font-semibold leading-7 text-gray-500 hover:text-gray-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-transparent'>Sign In</Link>
                <Link to="/Register" className='rounded-md bg-[#2F80ED] px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F80ED]'>Sign Up</Link>
            </div>
        </div>
    </section>
  );
};

export default HomeBanner;