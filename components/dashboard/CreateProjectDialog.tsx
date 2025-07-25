'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/Button'
import { Plus, Check, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'
import toast from 'react-hot-toast'
import { useLoading } from '@/contexts/LoadingContext'
import { useUser } from '@clerk/nextjs'

interface CreateProjectDialogProps {
  onProjectCreated: () => void
}

export default function CreateProjectDialog({ onProjectCreated }: CreateProjectDialogProps) {
  const { user } = useUser()
  const { setLoading } = useLoading()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [slugStatus, setSlugStatus] = useState<'checking' | 'available' | 'taken' | null>(null)
  const [newProject, setNewProject] = useState({
    projectName: '',
    projectSlug: '',
    htmlCode: '',
    cssCode: '',
    jsCode: ''
  })

  const checkSlugAvailability = useCallback(async (slug: string) => {
    if (!slug || !user?.id) {
      setSlugStatus(null);
      return;
    }

    setSlugStatus('checking');
    
    try {
      const res = await fetch('/api/checkSlug', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug })
      });

      const data = await res.json();
      if (res.ok) {
        setSlugStatus(data.available ? 'available' : 'taken');
      } else {
        setSlugStatus(null);
      }
    } catch {
      setSlugStatus(null);
    }
  }, [user?.id]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkSlugAvailability(newProject.projectSlug);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [newProject.projectSlug, checkSlugAvailability]);

  const handleCreate = async () => {
    if (!newProject.projectName || !newProject.projectSlug) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (slugStatus === 'taken') {
      toast.error("Please choose a different slug - this one is already taken");
      return;
    }

    if (slugStatus === 'checking') {
      toast.error("Please wait while we check slug availability");
      return;
    }

    try {
      setLoading(true);
      
      const res = await fetch("/api/newProject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName: newProject.projectName,
          projectSlug: newProject.projectSlug,
          htmlCode: newProject.htmlCode,
          cssCode: newProject.cssCode,
          jsCode: newProject.jsCode,
          userId: user?.id
        })
      })
      
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to create project");
        return;
      }

      toast.success("Project created successfully!");
      setNewProject({
        projectName: '',
        projectSlug: '',
        htmlCode: '',
        cssCode: '',
        jsCode: ''
      })
      setSlugStatus(null);
      onProjectCreated();
    } catch {
      toast.error("Failed to create project");
    } finally {
      setLoading(false);
      setDialogOpen(false);
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className='cursor-pointer bg-[#b719d3] hover:bg-[#c81ae6]'>
          <Plus />
          Create new
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new project</DialogTitle>
          <DialogDescription>
            Enter the name of your new project.
          </DialogDescription>
        </DialogHeader>
        <Input
          type="text"
          placeholder="Project Name"
          className="border p-2 rounded w-full"
          value={newProject.projectName}
          onChange={e => setNewProject({ ...newProject, projectName: e.target.value })} />
        <div className="relative">
          <Input
            type="text"
            placeholder="Project Slug"
            className={`border p-2 rounded w-full pr-10 ${
              slugStatus === 'available' ? 'border-green-500' : 
              slugStatus === 'taken' ? 'border-red-500' : 
              'border-gray-300'
            }`}
            value={newProject.projectSlug}
            onChange={e => setNewProject({ ...newProject, projectSlug: e.target.value })} />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {slugStatus === 'checking' && (
              <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-blue-600 rounded-full"></div>
            )}
            {slugStatus === 'available' && (
              <Check className="h-4 w-4 text-green-500" />
            )}
            {slugStatus === 'taken' && (
              <X className="h-4 w-4 text-red-500" />
            )}
          </div>
        </div>
        {slugStatus === 'taken' && (
          <div className="text-red-500 text-sm -mt-2">This slug is already taken</div>
        )}
        {slugStatus === 'available' && (
          <div className="text-green-500 text-sm -mt-2">This slug is available</div>
        )}
        <div className="text-gray-600 -mt-4 text-xs">Your site will be live at https://livevview.vercel.app/preview/your-slug</div>
        <DialogFooter>
          <Button type="submit" className="cursor-pointer bg-[#b719d3] hover:bg-[#c81ae6]" onClick={handleCreate}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
