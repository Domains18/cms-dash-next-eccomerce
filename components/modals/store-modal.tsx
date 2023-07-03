'use client'

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";

export const StoreModal = () => {
    const storeModal = useStoreModal();

    return (
        <Modal
            title="Create store"
            description="Managing products"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            Create your form here
        </Modal>
    )
}