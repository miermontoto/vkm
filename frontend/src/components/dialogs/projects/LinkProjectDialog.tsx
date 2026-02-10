import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { defineModal } from '@/lib/modals';
import { useTranslation } from 'react-i18next';
import { Alert, AlertDescription } from '@/components/ui/alert';

export interface LinkProjectDialogProps {
  projectId: string;
  projectName: string;
}

/**
 * dialogo simple para link de proyecto local a remote project.
 * implementación básica - podría expandirse para mostrar organizations disponibles, etc.
 */
const LinkProjectDialogImpl = NiceModal.create<LinkProjectDialogProps>(
  ({ projectName }) => {
    const modal = useModal();
    const { t } = useTranslation();
    const [error] = useState<string | null>(null);

    const handleClose = () => {
      modal.resolve(false);
      modal.hide();
    };

    return (
      <Dialog
        open={modal.visible}
        onOpenChange={(open) => {
          if (!open) handleClose();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Link Project to Remote Organization</DialogTitle>
            <DialogDescription>
              Link "{projectName}" to a remote organization to enable task
              sharing.
            </DialogDescription>
          </DialogHeader>

          <Alert>
            <AlertDescription>
              This feature requires linking the project to a remote
              organization. Please use the project settings to configure the
              remote project ID.
            </AlertDescription>
          </Alert>

          {error && <Alert variant="destructive">{error}</Alert>}

          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              {t('common.close', 'Close')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

export const LinkProjectDialog = defineModal<LinkProjectDialogProps, boolean>(
  LinkProjectDialogImpl
);
