"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import type { UserRole } from "@/lib/auth"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
  redirectTo?: string
}

export function ProtectedRoute({ children, allowedRoles, redirectTo = "/login" }: ProtectedRouteProps) {
  const { user, isLoading, hasRole } = useAuth()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      // Si no hay usuario o no tiene el rol adecuado, redirigir
      if (!user || !hasRole(allowedRoles)) {
        if (typeof window !== "undefined") {
          // Añadir parámetro para indicar la página de destino después del login
          const destination = window.location.pathname
          window.location.href = `${redirectTo}?destination=${encodeURIComponent(destination)}`
        }
      } else {
        setIsAuthorized(true)
      }
    }
  }, [user, isLoading, hasRole, allowedRoles, redirectTo])

  // Mientras carga, mostrar un indicador de carga
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>
  }

  // Si el usuario está autorizado, mostrar el contenido
  return isAuthorized ? <>{children}</> : null
}
