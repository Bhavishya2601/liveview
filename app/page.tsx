'use client'

import { useState, useEffect, useCallback } from "react"
import { useUser } from "@clerk/nextjs"
import toast from 'react-hot-toast'
import { useLoading } from '@/contexts/LoadingContext'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import ProjectsGrid from '@/components/dashboard/ProjectsGrid'
import { Project } from '@/components/dashboard/ProjectCard'

export default function Home() {
  const { user } = useUser()
  const { setLoading } = useLoading()
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [projects, setProjects] = useState<Project[]>([])
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null)

  const fetchProjects = useCallback((showLoading = true) => {
    if (showLoading) {
      setLoadingProjects(true)
    }
    
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
        })
        .catch(() => {
          toast.error("Failed to fetch projects")
        })
        .finally(()=>{
          setLoadingProjects(false)
        })
    } else {
      setLoadingProjects(false)
    }
  }, [user?.id])

  useEffect(() => {
    // Only show loading on initial load
    if (user?.id) {
      fetchProjects(true)
    } else if (user !== undefined) {
      // User is loaded but not signed in
      setLoadingProjects(false)
    }
  }, [user?.id, user])

  const refreshProjects = useCallback(() => {
    // Don't show skeleton when refreshing after create/delete
    fetchProjects(false)
  }, [fetchProjects])

  const handleDelete = async (projectId: string) => {
    try {
      setDeletingProjectId(projectId);
      setLoading(true);
      
      const res = await fetch("/api/projects/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId })
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to delete project");
        return;
      }

      toast.success("Project deleted successfully!");
      refreshProjects();
    } catch {
      toast.error("Failed to delete project");
    } finally {
      setLoading(false);
      setDeletingProjectId(null);
    }
  }

  return (
    <div className="bg-[#021526] text-white min-h-screen">
      <DashboardHeader onProjectCreated={refreshProjects} />
      
      <div className="flex gap-3 items-center text-3xl px-10 pt-8 font-semibold">
        Your Live Sites
      </div>

      <ProjectsGrid 
        projects={projects}
        loadingProjects={loadingProjects}
        onDelete={handleDelete}
        deletingProjectId={deletingProjectId}
      />
    </div>
  )
}