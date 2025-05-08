"use client"

import Link from "next/link"
import { CalendarDays, LogOut, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const { user, logout, isAuthenticated, hasRole } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <CalendarDays className="size-6 text-teal-600" />
          <span className="text-xl">MediCitas</span>
        </Link>

        {isAuthenticated ? (
          <>
            <nav className="ml-auto flex gap-4 sm:gap-6 mr-4">
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Inicio
              </Link>

              {hasRole(["cliente"]) && (
                <Link
                  href="/clientes"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Portal Paciente
                </Link>
              )}

              {hasRole(["personal"]) && (
                <Link
                  href="/personal"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Portal Médico
                </Link>
              )}

              {hasRole(["admin"]) && (
                <Link
                  href="/admin"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Administración
                </Link>
              )}
            </nav>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user?.avatar || user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Mi Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <div className="ml-auto">
            {/* El botón de login se ha quitado para que solo sea accesible desde la página principal */}
          </div>
        )}
      </div>
    </header>
  )
}
