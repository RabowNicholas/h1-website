import LargeNavbar from "./large/LargeNavbar";
import DrawerMenu from "./small/DrawerMenu";

export default function Navbar() {
  return (
    <div className="sticky z-50 top-0">
      <div className="flex justify-between sm:sticky md:hidden lg:hidden">
        <DrawerMenu />
      </div>
      <div className="sm:hidden md:block lg:block">
        <LargeNavbar />
      </div>
    </div>
  );
}
