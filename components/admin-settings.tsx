"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

export function AdminSettings() {
  const handleSaveGeneralSettings = () => {
    toast({
      title: "Configuración guardada",
      description: "La configuración general ha sido actualizada correctamente.",
    })
  }

  const handleSaveAppointmentSettings = () => {
    toast({
      title: "Configuración guardada",
      description: "La configuración de citas ha sido actualizada correctamente.",
    })
  }

  const handleSaveNotificationSettings = () => {
    toast({
      title: "Configuración guardada",
      description: "La configuración de notificaciones ha sido actualizada correctamente.",
    })
  }

  const handleSaveSecuritySettings = () => {
    toast({
      title: "Configuración guardada",
      description: "La configuración de seguridad ha sido actualizada correctamente.",
    })
  }

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="citas">Citas</TabsTrigger>
        <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
        <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="mt-6">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Configuración General</CardTitle>
            <CardDescription>Gestione la configuración general del sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Información de la Clínica</h3>
              <div className="space-y-2">
                <Label htmlFor="clinic-name">Nombre de la Clínica</Label>
                <Input id="clinic-name" defaultValue="MediCitas Centro Médico" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clinic-address">Dirección</Label>
                <Textarea id="clinic-address" defaultValue="Calle Principal 123, Ciudad Ejemplo, CP 12345" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clinic-phone">Teléfono</Label>
                  <Input id="clinic-phone" defaultValue="+1 234 567 890" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clinic-email">Correo Electrónico</Label>
                  <Input id="clinic-email" type="email" defaultValue="contacto@medicitas.com" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Horario de Atención</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="opening-time">Hora de Apertura</Label>
                  <Input id="opening-time" type="time" defaultValue="08:00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="closing-time">Hora de Cierre</Label>
                  <Input id="closing-time" type="time" defaultValue="20:00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Días de Atención</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="monday" defaultChecked />
                    <Label htmlFor="monday">Lunes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="tuesday" defaultChecked />
                    <Label htmlFor="tuesday">Martes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="wednesday" defaultChecked />
                    <Label htmlFor="wednesday">Miércoles</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="thursday" defaultChecked />
                    <Label htmlFor="thursday">Jueves</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="friday" defaultChecked />
                    <Label htmlFor="friday">Viernes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="saturday" defaultChecked />
                    <Label htmlFor="saturday">Sábado</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="sunday" />
                    <Label htmlFor="sunday">Domingo</Label>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personalización</h3>
              <div className="space-y-2">
                <Label htmlFor="primary-color">Color Principal</Label>
                <div className="flex items-center space-x-2">
                  <Input id="primary-color" type="color" defaultValue="#00a6fb" className="w-12 h-10 p-1" />
                  <Input defaultValue="#00a6fb" className="flex-1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">Logo de la Clínica</Label>
                <Input id="logo" type="file" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveGeneralSettings} className="ml-auto bg-sky-500 hover:bg-sky-600">
              Guardar Configuración
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="citas" className="mt-6">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Configuración de Citas</CardTitle>
            <CardDescription>Gestione la configuración relacionada con las citas médicas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Duración de Citas</h3>
              <div className="space-y-2">
                <Label htmlFor="default-duration">Duración Predeterminada (minutos)</Label>
                <Select defaultValue="30">
                  <SelectTrigger id="default-duration">
                    <SelectValue placeholder="Seleccionar duración" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="20">20 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="45">45 minutos</SelectItem>
                    <SelectItem value="60">60 minutos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="buffer-time">Tiempo entre Citas (minutos)</Label>
                <Select defaultValue="5">
                  <SelectTrigger id="buffer-time">
                    <SelectValue placeholder="Seleccionar tiempo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0 minutos</SelectItem>
                    <SelectItem value="5">5 minutos</SelectItem>
                    <SelectItem value="10">10 minutos</SelectItem>
                    <SelectItem value="15">15 minutos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Políticas de Citas</h3>
              <div className="space-y-2">
                <Label htmlFor="advance-booking">Tiempo Máximo de Anticipación (días)</Label>
                <Input id="advance-booking" type="number" defaultValue="60" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cancellation-policy">Tiempo Mínimo para Cancelación (horas)</Label>
                <Input id="cancellation-policy" type="number" defaultValue="24" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="auto-confirm" defaultChecked />
                <Label htmlFor="auto-confirm">Confirmar citas automáticamente</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="allow-reschedule" defaultChecked />
                <Label htmlFor="allow-reschedule">Permitir reprogramación de citas</Label>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Especialidades</h3>
              <div className="space-y-2">
                <Label htmlFor="specialties">Especialidades Disponibles</Label>
                <Textarea
                  id="specialties"
                  defaultValue="Medicina General, Pediatría, Ginecología, Cardiología, Dermatología, Oftalmología, Traumatología, Neurología"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveAppointmentSettings} className="ml-auto bg-sky-500 hover:bg-sky-500">
              Guardar Configuración
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="notificaciones" className="mt-6">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Configuración de Notificaciones</CardTitle>
            <CardDescription>Gestione las notificaciones del sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notificaciones por Correo Electrónico</h3>
              <div className="flex items-center space-x-2">
                <Switch id="email-confirmation" defaultChecked />
                <Label htmlFor="email-confirmation">Enviar confirmación de cita</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="email-reminder" defaultChecked />
                <Label htmlFor="email-reminder">Enviar recordatorio de cita</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="email-cancellation" defaultChecked />
                <Label htmlFor="email-cancellation">Enviar notificación de cancelación</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="email-reschedule" defaultChecked />
                <Label htmlFor="email-reschedule">Enviar notificación de reprogramación</Label>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notificaciones por SMS</h3>
              <div className="flex items-center space-x-2">
                <Switch id="sms-confirmation" defaultChecked />
                <Label htmlFor="sms-confirmation">Enviar confirmación de cita</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="sms-reminder" defaultChecked />
                <Label htmlFor="sms-reminder">Enviar recordatorio de cita</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="sms-cancellation" />
                <Label htmlFor="sms-cancellation">Enviar notificación de cancelación</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="sms-reschedule" />
                <Label htmlFor="sms-reschedule">Enviar notificación de reprogramación</Label>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Tiempos de Recordatorio</h3>
              <div className="space-y-2">
                <Label htmlFor="reminder-time">Tiempo de Recordatorio (horas antes)</Label>
                <Select defaultValue="24">
                  <SelectTrigger id="reminder-time">
                    <SelectValue placeholder="Seleccionar tiempo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hora</SelectItem>
                    <SelectItem value="2">2 horas</SelectItem>
                    <SelectItem value="4">4 horas</SelectItem>
                    <SelectItem value="12">12 horas</SelectItem>
                    <SelectItem value="24">24 horas</SelectItem>
                    <SelectItem value="48">48 horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Plantillas de Mensajes</h3>
              <div className="space-y-2">
                <Label htmlFor="confirmation-template">Plantilla de Confirmación</Label>
                <Textarea
                  id="confirmation-template"
                  defaultValue="Estimado/a [nombre], su cita ha sido confirmada para el [fecha] a las [hora] con [doctor]. Por favor, llegue 10 minutos antes. Gracias."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reminder-template">Plantilla de Recordatorio</Label>
                <Textarea
                  id="reminder-template"
                  defaultValue="Recordatorio: Su cita está programada para mañana [fecha] a las [hora] con [doctor]. Por favor, confirme su asistencia. Gracias."
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveNotificationSettings} className="ml-auto bg-sky-500 hover:bg-sky-600">
              Guardar Configuración
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="seguridad" className="mt-6">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Configuración de Seguridad</CardTitle>
            <CardDescription>Gestione la seguridad y privacidad del sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Políticas de Contraseña</h3>
              <div className="space-y-2">
                <Label htmlFor="password-length">Longitud Mínima de Contraseña</Label>
                <Input id="password-length" type="number" defaultValue="8" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="require-uppercase" defaultChecked />
                <Label htmlFor="require-uppercase">Requerir mayúsculas</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="require-numbers" defaultChecked />
                <Label htmlFor="require-numbers">Requerir números</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="require-symbols" />
                <Label htmlFor="require-symbols">Requerir símbolos</Label>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Sesiones</h3>
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Tiempo de Inactividad para Cierre de Sesión (minutos)</Label>
                <Input id="session-timeout" type="number" defaultValue="30" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="force-logout" defaultChecked />
                <Label htmlFor="force-logout">Forzar cierre de sesión después de cambio de contraseña</Label>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Privacidad de Datos</h3>
              <div className="space-y-2">
                <Label htmlFor="data-retention">Período de Retención de Datos (años)</Label>
                <Input id="data-retention" type="number" defaultValue="5" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="anonymize-data" defaultChecked />
                <Label htmlFor="anonymize-data">Anonimizar datos para reportes estadísticos</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="encrypt-data" defaultChecked />
                <Label htmlFor="encrypt-data">Encriptar datos sensibles</Label>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Auditoría</h3>
              <div className="flex items-center space-x-2">
                <Switch id="audit-login" defaultChecked />
                <Label htmlFor="audit-login">Registrar intentos de inicio de sesión</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="audit-data-access" defaultChecked />
                <Label htmlFor="audit-data-access">Registrar acceso a datos sensibles</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="audit-data-changes" defaultChecked />
                <Label htmlFor="audit-data-changes">Registrar cambios en datos</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="audit-retention">Período de Retención de Registros de Auditoría (meses)</Label>
                <Input id="audit-retention" type="number" defaultValue="12" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSecuritySettings} className="ml-auto bg-sky-500 hover:bg-sky-600">
              Guardar Configuración
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
