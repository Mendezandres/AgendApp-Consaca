"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import {
  type User,
  type UserRole,
  authenticateUser,
  clearUserSession,
  getUserSession,
  saveUserSession,
} from "@/lib/auth"
import { toast } from "@/hooks/use-toast"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (emailOrDocument: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  hasRole: (roles: UserRole | UserRole[]) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    // Usamos esta función para evitar errores de hidratación
    const loadUser = () => {
      try {
        const savedUser = getUserSession()
        setUser(savedUser)
      } catch (error) {
        console.error("Error loading user session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    // Solo ejecutamos en el cliente
    if (typeof window !== "undefined") {
      loadUser()
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = async (emailOrDocument: string, password: string): Promise<boolean> => {
    try {
      const authenticatedUser = authenticateUser(emailOrDocument, password)

      if (authenticatedUser) {
        setUser(authenticatedUser)
        saveUserSession(authenticatedUser)

        toast({
          title: "Inicio de sesión exitoso",
          description: `Bienvenido/a, ${authenticatedUser.name}`,
        })

        // Verificar si hay un parámetro de destino en la URL
        if (typeof window !== "undefined") {
          const params = new URLSearchParams(window.location.search)
          const destination = params.get("destination")

          if (destination) {
            window.location.href = destination
            return true
          }

          // Si no hay destino, redirigir según el rol
          switch (authenticatedUser.role) {
            case "admin":
              window.location.href = "/admin"
              break
            case "personal":
              window.location.href = "/personal"
              break
            case "cliente":
              window.location.href = "/clientes"
              break
            default:
              window.location.href = "/"
          }
        }

        return true
      } else {
        toast({
          title: "Error de inicio de sesión",
          description: "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
          variant: "destructive",
        })

        return false
      }
    } catch (error) {
      console.error("Error during login:", error)

      toast({
        title: "Error de inicio de sesión",
        description: "Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })

      return false
    }
  }

  const logout = () => {
    setUser(null)
    clearUserSession()

    if (typeof window !== "undefined") {
      window.location.href = "/"
    }

    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente.",
    })
  }

  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false

    if (Array.isArray(roles)) {
      return roles.includes(user.role)
    }

    return user.role === roles
  }

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
    hasRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
