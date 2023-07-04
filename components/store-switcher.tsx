'use client';

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useStoreModal } from "@/hooks/use-store-modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


import { Store } from "@prisma/client"
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[];
}

export default function StoreSwitcher({
    className,
    items = []
}: StoreSwitcherProps) {
    const storeModal = useStoreModal();
    const params = useParams();
    const router = useRouter();

    const formattedItems = items.map((item) => ({
        label: item.name, 
        value: item.id,
    }));

    const [isOpen, setisOpen] = useState(false)

    const currentStore = formattedItems.find((item) => item.value === params.storeId);

    const onStoreSelect = (store: { value: string, label: string }) => {
        setisOpen(false);
        router.push(`/${store.value}`)
    }
    return (
        <Popover>
            <PopoverTrigger>
                <Button variant="outline" size="sm" role="combobox" aria-expanded={isOpen} className={cn("w-[200px] justify-between bg-slate-400", className)}>
                    <StoreIcon className="mr-2 h-4 w-4" />
                    {currentStore?.label}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="search store" />
                        <CommandEmpty>Store Empty</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {
                                formattedItems.map((store) => (
                                    <CommandItem key={store.value} onSelect={() => onStoreSelect(store)} className="text-sm">
                                        <StoreIcon className="mr-2 h-4 w-4" />
                                        {store.label}
                                        <Check className={cn("ml-auto h-4 v-4", currentStore?.value === store.value ? "opacity-100" : "opacity-0")} />
                                    </CommandItem>
                                ))
                            }
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem onSelect={() => {
                                setisOpen(false);
                                storeModal.onOpen();
                            }}>
                                <PlusCircle className="mr-2 h-5 w-5" />
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}