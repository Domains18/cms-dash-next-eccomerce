import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

interface SettingsPageProps {
    params: {
        storeId: string
    }
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
    const { userId } = auth();
    if(!userId){
        redirect('/sign-in')
    }
    const store = await prismadb.store.findFirst({
        where: {
            userId
        }
    })
    return (
        <div>
            Hello settings
            <h1>Hello</h1>
        </div>
    )
}


export default SettingsPage;