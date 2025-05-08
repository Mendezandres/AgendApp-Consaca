"use client"

import { useState } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar, Clock, Search, FileText, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

// Datos de ejemplo para las citas
const appointments = [
  {
    id: "1",
    specialty: "Medicina General",
    doctor: "Dr. Juan Rodríguez",
    date: new Date(2025, 4, 15, 9, 0),
    status: "confirmada",
    location: "Consultorio 103, Edificio Principal",
    notes: "Traer resultados de análisis previos",
  },
  {
    id: "2",
    specialty: "Cardiología",
    doctor: "Dra. Ana Martínez",
    date: new Date(2025, 4, 20, 10, 30),
    status: "pendiente",
    location: "Consultorio 205, Edificio Especialidades",
    notes: "Ayuno de 8 horas requerido",
  },
  {
    id: "3",
    specialty: "Pediatría",
    doctor: "Dr. Roberto Gómez",
    date: new Date(2025, 3, 10, 11, 0),
    status: "completada",
    location: "Consultorio 110, Edificio Principal",
    notes: "Traer cartilla de vacunación",
    prescription: "Paracetamol 250mg cada 8 horas por 3 días",
    diagnosis: "Infección respiratoria leve",
  },
  {
    id: "4",
    specialty: "Dermatología",
    doctor: "Dra. Sofía Vargas",
    date: new Date(2025, 3, 5, 9, 0),
    status: "cancelada",
    location: "Consultorio 302, Edificio Especialidades",
    notes: "",
  },
]

export function PatientAppointments() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrar citas por término de búsqueda
  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Separar citas por estado
  const upcomingAppointments = filteredAppointments.filter(
    (appointment) => appointment.status === "confirmada" || appointment.status === "pendiente",
  )
  const pastAppointments = filteredAppointments.filter(
    (appointment) => appointment.status === "completada" || appointment.status === "cancelada",
  )

  // Función para obtener el color de la insignia según el estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmada":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "completada":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "cancelada":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const handleCancelAppointment = () => {
    toast({
      title: "Cita cancelada",
      description: "Tu cita ha sido cancelada exitosamente.",
    })
  }

  const handleRescheduleAppointment = () => {
    toast({
      title: "Solicitud enviada",
      description: "Tu solicitud de reprogramación ha sido enviada. Te contactaremos pronto.",
    })
  }

  const handleSubmitReview = () => {
    toast({
      title: "Valoración enviada",
      description: "Gracias por compartir tu experiencia con nosotros.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="search"
            placeholder="Buscar por especialidad o doctor"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="proximas" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="proximas">Próximas Citas</TabsTrigger>
          <TabsTrigger value="historial">Historial</TabsTrigger>
        </TabsList>
        <TabsContent value="proximas" className="mt-6">
          {upcomingAppointments.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-bold">{appointment.specialty}</CardTitle>
                      <Badge className={getStatusColor(appointment.status)} variant="outline">
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </Badge>
                    </div>
                    <CardDescription>{appointment.doctor}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          {format(appointment.date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{format(appointment.date, "HH:mm")}</span>
                      </div>
                      <div className="pt-2">
                        <p className="text-sm font-medium">Ubicación:</p>
                        <p className="text-sm text-muted-foreground">{appointment.location}</p>
                      </div>
                      {appointment.notes && (
                        <div className="pt-2">
                          <p className="text-sm font-medium">Notas:</p>
                          <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Reprogramar
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Solicitar reprogramación</DialogTitle>
                          <DialogDescription>
                            Indícanos los motivos y sugerencias de nuevas fechas para tu cita.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Cita actual:</p>
                            <p className="text-sm">
                              {appointment.specialty} con {appointment.doctor}
                            </p>
                            <p className="text-sm">
                              {format(appointment.date, "EEEE, d 'de' MMMM 'de' yyyy, HH:mm", { locale: es })}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="reason" className="text-sm font-medium">
                              Motivo de reprogramación
                            </label>
                            <Textarea id="reason" placeholder="Explica brevemente por qué necesitas reprogramar" />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="dates" className="text-sm font-medium">
                              Fechas sugeridas
                            </label>
                            <Textarea id="dates" placeholder="Sugiere algunas fechas y horarios que te convengan" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => {}}>
                            Cancelar
                          </Button>
                          <Button onClick={handleRescheduleAppointment}>Enviar solicitud</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          Cancelar
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Cancelar cita</DialogTitle>
                          <DialogDescription>
                            ¿Estás seguro de que deseas cancelar esta cita? Esta acción no se puede deshacer.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Detalles de la cita:</p>
                            <p className="text-sm">
                              {appointment.specialty} con {appointment.doctor}
                            </p>
                            <p className="text-sm">
                              {format(appointment.date, "EEEE, d 'de' MMMM 'de' yyyy, HH:mm", { locale: es })}
                            </p>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => {}}>
                            Volver
                          </Button>
                          <Button variant="destructive" onClick={handleCancelAppointment}>
                            Confirmar cancelación
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No tienes citas programadas próximamente.</p>
              <Button className="mt-4 bg-teal-600 hover:bg-teal-700">Agendar Nueva Cita</Button>
            </div>
          )}
        </TabsContent>
        <TabsContent value="historial" className="mt-6">
          {pastAppointments.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pastAppointments.map((appointment) => (
                <Card key={appointment.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-bold">{appointment.specialty}</CardTitle>
                      <Badge className={getStatusColor(appointment.status)} variant="outline">
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </Badge>
                    </div>
                    <CardDescription>{appointment.doctor}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          {format(appointment.date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{format(appointment.date, "HH:mm")}</span>
                      </div>
                      {appointment.diagnosis && (
                        <div className="pt-2">
                          <p className="text-sm font-medium">Diagnóstico:</p>
                          <p className="text-sm text-muted-foreground">{appointment.diagnosis}</p>
                        </div>
                      )}
                      {appointment.prescription && (
                        <div className="pt-2">
                          <p className="text-sm font-medium">Receta:</p>
                          <p className="text-sm text-muted-foreground">{appointment.prescription}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-3">
                    {appointment.status === "completada" && (
                      <>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="flex items-center">
                              <FileText className="h-4 w-4 mr-2" />
                              Ver Detalles
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Detalles de la consulta</DialogTitle>
                              <DialogDescription>
                                Información completa sobre tu consulta médica pasada.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <p className="text-sm font-medium">Especialidad:</p>
                                <p className="text-sm">{appointment.specialty}</p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm font-medium">Doctor:</p>
                                <p className="text-sm">{appointment.doctor}</p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm font-medium">Fecha y hora:</p>
                                <p className="text-sm">
                                  {format(appointment.date, "EEEE, d 'de' MMMM 'de' yyyy, HH:mm", {
                                    locale: es,
                                  })}
                                </p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm font-medium">Diagnóstico:</p>
                                <p className="text-sm">{appointment.diagnosis || "No disponible"}</p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm font-medium">Receta:</p>
                                <p className="text-sm">{appointment.prescription || "No disponible"}</p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm font-medium">Notas:</p>
                                <p className="text-sm">{appointment.notes || "No disponible"}</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="flex items-center">
                              <Star className="h-4 w-4 mr-2" />
                              Valorar
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Valorar consulta</DialogTitle>
                              <DialogDescription>
                                Comparte tu experiencia para ayudarnos a mejorar nuestro servicio.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <p className="text-sm font-medium">Consulta con:</p>
                                <p className="text-sm">
                                  {appointment.doctor} - {appointment.specialty}
                                </p>
                                <p className="text-sm">
                                  {format(appointment.date, "d 'de' MMMM 'de' yyyy", { locale: es })}
                                </p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Calificación general</label>
                                <div className="flex space-x-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Button key={star} variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <Star className="h-6 w-6" />
                                    </Button>
                                  ))}
                                </div>
                              </div>
                              <div className="space-y-2">
                                <label htmlFor="comments" className="text-sm font-medium">
                                  Comentarios
                                </label>
                                <Textarea id="comments" placeholder="Comparte tu experiencia con esta consulta" />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => {}}>
                                Cancelar
                              </Button>
                              <Button onClick={handleSubmitReview}>Enviar valoración</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </>
                    )}
                    {appointment.status === "cancelada" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          toast({
                            title: "Redirigiendo",
                            description: "Te estamos redirigiendo a la página de agendamiento.",
                          })
                        }}
                      >
                        Reagendar Cita
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No tienes historial de citas previas.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
