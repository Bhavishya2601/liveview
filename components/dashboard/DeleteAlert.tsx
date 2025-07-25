import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/Button"
import { Trash } from "lucide-react"

interface DeleteAlertProps {
  onDelete: () => void
  isDeleting?: boolean
  projectName?: string
}

const DeleteAlert = ({ onDelete, isDeleting = false, projectName }: DeleteAlertProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          className="flex gap-2 items-center text-white cursor-pointer" 
          variant="destructive" 
          disabled={isDeleting}
        >
          Delete <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#021526] text-white border-none">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete {projectName ? `"${projectName}"` : 'this project'} and remove all associated data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-transparent hover:bg-[#062033] hover:text-white">Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            Delete Project
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteAlert
