" use client"

import { useStoreModalStore } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
export const StoreModal = () => {
    const storeModal = useStoreModalStore();
    return (
        <Modal
            title="Create store"
            description="Managing products"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            Creatr your form here
        </Modal>
    )
}