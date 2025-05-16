import {
  SignedIn,
  UserButton,
} from '@clerk/nextjs'
import Image from 'next/image'

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4 h-16 bg-slate-950 text-white">
      <div className='flex items-center gap-4'>
        <Image src={"/logo.png"} alt="Logo" width={50} height={30} />
        <div className='text-2xl tracking-wide font-semibold'>LiveView</div>
      </div>
        <SignedIn>
          <UserButton />
        </SignedIn>
    </div>
  )
}