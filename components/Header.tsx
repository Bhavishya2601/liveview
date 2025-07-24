import { SignedIn, UserButton } from '@clerk/nextjs';
import { Button } from './ui/Button';
import { ExternalLink, Save } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface HeaderProps {
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  slug: string;
  projectId: string;
}

export default function Header({ htmlCode, cssCode, jsCode, slug, projectId }: HeaderProps) {

  const saveProject = async () => {
    try {
      const res = await fetch('/api/projects/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, htmlCode, cssCode, jsCode }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Project saved successfully!');
      } else {
        toast.error(data.error || 'Failed to save project');
      }
    } catch (error) {
      toast.error('Failed to save project');
    }
  };

  const OpenNewTab = async () => {
    const previewLink = `/preview/${projectId}`;
    window.open(previewLink, '_blank');
  };

  return (
    <div className="flex justify-between items-center p-4 h-16 bg-slate-950 text-white">
      <div className="flex items-center gap-4">
        <Image src={'/logo.png'} alt="Logo" width={50} height={30} />
        <div className="text-2xl tracking-wide font-semibold">LiveView</div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button className='cursor-pointer' onClick={saveProject}>
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
