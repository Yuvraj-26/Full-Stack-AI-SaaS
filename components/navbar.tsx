import { UserButton } from "@clerk/nextjs";

import MobileSidebar from "@/components/mobile-sidebar";


// Navbar created for mobile responsive side bar
// Navbar button created for signout from dashboard
const Navbar = () => {
    return (
        <div className="flex items-center p-4">
            <MobileSidebar />
            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/"  />
            </div>
        </div>
    );
}

export default Navbar;
