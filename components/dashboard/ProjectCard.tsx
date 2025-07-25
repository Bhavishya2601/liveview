'use client'

import { Button } from '@/components/ui/Button'
import { ExternalLink, SquarePen, Copy } from 'lucide-react'
import toast from 'react-hot-toast'
import DeleteAlert from './DeleteAlert'

export interface Project {
  _id: string
  name: string
  slug: string
}

interface ProjectCardProps {
  project: Project
  onDelete: (projectId: string) => void
  deletingProjectId: string | null
}

export default function ProjectCard({ project, onDelete, deletingProjectId }: ProjectCardProps) {
  const openPreview = (projectSlug: string) => {
    const previewLink = `/preview/${projectSlug}`;
    window.open(previewLink, '_blank');
  };

  const handleCopyUrl = (slug: string) => {
    navigator.clipboard.writeText(`https://livevview.vercel.app/preview/${slug}`);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">{project.name}</div>
        <ExternalLink 
          className="hover:bg-gray-100 p-1 rounded-md cursor-pointer" 
          size={28}
          onClick={() => openPreview(project.slug)}
        />
      </div>
      <div className="bg-gray-200 rounded-md p-2 flex justify-between items-center">
        <div>
          {`https://livevview.vercel.app/preview/${project.slug}`}
        </div>
        <Copy
          className="cursor-pointer ml-2"
          size={18}
          onClick={() => handleCopyUrl(project.slug)}
        />
      </div>
      <div className="flex justify-between items-center">
        <a href={`/code/${project.slug}`} target="_blank">
          <Button className="flex gap-2 items-center cursor-pointer" variant="outline">
            Edit <SquarePen />
          </Button>
        </a>
        <DeleteAlert 
          onDelete={() => onDelete(project._id)}
          isDeleting={deletingProjectId === project._id}
          projectName={project.name}
        />
      </div>
    </div>
  )
}
