import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-center gap-3 max-w-lg md:flex-row'>
            <span className="text-stone-900 text-5xl font-bold px-3">404</span>
            <div className="text-center border-t border-gray-500 px-3 md:text-start md:border-l md:border-t-0">
                <h2 className="text-5xl text-stone-900 font-bold">Page not found</h2>
                <p className="text-start text-base text-gray-500 font-medium mt-3">Please check the URL in the address bar and try again.</p>
            </div>
        </div>
        <div className="w-full ml-5 mt-8 flex justify-center gap-5 max-w-lg">
            <Link to="/" className="rounded-md bg-indigo-500 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F80ED]">Go back home</Link>
            <a href='https://tomasyovino.vercel.app/contact' target="_blank" rel='noreferrer' className="rounded-md bg-transparent px-3.5 py-1.5 text-base font-semibold leading-7 text-gray-500 hover:text-gray-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-transparent">Contact support</a>
        </div>
    </div>
  );
};

export default NotFound;