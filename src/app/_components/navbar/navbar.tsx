import DesktopNav from "./desktop-nav"
import MobileNav from "./mobile-nav"

export interface INavigation {
  name: string
  href: string
}
const navigation: INavigation[] = [
  { name: "Server pagination", href: "/server-pagination" },
  { name: "Infinite scroll", href: "/infinite-scroll" },
]

export default function Navbar() {
  return (
    <header className="border-muted from-background/10 via-background/50 to-background/80 sticky top-0 z-50 w-full border-b bg-linear-to-b backdrop-blur-xl">
      <nav
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <DesktopNav navigation={navigation} />
        <MobileNav navigation={navigation} />
      </nav>
    </header>
  )
}
