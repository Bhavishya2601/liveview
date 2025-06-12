'use client'

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/Button"
import { SignedIn, UserButton, useUser } from "@clerk/nextjs"
import { createNewProject } from "@/lib/actions"
import { Plus, ExternalLink, SquarePen, Trash, Copy } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import { Input } from "@/components/ui/Input"

export default function Home() {
  const { user } = useUser()
  const [newProject, setNewProject] = useState({
    projectName: '',
    projectSlug: '',
    htmlCode: '',
    cssCode: '',
    jsCode: ''
  })
  const [loadingProjects, setLoadingProjects] = useState(true)
  type Project = {
    _id: string
    name: string
    slug: string
  }
  const [projects, setProjects] = useState<Project[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)

  const fetchProjects = useCallback(() => {
    setLoadingProjects(true)
    if (user?.id) {
      fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            throw new Error("Failed to fetch projects")
          }
          setProjects(data)
        }).finally(()=>{
          setLoadingProjects(false)
        })
    } else {
      setLoadingProjects(false)
    }
  }, [user?.id])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const handleCreate = async () => {
    try {
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
      if (!res.ok) {
        throw new Error("Failed to create project")
      }

      setNewProject({
        projectName: '',
        projectSlug: '',
        htmlCode: '',
        cssCode: '',
        jsCode: ''
      })
      fetchProjects();
    } catch (err) {
      console.log(err)
    } finally {
      setDialogOpen(false);
    }
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="flex justify-between items-center p-4 h-16 bg-white">
        <div className="flex items-center gap-4">
          <Image src={'/logo.png'} alt="Logo" width={50} height={30} />
          <div className="text-2xl tracking-wide font-semibold">LiveView</div>
        </div>
        <div className="flex items-center gap-4">
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
              <Input
                type="text"
                placeholder="Project Slug"
                className="border p-2 rounded w-full"
                value={newProject.projectSlug}
                onChange={e => setNewProject({ ...newProject, projectSlug: e.target.value })} />
              <div className="text-gray-600 -mt-4 text-xs">Your site will be live at https://livevview.vercel.app/preview/your-slug</div>
              <DialogFooter>
                <Button type="submit" className="cursor-pointer bg-[#b719d3] hover:bg-[#c81ae6]" onClick={handleCreate}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      <div className="flex gap-3 items-center text-3xl px-10 py-4 font-semibold">Your Sites </div>

      <div className="grid grid-cols-3 gap-3 p-4 px-10">
        {loadingProjects ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md h-40">
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
          ))
        ) : ( projects.length !== 0 ? (
          projects.map((project) => (
            <div key={project._id} className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div className="text-xl font-semibold">{project.name}</div>
                <a href={`/preview/${project.slug}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="hover:bg-gray-100 p-1 rounded-md cursor-pointer" size={28} />
                </a>
              </div>
              <div className="bg-gray-200 rounded-md p-2 flex justify-between items-center">
                <div>{`https://livevview.vercel.app/preview/${project.slug}`}</div>
                <Copy
                  className="cursor-pointer"
                  size={18}
                  onClick={() => navigator.clipboard.writeText(`https://livevview.vercel.app/preview/${project.slug}`)}
                />            </div>
              <div className="flex justify-between items-center">
                <a href={`/code/${project.slug}`} target="_blank">
                  <Button className="flex gap-2 items-center cursor-pointer" variant="outline">Edit <SquarePen /></Button>
                </a>
                <Button className="flex gap-2 items-center text-white cursor-pointer" variant="destructive">Delete <Trash /></Button>
              </div>
            </div>
          ))) : (
          <div className="col-span-3 text-center text-2xl mt-10 text-gray-500">
            No projects found. Create a new project to get started!
          </div>
        ))}
      </div>
    </div>
  )
}