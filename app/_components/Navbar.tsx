import DrawerMenu from "./DrawerMenu";

export default function Navbar() {
  return (
    <div>
      <div className="sm:block md:hidden lg:hidden">
        <DrawerMenu />
      </div>
      <div className="sm:hidden md:block lg:block"> large navbar</div>
    </div>
  );
}
