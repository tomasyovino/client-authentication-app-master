import { Fragment } from 'react';
import { Link } from "react-router-dom";
import { Popover, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { ArrowDropDown, AccountCircle, Group, Logout, Menu, Close } from '@mui/icons-material';
import { toast } from "react-toastify";
import logo from "../assets/logo.png"

const Header = () => {
  const userAuth = useSelector((state) => state.auth.user)
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  return (
    <Popover className="relative">
      <div className="mx-auto max-w-7xl px-6 min-h-[10vh]">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/profile">
              <img
                className="h-8 w-auto sm:h-10" src={logo} alt="Authenticator"
              />
              <span className="sr-only">authenticator</span>
            </Link>
          </div>

          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#BDBDBD]">
              <span className="sr-only">Open menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          {
            userAuth
              ?
              <Popover.Group as="nav" className="hidden space-x-10 md:flex">
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                      className={classNames(
                        open ? 'text-gray-900' : 'text-gray-500',
                        'group inline-flex items-center rounded-md text-base font-medium hover:text-gray-900 focus:outline-none'
                      )}
                      >
                        <img  src={user?.imgUrl} alt={user?.fullName} className="w-16 h-16 object-top object-cover rounded-lg" />
                        <ArrowDropDown
                          className={classNames(
                            open ? 'text-gray-600' : 'text-gray-400',
                            'ml-2 h-5 w-5 group-hover:text-gray-500'
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-sm transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 not-italic font-medium text-xs leading-4 text-gray-700 tracking-tight py-5 px-3 flex flex-col items-center gap-5 z-10">
                            <Link to="/profile" className='-m-3 flex items-center gap-1 rounded-lg p-3 w-full hover:bg-[#F2F2F2]'>
                              <AccountCircle className='h-6 w-6 flex-shrink-0' aria-hidden="true" />
                              <span className='text-base font-medium text-gray-900'>My Profile</span>
                            </Link>
                            <button onClick={() => toast.info("Coming soon!")} className='-m-3 flex items-center gap-1 rounded-lg p-3 w-full hover:bg-[#F2F2F2]'>
                              <Group className='h-6 w-6 flex-shrink-0' aria-hidden="true" />
                              <span className='text-base font-medium text-gray-900'>Group Chat</span>
                            </button>
                            <hr className='w-full' />
                            <button onClick={onLogout} className='-m-3 flex items-center gap-1 rounded-lg p-3 w-full hover:bg-[#F2F2F2]'>
                              <Logout className='h-6 w-6 flex-shrink-0 text-[#EB5757]' aria-hidden="true" />
                              <span className='text-base font-medium text-gray-900'>Logout</span>
                            </button>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </Popover.Group>
              :
                <>
                  <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                    <Link to="/login" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                      Sign in
                    </Link>
                    <Link
                      to="/register"
                      className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent text-white bg-[#2F80ED] px-4 py-2 text-base font-medium shadow-sm"
                    >
                      Sign up
                    </Link>
                  </div>
                </>
          }
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src={logo}
                      alt="Authenticator"
                    />
                  </div>

                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#BDBDBD]">
                      <span className="sr-only">Close menu</span>
                      <Close className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              {
                userAuth
                  ?
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 not-italic font-medium text-xs leading-4 text-gray-700 tracking-tight py-5 px-3 flex flex-col items-center gap-5 z-10">
                    <Link to="/profile" className='-m-3 flex items-center gap-1 rounded-lg p-3 w-full hover:bg-[#F2F2F2]'>
                      <AccountCircle className='h-6 w-6 flex-shrink-0' aria-hidden="true" />
                      <span className='text-base font-medium text-gray-900'>My Profile</span>
                    </Link>
                    <button onClick={() => toast.info("Coming soon!")} className='-m-3 flex items-center gap-1 rounded-lg p-3 w-full hover:bg-[#F2F2F2]'>
                      <Group className='h-6 w-6 flex-shrink-0' aria-hidden="true" />
                      <span className='text-base font-medium text-gray-900'>Group Chat</span>
                    </button>
                    <hr className='w-full' />
                    <button onClick={onLogout} className='-m-3 flex items-center gap-1 rounded-lg p-3 w-full hover:bg-[#F2F2F2]'>
                      <Logout className='h-6 w-6 flex-shrink-0 text-[#EB5757]' aria-hidden="true" />
                      <span className='text-base font-medium text-gray-900'>Logout</span>
                    </button>
                  </div>
                  :
                    <div className="space-y-6 py-6 px-5">
                      <div className='max-w-md m-auto'>
                        <Link
                          to="/register"
                          className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#2F80ED] px-4 py-2 text-base font-medium text-white shadow-sm"
                        >
                          Sign up
                        </Link>
                        <p className="mt-6 text-center text-base font-medium text-gray-500">
                          Existing customer?{' '}
                          <Link to="/login" className="text-[#2F80ED]">
                            Sign in
                          </Link>
                        </p>
                      </div>
                    </div>
              }
            </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

export default Header