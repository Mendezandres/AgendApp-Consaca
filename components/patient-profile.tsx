"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"

export function PatientProfile() {
  const [isEditing, setIsEditing] = useState(false)

  const handleSaveProfile = () => {
    setIsEditing(false)
    toast({
      title: "Perfil actualizado",
      description: "Tu información personal ha sido actualizada correctamente.",
    })
  }

  const handleSavePreferences = () => {
    toast({
      title: "Preferencias guardadas",
      description: "Tus preferencias han sido actualizadas correctamente.",
    })
  }

  const handleSaveMedicalInfo = () => {
    toast({
      title: "Información médica actualizada",
      description: "Tu información médica ha sido actualizada correctamente.",
    })
  }

  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-3">
        <TabsTrigger value="personal">Información Personal</TabsTrigger>
        <TabsTrigger value="medical">Información Médica</TabsTrigger>
        <TabsTrigger value="preferences">Preferencias</TabsTrigger>
      </TabsList>
      <TabsContent value="personal" className="mt-6">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>Gestiona tu información personal y de contacto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                defaultValue="María García López"
                disabled={!isEditing}
                className={!isEditing ? "bg-muted" : ""}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="maria.garcia@ejemplo.com"
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  defaultValue="+1 234 567 890"
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="dob">Fecha de nacimiento</Label>
                <Input
                  id="dob"
                  type="date"
                  defaultValue="1985-06-15"
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="gender">Género</Label>
                <Select disabled={!isEditing}>
                  <SelectTrigger id="gender" className={!isEditing ? "bg-muted" : ""}>
                    <SelectValue placeholder="Femenino" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Femenino</SelectItem>
                    <SelectItem value="male">Masculino</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefiero no decirlo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="address">Dirección</Label>
              <Textarea
                id="address"
                defaultValue="Calle Principal 123, Ciudad Ejemplo, CP 12345"
                disabled={!isEditing}
                className={!isEditing ? "bg-muted resize-none" : "resize-none"}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="emergency-contact">Contacto de emergencia</Label>
              <Input
                id="emergency-contact"
                defaultValue="Juan García - +1 234 567 891 (Hermano)"
                disabled={!isEditing}
                className={!isEditing ? "bg-muted" : ""}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveProfile} className="bg-sky-500 hover:bg-sky-600">
                  Guardar Cambios
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="ml-auto">
                Editar Información
              </Button>
            )}
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="medical" className="mt-6">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Información Médica</CardTitle>
            <CardDescription>Gestiona tu información médica relevante</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="blood-type">Tipo de sangre</Label>
              <Select>
                <SelectTrigger id="blood-type">
                  <SelectValue placeholder="Seleccionar tipo de sangre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a-positive">A+</SelectItem>
                  <SelectItem value="a-negative">A-</SelectItem>
                  <SelectItem value="b-positive">B+</SelectItem>
                  <SelectItem value="b-negative">B-</SelectItem>
                  <SelectItem value="ab-positive">AB+</SelectItem>
                  <SelectItem value="ab-negative">AB-</SelectItem>
                  <SelectItem value="o-positive">O+</SelectItem>
                  <SelectItem value="o-negative">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="allergies">Alergias</Label>
              <Textarea
                id="allergies"
                placeholder="Describe tus alergias (medicamentos, alimentos, etc.)"
                className="resize-none"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="chronic-conditions">Condiciones crónicas</Label>
              <Textarea
                id="chronic-conditions"
                placeholder="Describe cualquier condición crónica que tengas"
                className="resize-none"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="medications">Medicamentos actuales</Label>
              <Textarea
                id="medications"
                placeholder="Lista los medicamentos que tomas regularmente"
                className="resize-none"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="surgeries">Cirugías previas</Label>
              <Textarea
                id="surgeries"
                placeholder="Describe cirugías previas y fechas aproximadas"
                className="resize-none"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="family-history">Antecedentes familiares</Label>
              <Textarea
                id="family-history"
                placeholder="Describe condiciones médicas relevantes en tu familia"
                className="resize-none"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveMedicalInfo} className="ml-auto bg-sky-500 hover:bg-sky-600">
              Guardar Información Médica
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="preferences" className="mt-6">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Preferencias</CardTitle>
            <CardDescription>Personaliza tus preferencias de comunicación y notificaciones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notificaciones</h3>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Notificaciones por correo</Label>
                  <p className="text-sm text-muted-foreground">
                    Recibe recordatorios de citas y actualizaciones por correo electrónico
                  </p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">Notificaciones por SMS</Label>
                  <p className="text-sm text-muted-foreground">
                    Recibe recordatorios de citas y actualizaciones por mensaje de texto
                  </p>
                </div>
                <Switch id="sms-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reminder-time">Tiempo de recordatorio</Label>
                  <p className="text-sm text-muted-foreground">
                    ¿Con cuánta anticipación quieres recibir recordatorios de citas?
                  </p>
                </div>
                <Select>
                  <SelectTrigger id="reminder-time" className="w-[180px]">
                    <SelectValue placeholder="Seleccionar tiempo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-hour">1 hora antes</SelectItem>
                    <SelectItem value="3-hours">3 horas antes</SelectItem>
                    <SelectItem value="1-day">1 día antes</SelectItem>
                    <SelectItem value="2-days">2 días antes</SelectItem>
                    <SelectItem value="1-week">1 semana antes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Preferencias de consulta</h3>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="preferred-doctor">Doctor preferido</Label>
                  <p className="text-sm text-muted-foreground">
                    Si tienes un doctor preferido, intentaremos asignarte con él/ella
                  </p>
                </div>
                <Select>
                  <SelectTrigger id="preferred-doctor" className="w-[180px]">
                    <SelectValue placeholder="Seleccionar doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-rodriguez">Dr. Juan Rodríguez</SelectItem>
                    <SelectItem value="dra-martinez">Dra. Ana Martínez</SelectItem>
                    <SelectItem value="dr-gomez">Dr. Roberto Gómez</SelectItem>
                    <SelectItem value="dra-vargas">Dra. Sofía Vargas</SelectItem>
                    <SelectItem value="no-preference">Sin preferencia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="preferred-day">Día preferido</Label>
                  <p className="text-sm text-muted-foreground">¿Qué día de la semana prefieres para tus citas?</p>
                </div>
                <Select>
                  <SelectTrigger id="preferred-day" className="w-[180px]">
                    <SelectValue placeholder="Seleccionar día" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monday">Lunes</SelectItem>
                    <SelectItem value="tuesday">Martes</SelectItem>
                    <SelectItem value="wednesday">Miércoles</SelectItem>
                    <SelectItem value="thursday">Jueves</SelectItem>
                    <SelectItem value="friday">Viernes</SelectItem>
                    <SelectItem value="no-preference">Sin preferencia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="preferred-time">Horario preferido</Label>
                  <p className="text-sm text-muted-foreground">¿Qué horario del día prefieres para tus citas?</p>
                </div>
                <Select>
                  <SelectTrigger id="preferred-time" className="w-[180px]">
                    <SelectValue placeholder="Seleccionar horario" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Mañana (8:00 - 12:00)</SelectItem>
                    <SelectItem value="afternoon">Tarde (12:00 - 17:00)</SelectItem>
                    <SelectItem value="evening">Noche (17:00 - 20:00)</SelectItem>
                    <SelectItem value="no-preference">Sin preferencia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Privacidad</h3>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="data-sharing">Compartir datos anónimos</Label>
                  <p className="text-sm text-muted-foreground">
                    Permitir el uso de datos anónimos para mejorar nuestros servicios
                  </p>
                </div>
                <Switch id="data-sharing" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing">Recibir información promocional</Label>
                  <p className="text-sm text-muted-foreground">Recibir información sobre servicios y promociones</p>
                </div>
                <Switch id="marketing" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSavePreferences} className="ml-auto bg-sky-500 hover:bg-sky-600">
              Guardar Preferencias
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
