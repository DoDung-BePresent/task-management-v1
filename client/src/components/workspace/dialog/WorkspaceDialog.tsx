/**
 * Node modules
 */
import { parseAsBoolean, useQueryState } from "nuqs";

/**
 * Components
 */
import { Dialog, DialogContent } from "@/components/ui/dialog";

/**
 * Local Components
 */
import WorkspaceForm from "@/components/workspace/form/WorkspaceForm";

const useWorkspaceDialog = () => {
  const [open, setOpen] = useQueryState(
    "new-workspace",
    parseAsBoolean.withDefault(false),
  );

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return {
    open,
    onOpen,
    onClose,
  };
};

const WorkspaceDialog = () => {
  const { open, onClose } = useWorkspaceDialog();
  return (
    <Dialog modal={true} open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-6xl overflow-hidden border-0 !p-0">
        <WorkspaceForm />
      </DialogContent>
    </Dialog>
  );
};

export { useWorkspaceDialog, WorkspaceDialog };
