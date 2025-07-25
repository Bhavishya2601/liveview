'use client'

import ProjectCard, { Project } from './ProjectCard'

interface ProjectsGridProps {
  projects: Project[]
  loadingProjects: boolean
  onDelete: (projectId: string) => void
  deletingProjectId: string | null
}

export default function ProjectsGrid({
  projects,
  loadingProjects,
  onDelete,
  deletingProjectId
}: ProjectsGridProps) {
  if (loadingProjects && projects.length === 0) {
    return (
      <div className="grid grid-cols-3 gap-3 p-4 px-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="animate-pulse flex flex-col gap-4 bg-slate-700 p-4 rounded-lg shadow-md h-40">
            <div className="h-6 bg-slate-600 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-slate-600 rounded w-full mb-2"></div>
            <div className="h-4 bg-slate-600 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    )
  }

  if (!loadingProjects && projects.length === 0) {
    return (
      <div className="grid grid-cols-3 gap-3 p-4 px-10">
        <div className="col-span-3 text-center text-2xl mt-10 text-gray-500">
          No projects found. Create a new project to get started!
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-3 p-4 px-10">
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
          onDelete={onDelete}
          deletingProjectId={deletingProjectId}
        />
      ))}
    </div>
  )
}
