// Tipos para nuestro sistema de autenticación
export type UserRole = "cliente" | "personal" | "admin"

export interface User {
  id: string
  name: string
  email: string
  documentId?: string // Número de documento (opcional)
  role: UserRole
  avatar?: string
}

// Usuarios predefinidos para cada rol
export const predefinedUsers: User[] = [
  // Administradores
  {
    id: "admin-1",
    name: "Carlos Administrador",
    email: "admin@medicitas.com",
    documentId: "A12345678",
    role: "admin",
    avatar: "CA",
  },

  // Personal médico
  {
    id: "personal-1",
    name: "Dr. Juan Rodríguez",
    email: "juan.rodriguez@medicitas.com",
    documentId: "P12345678",
    role: "personal",
    avatar: "JR",
  },
  {
    id: "personal-2",
    name: "Dra. Ana Martínez",
    email: "ana.martinez@medicitas.com",
    documentId: "P87654321",
    role: "personal",
    avatar: "AM",
  },

  // Clientes/Pacientes
  {
    id: "cliente-1",
    name: "María García",
    email: "maria@ejemplo.com",
    documentId: "C12345678",
    role: "cliente",
    avatar: "MG",
  },
  {
    id: "cliente-2",
    name: "Carlos López",
    email: "carlos@ejemplo.com",
    documentId: "C87654321",
    role: "cliente",
    avatar: "CL",
  },
]

// Función para autenticar usuarios
export function authenticateUser(emailOrDocument: string, password: string): User | null {
  // En un sistema real, verificaríamos la contraseña con hash
  // Aquí simplemente verificamos que el email o documento exista
  // y asumimos que la contraseña es correcta para simplificar

  const user = predefinedUsers.find(
    (user) => user.email.toLowerCase() === emailOrDocument.toLowerCase() || user.documentId === emailOrDocument,
  )

  return user || null
}

// Funciones para manejar la sesión en localStorage
export function saveUserSession(user: User): void {
  localStorage.setItem("medicitas_user", JSON.stringify(user))
}

export function getUserSession(): User | null {
  const userJson = localStorage.getItem("medicitas_user")
  if (!userJson) return null

  try {
    return JSON.parse(userJson) as User
  } catch (error) {
    console.error("Error parsing user session:", error)
    return null
  }
}

export function clearUserSession(): void {
  localStorage.removeItem("medicitas_user")
}

// Función para verificar si un usuario tiene acceso a una ruta específica
export function hasAccess(user: User | null, allowedRoles: UserRole[]): boolean {
  if (!user) return false
  return allowedRoles.includes(user.role)
}
