import { UserButton } from "@clerk/nextjs";


import { MainNav } from "@/components/main-nav";
const Navbar = () => {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <div>
                    store switcher
                </div>
                <MainNav/>
                <div className="ml-auto flex flex-center space-x-4">
                    <UserButton afterSignOutUrl="/"/>
                </div>
            </div>
        </div>
    );
}
 
export default Navbar;
