import { SignedIn, UserButton } from '@clerk/nextjs';
import { Button } from './ui/Button';
import { ExternalLink, Save } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useLoading } from '@/contexts/LoadingContext';
import { useState, useEffect } from 'react';

interface HeaderProps {
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  slug: string;
  projectId: string;
}

export default function Header({ htmlCode, cssCode, jsCode, slug, projectId }: HeaderProps) {
  const { setLoading } = useLoading();
  const [projectName, setProjectName] = useState<string>('');

  useEffect(() => {
    if (slug) {
      const formattedName = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      setProjectName(formattedName);
    }
  }, [slug]);

  const saveProject = async () => {
    try {
      setLoading(true);
      
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
    } catch {
      toast.error('Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const OpenNewTab = async () => {
    const previewLink = `/preview/${slug}`;
    window.open(previewLink, '_blank');
  };

  return (
    <div className="flex justify-between items-center p-4 px-10 h-16 bg-slate-950 text-white">
      <div className="flex items-center gap-3">
        <Image src={'/logo.svg'} alt="Logo" width={30} height={30} />
        <div className="text-2xl tracking-wide font-semibold">LiveView</div>
        {projectName && (
          <div className='flex items-center gap-3'>
            <div className="text-gray-400 text-xl leading-none">|</div>
            <div className="text-lg text-gray-300 font-medium leading-none flex items-center">{projectName}</div>
          </div>
        )}
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
