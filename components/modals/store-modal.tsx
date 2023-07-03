'use client'

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from "@/components/ui/button";


import * as z from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
const formSchema = z.object({
    name: z.string().min(2),

});


export const StoreModal = () => {
    const storeModal = useStoreModal();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    });

    const onSubmit = async(values: z.infer<typeof formSchema>) =>{
        //Onplan create store
        console.log(values)
    }
    return (
        <Modal
            title="Create store"
            description="Managing products"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            {/* Create your form here */}
            <div>
            <div className="space-y-4 py-2 pb-4">
                <Form { ...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field})=>(
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="configure your store" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                            <Button variant="destructive">Cancel</Button>
                            <Button type="submit">Continue</Button>
                        </div>
                    </form>
                </Form>
                </div>
            </div>
        </Modal>
    )
}