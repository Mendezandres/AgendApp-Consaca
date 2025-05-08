"use client"

import { useState } from "react"
import { format, startOfWeek } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Clock, Plus, X, Save, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Datos de ejemplo para el horario
const initialSchedule = [
  {
    day: "Lunes",
    slots: [
      { start: "08:00", end: "12:00", available: true },
      { start: "14:00", end: "18:00", available: true },
    ],
  },
  {
    day: "Martes",
    slots: [
      { start: "08:00", end: "12:00", available: true },
      { start: "14:00", end: "18:00", available: true },
    ],
  },
  {
    day: "Miércoles",
    slots: [
      { start: "08:00", end: "12:00", available: true },
      { start: "14:00", end: "18:00", available: true },
    ],
  },
  {
    day: "Jueves",
    slots: [
      { start: "08:00", end: "12:00", available: true },
      { start: "14:00", end: "18:00", available: true },
    ],
  },
  {
    day: "Viernes",
    slots: [
      { start: "08:00", end: "12:00", available: true },
      { start: "14:00", end: "16:00", available: true },
    ],
  },
  {
    day: "Sábado",
    slots: [{ start: "09:00", end: "13:00", available: false }],
  },
  {
    day: "Domingo",
    slots: [],
  },
]

// Datos de ejemplo para las citas del día
const appointmentsForDay = [
  {
    id: "1",
    patient: "María García",
    time: "09:00 - 09:30",
    reason: "Control de presión arterial",
    status: "confirmada",
  },
  {
    id: "2",
    patient: "Carlos López",
    time: "10:30 - 11:00",
    reason: "Revisión post-operatoria",
    status: "pendiente",
  },
  {
    id: "3",
    patient: "Laura Sánchez",
    time: "11:30 - 12:00",
    reason: "Vacunación",
    status: "confirmada",
  },
  {
    id: "4",
    patient: "Pedro Ramírez",
    time: "15:00 - 15:30",
    reason: "Consulta general",
    status: "confirmada",
  },
  {
    id: "5",
    patient: "Ana Torres",
    time: "16:30 - 17:00",
    reason: "Seguimiento de tratamiento",
    status: "confirmada",
  },
]

export function StaffSchedule() {
  const [date, setDate] = useState<Date>(new Date())
  const [schedule, setSchedule] = useState(initialSchedule)
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }))

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate)
    }
  }

  const handlePreviousWeek = () => {
    const newWeekStart = new Date(currentWeekStart)
    newWeekStart.setDate(currentWeekStart.getDate() - 7)
    setCurrentWeekStart(newWeekStart)
  }

  const handleNextWeek = () => {
    const newWeekStart = new Date(currentWeekStart)
    newWeekStart.setDate(currentWeekStart.getDate() + 7)
    setCurrentWeekStart(newWeekStart)
  }

  const handleSaveSchedule = () => {
    toast({
      title: "Horario guardado",
      description: "Tu horario ha sido actualizado correctamente.",
    })
  }

  const handleToggleAvailability = (dayIndex: number, slotIndex: number) => {
    const newSchedule = [...schedule]
    newSchedule[dayIndex].slots[slotIndex].available = !newSchedule[dayIndex].slots[slotIndex].available
    setSchedule(newSchedule)
  }

  const handleAddTimeSlot = (dayIndex: number) => {
    const newSchedule = [...schedule]
    newSchedule[dayIndex].slots.push({ start: "09:00", end: "10:00", available: true })
    setSchedule(newSchedule)
  }

  const handleRemoveTimeSlot = (dayIndex: number, slotIndex: number) => {
    const newSchedule = [...schedule]
    newSchedule[dayIndex].slots.splice(slotIndex, 1)
    setSchedule(newSchedule)
  }

  // Función para obtener el color de la insignia según el estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmada":
        return "bg-green-100 text-green-800"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-sky-500">Mi Horario de Consulta</CardTitle>
          <CardDescription>Configure su disponibilidad semanal para citas</CardDescription>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={handlePreviousWeek}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">{format(currentWeekStart, "'Semana del' d 'de' MMMM", { locale: es })}</span>
              <Button variant="outline" size="icon" onClick={handleNextWeek}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {schedule.map((day, dayIndex) => (
              <Card key={day.day} className="overflow-hidden">
                <CardHeader className="p-3">
                  <CardTitle className="text-sm font-medium">{day.day}</CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="space-y-2">
                    {day.slots.map((slot, slotIndex) => (
                      <div key={slotIndex} className="flex items-center justify-between space-x-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>
                            {slot.start} - {slot.end}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={slot.available}
                            onCheckedChange={() => handleToggleAvailability(dayIndex, slotIndex)}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleRemoveTimeSlot(dayIndex, slotIndex)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 w-full text-xs"
                    onClick={() => handleAddTimeSlot(dayIndex)}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Añadir horario
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSaveSchedule} className="bg-sky-500 hover:bg-sky-600">
            <Save className="mr-2 h-4 w-4" /> Guardar Horario
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-sky-500">
            Citas para {format(date, "EEEE, d 'de' MMMM", { locale: es })}
          </CardTitle>
          <CardDescription>Visualice las citas programadas para el día seleccionado</CardDescription>
        </CardHeader>
        <CardContent>
          {appointmentsForDay.length > 0 ? (
            <div className="space-y-4">
              {appointmentsForDay.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50"
                >
                  <div className="space-y-1">
                    <div className="font-medium">{appointment.patient}</div>
                    <div className="text-sm text-muted-foreground">{appointment.time}</div>
                    <div className="text-sm">{appointment.reason}</div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No hay citas programadas para este día.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-sky-500">Configuración de Disponibilidad</CardTitle>
          <CardDescription>Configure sus preferencias de disponibilidad y notificaciones</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Preferencias generales</h3>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-confirm">Confirmación automática</Label>
                <p className="text-sm text-muted-foreground">
                  Confirmar automáticamente las citas programadas en horarios disponibles
                </p>
              </div>
              <Switch id="auto-confirm" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="buffer-time">Tiempo entre citas</Label>
                <p className="text-sm text-muted-foreground">Añadir un tiempo de descanso entre citas consecutivas</p>
              </div>
              <Switch id="buffer-time" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="vacation-mode">Modo vacaciones</Label>
                <p className="text-sm text-muted-foreground">
                  Desactivar todas las citas durante un período específico
                </p>
              </div>
              <Switch id="vacation-mode" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Notificaciones</h3>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Notificaciones por correo</Label>
                <p className="text-sm text-muted-foreground">
                  Recibir notificaciones por correo electrónico sobre nuevas citas
                </p>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sms-notifications">Notificaciones por SMS</Label>
                <p className="text-sm text-muted-foreground">
                  Recibir notificaciones por mensaje de texto sobre nuevas citas
                </p>
              </div>
              <Switch id="sms-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="daily-summary">Resumen diario</Label>
                <p className="text-sm text-muted-foreground">
                  Recibir un resumen diario de las citas programadas para el día siguiente
                </p>
              </div>
              <Switch id="daily-summary" defaultChecked />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="bg-sky-500 hover:bg-sky-600">Guardar Configuración</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
