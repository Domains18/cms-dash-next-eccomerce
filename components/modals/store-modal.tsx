'use client'

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


import * as z from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";


const formSchema = z.object({
    name: z.string().min(2),

});


export const StoreModal = () => {
    const storeModal = useStoreModal();
    const [isloading, setisloading] = useState(false);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setisloading(true);
            const response = await axios.post('/api/stores', values);
            toast.success("store successfully created");
            window.location.assign(`/${response.data.id}`)
        } catch (error) {
            toast.error("something went wrong")
        } finally {
            setisloading(false)
        }
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
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={isloading}
                                                autoComplete="false"
                                                placeholder="configure your store"
                                                {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button variant="destructive" disabled={isloading}>Cancel</Button>
                                <Button type="submit" disabled={isloading}>Continue</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}