import React from 'react'

const Footer = () => {
  return (
    <footer className='flex justify-around items-center not-italic font-normal text-sm leading-5 tracking-tight text-[#828282] py-2.5 min-h-[10vh]'>
        <span>Created by <a className='text-[#2F80ED]' href='https://tomasyovino.vercel.app' target="_blank" rel='noreferrer'>tyovino</a></span>
        <span><a className='text-[#2F80ED]' href='https://devchallenges.io' target="_blank" rel='noreferrer'>devChallenges.io</a></span>
    </footer>
  )
}

export default Footer