import LargeNavbar from "./large/LargeNavbar";
import DrawerMenu from "./small/DrawerMenu";

export default function Navbar() {
  return (
    <div>
      <div className="flex justify-between sm:block md:hidden lg:hidden">
        <DrawerMenu />
      </div>
      <div className="sm:hidden md:block lg:block">
        <LargeNavbar />
      </div>
    </div>
  );
}
