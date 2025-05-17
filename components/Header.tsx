import { SignedIn, UserButton } from '@clerk/nextjs';
import { Button } from './ui/Button';
import { ExternalLink, Save } from 'lucide-react';
import Image from 'next/image';

interface HeaderProps {
  htmlCode: string;
  cssCode: string;
  jsCode: string;
}

export default function Header({ htmlCode, cssCode, jsCode }: HeaderProps) {

  const OpenNewTab = async () => {
    const res = await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ htmlCode, cssCode, jsCode }),
    });

    const data = await res.json();
    if (res.ok) {
      const previewLink = `/preview/${data._id}`;
      window.open(previewLink, '_blank');
    }
  };

  return (
    <div className="flex justify-between items-center p-4 h-16 bg-slate-950 text-white">
      <div className="flex items-center gap-4">
        <Image src={'/logo.png'} alt="Logo" width={50} height={30} />
        <div className="text-2xl tracking-wide font-semibold">LiveView</div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button className='cursor-pointer'>
            Save
            <Save />
          </Button>
          <Button className='cursor-pointer' onClick={OpenNewTab}>
            View in new Tab
            <ExternalLink />
          </Button>
        </div>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
