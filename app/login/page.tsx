"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarDays } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const { login, user } = useAuth()

  // Verificar si el usuario ya está autenticado
  useEffect(() => {
    if (user) {
      // Verificar si hay un parámetro de destino en la URL
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search)
        const destination = params.get("destination")

        if (destination) {
          window.location.href = destination
          return
        }

        // Si no hay destino, redirigir según el rol
        switch (user.role) {
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
    }
  }, [user])

  // Verificar si hay un parámetro de tab en la URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const tabParam = params.get("tab")
      if (tabParam === "register") {
        setActiveTab("register")
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(identifier, password)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <CalendarDays className="h-12 w-12 text-sky-500" />
          </div>
          <CardTitle className="text-2xl text-center">Bienvenido a MediCitas</CardTitle>
          <CardDescription className="text-center">Accede a nuestro sistema de agendamiento médico</CardDescription>
        </CardHeader>

        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>

          {/* Pestaña de Inicio de Sesión */}
          <TabsContent value="login">
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="identifier">Correo o Número de Documento</Label>
                  <Input
                    id="identifier"
                    placeholder="ejemplo@correo.com o 12345678"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Contraseña</Label>
                    <Link href="#" className="text-sm text-sky-500 hover:text-sky-600">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">Para esta demo, ingresa cualquier contraseña</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600" disabled={isLoading}>
                  {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>

          {/* Pestaña de Registro (solo UI) */}
          <TabsContent value="register">
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Nombre Completo</Label>
                <Input id="register-name" placeholder="Juan Pérez" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Correo Electrónico</Label>
                <Input id="register-email" type="email" placeholder="ejemplo@correo.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-document">Número de Documento</Label>
                <Input id="register-document" placeholder="12345678" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Contraseña</Label>
                <Input id="register-password" type="password" placeholder="••••••••" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-confirm-password">Confirmar Contraseña</Label>
                <Input id="register-confirm-password" type="password" placeholder="••••••••" required />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Acepto los{" "}
                  <Link href="#" className="text-sky-500 hover:text-sky-600">
                    términos y condiciones
                  </Link>
                </label>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-sky-500 hover:bg-sky-800">Crear Cuenta</Button>
            </CardFooter>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
