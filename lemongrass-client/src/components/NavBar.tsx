import { ModeToggle } from "./mode-toggle"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

const NavBar = () => {
  return (
    <div className="flex items-center bg-background text-text p-4 gap-4">
      <h1 className="text-xl md:text-3xl font-bold">Lemongrass</h1>

      <div className="flex items-center gap-2">
        <Input type="text" placeholder="Search..." className="w-64" />
        <Button type="submit" variant="default" size="icon">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div>

      <p className="text-lg font-medium ml-auto mr-4 hidden md:block">
        This is a test.
      </p>

      <ModeToggle />
    </div>
  )
}

export default NavBar
