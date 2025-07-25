'use client'

import Image from 'next/image'
import { SignedIn, UserButton } from '@clerk/nextjs'
import CreateProjectDialog from './CreateProjectDialog'

interface DashboardHeaderProps {
  onProjectCreated: () => void
}

export default function DashboardHeader({ onProjectCreated }: DashboardHeaderProps) {
  return (
    <div className="flex justify-between items-center p-4 px-10 h-16 bg-[#021526] text-white border-b-[1px] border-gray-700">
      <div className="flex items-center gap-3">
        <Image src={'/logo.svg'} alt="Logo" width={30} height={30} />
        <div className="text-2xl tracking-wide font-semibold">LiveView</div>
      </div>
      <div className="flex items-center gap-4">
        <CreateProjectDialog onProjectCreated={onProjectCreated} />
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  )
}
