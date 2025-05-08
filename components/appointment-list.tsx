"use client"

import { useState } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Search, Filter, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Datos de ejemplo para las citas
const appointments = [
  {
    id: "1",
    patient: "María García",
    specialty: "Medicina General",
    doctor: "Dr. Juan Rodríguez",
    date: new Date(2025, 4, 15, 9, 0),
    status: "confirmada",
    contact: "+1 234 567 890",
    email: "maria@ejemplo.com",
    reason: "Control de presión arterial",
  },
  {
    id: "2",
    patient: "Carlos López",
    specialty: "Cardiología",
    doctor: "Dra. Ana Martínez",
    date: new Date(2025, 4, 15, 10, 30),
    status: "pendiente",
    contact: "+1 234 567 891",
    email: "carlos@ejemplo.com",
    reason: "Revisión post-operatoria",
  },
  {
    id: "3",
    patient: "Laura Sánchez",
    specialty: "Pediatría",
    doctor: "Dr. Roberto Gómez",
    date: new Date(2025, 4, 15, 11, 0),
    status: "confirmada",
    contact: "+1 234 567 892",
    email: "laura@ejemplo.com",
    reason: "Vacunación",
  },
  {
    id: "4",
    patient: "Pedro Ramírez",
    specialty: "Dermatología",
    doctor: "Dra. Sofía Vargas",
    date: new Date(2025, 4, 16, 9, 0),
    status: "cancelada",
    contact: "+1 234 567 893",
    email: "pedro@ejemplo.com",
    reason: "Revisión de lesión cutánea",
  },
  {
    id: "5",
    patient: "Ana Torres",
    specialty: "Oftalmología",
    doctor: "Dr. Miguel Ángel Pérez",
    date: new Date(2025, 4, 16, 12, 0),
    status: "confirmada",
    contact: "+1 234 567 894",
    email: "ana@ejemplo.com",
    reason: "Control anual de visión",
  },
  {
    id: "6",
    patient: "Javier Morales",
    specialty: "Traumatología",
    doctor: "Dra. Carmen Ruiz",
    date: new Date(2025, 4, 17, 15, 30),
    status: "pendiente",
    contact: "+1 234 567 895",
    email: "javier@ejemplo.com",
    reason: "Dolor en rodilla izquierda",
  },
]

type AppointmentListProps = {
  showPatientDetails?: boolean
  showActions?: boolean
  title?: string
  description?: string
}

export function AppointmentList({
  showPatientDetails = true,
  showActions = true,
  title = "Citas Programadas",
  description = "Gestiona las citas médicas programadas",
}: AppointmentListProps) {
  const [date, setDate] = useState<Date>()
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrar citas por fecha y término de búsqueda
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesDate =
      !date ||
      (appointment.date.getDate() === date.getDate() &&
        appointment.date.getMonth() === date.getMonth() &&
        appointment.date.getFullYear() === date.getFullYear())

    const matchesSearch =
      !searchTerm ||
      appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesDate && matchesSearch
  })

  // Función para obtener el color de la insignia según el estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmada":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "cancelada":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-sky-500">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="search"
              placeholder="Buscar por paciente, especialidad o doctor"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" size="icon" variant="ghost">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: es }) : <span>Filtrar por fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
            {date && (
              <Button variant="ghost" size="icon" onClick={() => setDate(undefined)}>
                <Filter className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Paciente</TableHead>
                <TableHead>Especialidad</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Fecha y Hora</TableHead>
                <TableHead>Estado</TableHead>
                {showPatientDetails && (
                  <>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Motivo</TableHead>
                  </>
                )}
                {showActions && <TableHead className="text-right">Acciones</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">{appointment.patient}</TableCell>
                    <TableCell>{appointment.specialty}</TableCell>
                    <TableCell>{appointment.doctor}</TableCell>
                    <TableCell>
                      {format(appointment.date, "PPP", { locale: es })} - {format(appointment.date, "HH:mm")}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(appointment.status)} variant="outline">
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </Badge>
                    </TableCell>
                    {showPatientDetails && (
                      <>
                        <TableCell>
                          <div>{appointment.contact}</div>
                          <div className="text-xs text-muted-foreground">{appointment.email}</div>
                        </TableCell>
                        <TableCell>{appointment.reason}</TableCell>
                      </>
                    )}
                    {showActions && (
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Abrir menú</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                            <DropdownMenuItem>Editar cita</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Cancelar cita</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={showPatientDetails ? (showActions ? 8 : 7) : showActions ? 6 : 5}
                    className="h-24 text-center"
                  >
                    No se encontraron citas que coincidan con los criterios de búsqueda.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
