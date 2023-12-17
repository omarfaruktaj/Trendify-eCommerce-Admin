import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './alert-dialog'

interface confirmationDialogProps {
  title: string
  description: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const ConfirmationDialog = ({
  title,
  description,
  isOpen,
  onClose,
  children,
}: confirmationDialogProps) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }
  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={onChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>{children}</AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmationDialog
