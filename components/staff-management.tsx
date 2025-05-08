"use client"

import { useState } from "react"
import { Search, Filter, Edit, Trash, UserPlus, Mail, Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

// Datos de ejemplo para el personal médico
const staffMembers = [
  {
    id: "1",
    name: "Dr. Juan Rodríguez",
    specialty: "Medicina General",
    email: "juan.rodriguez@ejemplo.com",
    phone: "+1 234 567 890",
    status: "activo",
    appointments: 42,
    rating: 4.8,
    avatar: "JR",
  },
  {
    id: "2",
    name: "Dra. Ana Martínez",
    specialty: "Cardiología",
    email: "ana.martinez@ejemplo.com",
    phone: "+1 234 567 891",
    status: "activo",
    appointments: 38,
    rating: 4.7,
    avatar: "AM",
  },
  {
    id: "3",
    name: "Dr. Roberto Gómez",
    specialty: "Pediatría",
    email: "roberto.gomez@ejemplo.com",
    phone: "+1 234 567 892",
    status: "activo",
    appointments: 35,
    rating: 4.5,
    avatar: "RG",
  },
  {
    id: "4",
    name: "Dra. Sofía Vargas",
    specialty: "Dermatología",
    email: "sofia.vargas@ejemplo.com",
    phone: "+1 234 567 893",
    status: "inactivo",
    appointments: 29,
    rating: 4.9,
    avatar: "SV",
  },
  {
    id: "5",
    name: "Dr. Miguel Ángel Pérez",
    specialty: "Oftalmología",
    email: "miguel.perez@ejemplo.com",
    phone: "+1 234 567 894",
    status: "activo",
    appointments: 24,
    rating: 4.6,
    avatar: "MP",
  },
]

export function StaffManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [specialtyFilter, setSpecialtyFilter] = useState("todas")

  // Filtrar personal por término de búsqueda y especialidad
  const filteredStaff = staffMembers.filter(
    (staff) =>
      (staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (specialtyFilter === "todas" || staff.specialty.toLowerCase() === specialtyFilter.toLowerCase()),
  )

  const handleAddStaff = () => {
    toast({
      title: "Personal añadido",
      description: "El nuevo miembro del personal ha sido añadido exitosamente.",
    })
  }

  const handleEditStaff = () => {
    toast({
      title: "Información actualizada",
      description: "La información del personal ha sido actualizada exitosamente.",
    })
  }

  const handleDeleteStaff = () => {
    toast({
      title: "Personal eliminado",
      description: "El miembro del personal ha sido eliminado exitosamente.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl text-sky-500">Gestión de Personal</CardTitle>
              <CardDescription>Administre el personal médico y sus especialidades</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-sky-500 hover:bg-sky-600">
                  <UserPlus className="h-4 w-4 mr-2" /> Añadir Personal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Añadir Nuevo Personal</DialogTitle>
                  <DialogDescription>
                    Complete la información para añadir un nuevo miembro del personal.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nombre
                    </Label>
                    <Input id="name" placeholder="Dr. Juan Pérez" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="specialty" className="text-right">
                      Especialidad
                    </Label>
                    <Select>
                      <SelectTrigger id="specialty" className="col-span-3">
                        <SelectValue placeholder="Seleccionar especialidad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medicina-general">Medicina General</SelectItem>
                        <SelectItem value="cardiologia">Cardiología</SelectItem>
                        <SelectItem value="pediatria">Pediatría</SelectItem>
                        <SelectItem value="dermatologia">Dermatología</SelectItem>
                        <SelectItem value="oftalmologia">Oftalmología</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" type="email" placeholder="doctor@ejemplo.com" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Teléfono
                    </Label>
                    <Input id="phone" placeholder="+1 234 567 890" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancelar</Button>
                  <Button onClick={handleAddStaff}>Añadir Personal</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="search"
                placeholder="Buscar por nombre, especialidad o email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" size="icon" variant="ghost">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Todas las especialidades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las especialidades</SelectItem>
                  <SelectItem value="medicina general">Medicina General</SelectItem>
                  <SelectItem value="cardiología">Cardiología</SelectItem>
                  <SelectItem value="pediatría">Pediatría</SelectItem>
                  <SelectItem value="dermatología">Dermatología</SelectItem>
                  <SelectItem value="oftalmología">Oftalmología</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Especialidad</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Citas</TableHead>
                  <TableHead>Valoración</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg" alt={staff.name} />
                            <AvatarFallback>{staff.avatar}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{staff.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{staff.specialty}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">{staff.email}</span>
                          </div>
                          <div className="flex items-center text-sm mt-1">
                            <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">{staff.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            staff.status === "activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }
                        >
                          {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{staff.appointments}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= Math.floor(staff.rating) ? "text-yellow-400" : "text-gray-300"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 15.585l-7.07 3.715 1.35-7.865L.36 7.13l7.91-1.15L10 0l2.73 5.98 7.91 1.15-5.92 5.305 1.35 7.865z"
                                />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-2">{staff.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Editar Personal</DialogTitle>
                                <DialogDescription>
                                  Actualice la información del miembro del personal.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-name" className="text-right">
                                    Nombre
                                  </Label>
                                  <Input id="edit-name" defaultValue={staff.name} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-specialty" className="text-right">
                                    Especialidad
                                  </Label>
                                  <Select defaultValue={staff.specialty.toLowerCase().replace(" ", "-")}>
                                    <SelectTrigger id="edit-specialty" className="col-span-3">
                                      <SelectValue placeholder={staff.specialty} />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="medicina-general">Medicina General</SelectItem>
                                      <SelectItem value="cardiologia">Cardiología</SelectItem>
                                      <SelectItem value="pediatria">Pediatría</SelectItem>
                                      <SelectItem value="dermatologia">Dermatología</SelectItem>
                                      <SelectItem value="oftalmologia">Oftalmología</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-email" className="text-right">
                                    Email
                                  </Label>
                                  <Input
                                    id="edit-email"
                                    type="email"
                                    defaultValue={staff.email}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-phone" className="text-right">
                                    Teléfono
                                  </Label>
                                  <Input id="edit-phone" defaultValue={staff.phone} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-status" className="text-right">
                                    Estado
                                  </Label>
                                  <Select defaultValue={staff.status}>
                                    <SelectTrigger id="edit-status" className="col-span-3">
                                      <SelectValue placeholder={staff.status} />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="activo">Activo</SelectItem>
                                      <SelectItem value="inactivo">Inactivo</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Cancelar</Button>
                                <Button onClick={handleEditStaff}>Guardar Cambios</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Eliminar Personal</DialogTitle>
                                <DialogDescription>
                                  ¿Está seguro de que desea eliminar a este miembro del personal? Esta acción no se
                                  puede deshacer.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-4">
                                <div className="flex items-center space-x-3">
                                  <Avatar>
                                    <AvatarImage src="/placeholder.svg" alt={staff.name} />
                                    <AvatarFallback>{staff.avatar}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{staff.name}</p>
                                    <p className="text-sm text-muted-foreground">{staff.specialty}</p>
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Cancelar</Button>
                                <Button variant="destructive" onClick={handleDeleteStaff}>
                                  Eliminar
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No se encontraron miembros del personal que coincidan con los criterios de búsqueda.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando {filteredStaff.length} de {staffMembers.length} miembros del personal
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
