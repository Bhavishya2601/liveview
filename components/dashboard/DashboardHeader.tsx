'use client'

import Image from 'next/image'
import { SignedIn, UserButton } from '@clerk/nextjs'
import CreateProjectDialog from './CreateProjectDialog'

interface DashboardHeaderProps {
  onProjectCreated: () => void
}

export default function DashboardHeader({ onProjectCreated }: DashboardHeaderProps) {
  return (
    <div className="flex justify-between items-center p-4 h-16 bg-white">
      <div className="flex items-center gap-4">
        <Image src={'/logo.png'} alt="Logo" width={50} height={30} />
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
