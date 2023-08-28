'use client';

import { Store } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";



import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";


interface SettingsFormProps {
    initialData: Store;
};

const formSchema = z.object({
    name: z.string().min(3)

});

type SettingsFormValues = z.infer<typeof formSchema>;

const SettingsForm: React.FC<SettingsFormProps> = ({
    initialData
}) => {
    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema)
    });
    return (
        <>
            <div className="flex flex-center justify-between">
                <Heading
                    title="settings"
                    description="Manage store settings"
                />
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => { console.log(e.target) }}
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
            <Separator />
        </>
    );
}

export default SettingsForm;
