"use client"

import { useState } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import {
  Search,
  Filter,
  FileText,
  MessageSquare,
  Calendar,
  User,
  Clock,
  Activity,
  Download,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

// Datos de ejemplo para los pacientes
const patients = [
  {
    id: "1",
    name: "María García",
    age: 45,
    gender: "Femenino",
    lastVisit: new Date(2025, 3, 10),
    nextVisit: new Date(2025, 4, 15),
    condition: "Hipertensión",
    status: "Estable",
    contact: "+1 234 567 890",
    email: "maria@ejemplo.com",
  },
  {
    id: "2",
    name: "Carlos López",
    age: 62,
    gender: "Masculino",
    lastVisit: new Date(2025, 3, 5),
    nextVisit: new Date(2025, 4, 20),
    condition: "Post-operatorio cardíaco",
    status: "En recuperación",
    contact: "+1 234 567 891",
    email: "carlos@ejemplo.com",
  },
  {
    id: "3",
    name: "Laura Sánchez",
    age: 8,
    gender: "Femenino",
    lastVisit: new Date(2025, 3, 10),
    nextVisit: new Date(2025, 5, 10),
    condition: "Control pediátrico",
    status: "Saludable",
    contact: "+1 234 567 892",
    email: "padres.laura@ejemplo.com",
  },
  {
    id: "4",
    name: "Pedro Ramírez",
    age: 35,
    gender: "Masculino",
    lastVisit: new Date(2025, 2, 20),
    nextVisit: null,
    condition: "Dermatitis",
    status: "En tratamiento",
    contact: "+1 234 567 893",
    email: "pedro@ejemplo.com",
  },
  {
    id: "5",
    name: "Ana Torres",
    age: 55,
    gender: "Femenino",
    lastVisit: new Date(2025, 1, 15),
    nextVisit: new Date(2025, 4, 16),
    condition: "Glaucoma",
    status: "Estable",
    contact: "+1 234 567 894",
    email: "ana@ejemplo.com",
  },
]

// Datos de ejemplo para el historial médico
const medicalHistory = [
  {
    id: "1",
    date: new Date(2025, 3, 10),
    type: "Consulta",
    diagnosis: "Hipertensión arterial controlada",
    treatment: "Continuación de tratamiento con Losartán 50mg diario",
    notes: "Paciente refiere mejoría en los niveles de presión arterial. Se recomienda mantener dieta baja en sodio.",
  },
  {
    id: "2",
    date: new Date(2025, 2, 15),
    type: "Examen",
    diagnosis: "Análisis de sangre de rutina",
    treatment: "N/A",
    notes: "Resultados dentro de parámetros normales. Leve elevación de colesterol LDL.",
  },
  {
    id: "3",
    date: new Date(2025, 0, 20),
    type: "Consulta",
    diagnosis: "Hipertensión arterial",
    treatment: "Inicio de tratamiento con Losartán 50mg diario",
    notes: "Paciente con presión arterial elevada. Se recomienda dieta baja en sodio y actividad física regular.",
  },
  {
    id: "4",
    date: new Date(2024, 10, 5),
    type: "Consulta",
    diagnosis: "Resfriado común",
    treatment: "Paracetamol 500mg cada 8 horas por 3 días",
    notes: "Síntomas leves de congestión nasal y dolor de garganta.",
  },
]

export function PatientManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<(typeof patients)[0] | null>(null)

  // Filtrar pacientes por término de búsqueda
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddNote = () => {
    toast({
      title: "Nota añadida",
      description: "La nota clínica ha sido añadida al historial del paciente.",
    })
  }

  const handleScheduleAppointment = () => {
    toast({
      title: "Cita programada",
      description: "La cita ha sido programada exitosamente.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-sky-500">Gestión de Pacientes</CardTitle>
          <CardDescription>Busque y gestione la información de sus pacientes</CardDescription>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="search"
                placeholder="Buscar pacientes por nombre o condición"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" size="icon" variant="ghost">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" /> Filtrar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPatients.map((patient) => (
              <Card
                key={patient.id}
                className="overflow-hidden cursor-pointer hover:border-teal-300 transition-colors"
                onClick={() => setSelectedPatient(patient)}
              >
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-bold">{patient.name}</CardTitle>
                    <Badge variant="outline" className="bg-gray-100">
                      {patient.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    {patient.age} años, {patient.gender}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Activity className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{patient.condition}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">
                        Última visita: {format(patient.lastVisit, "d 'de' MMMM 'de' yyyy", { locale: es })}
                      </span>
                    </div>
                    {patient.nextVisit && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          Próxima cita: {format(patient.nextVisit, "d 'de' MMMM 'de' yyyy", { locale: es })}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedPatient && (
        <Dialog open={!!selectedPatient} onOpenChange={(open) => !open && setSelectedPatient(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">Ficha del Paciente</DialogTitle>
              <DialogDescription>Información detallada y gestión del paciente</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-8 w-8 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{selectedPatient.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedPatient.age} años, {selectedPatient.gender}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Información de contacto</h4>
                    <div className="text-sm">
                      <p>Teléfono: {selectedPatient.contact}</p>
                      <p>Email: {selectedPatient.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Condición médica</h4>
                    <div className="text-sm">
                      <p>{selectedPatient.condition}</p>
                      <p>Estado: {selectedPatient.status}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Última visita</h4>
                    <p className="text-sm">
                      {format(selectedPatient.lastVisit, "d 'de' MMMM 'de' yyyy", { locale: es })}
                    </p>
                  </div>
                  {selectedPatient.nextVisit && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Próxima cita</h4>
                      <p className="text-sm">
                        {format(selectedPatient.nextVisit, "d 'de' MMMM 'de' yyyy", { locale: es })}
                      </p>
                    </div>
                  )}
                  <div className="pt-4 space-y-2">
                    <Button className="w-full" variant="outline">
                      <FileText className="h-4 w-4 mr-2" /> Ver Historial Completo
                    </Button>
                    <Button className="w-full" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" /> Enviar Mensaje
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-sky-500 hover:bg-sky-600">
                          <Calendar className="h-4 w-4 mr-2" /> Programar Cita
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Programar Nueva Cita</DialogTitle>
                          <DialogDescription>Programe una nueva cita para {selectedPatient.name}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <label htmlFor="appointment-date" className="text-sm font-medium">
                              Fecha
                            </label>
                            <Input id="appointment-date" type="date" />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="appointment-time" className="text-sm font-medium">
                              Hora
                            </label>
                            <Input id="appointment-time" type="time" />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="appointment-type" className="text-sm font-medium">
                              Tipo de consulta
                            </label>
                            <select
                              id="appointment-type"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <option value="regular">Consulta regular</option>
                              <option value="followup">Seguimiento</option>
                              <option value="emergency">Urgencia</option>
                              <option value="procedure">Procedimiento</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="appointment-notes" className="text-sm font-medium">
                              Notas
                            </label>
                            <Textarea
                              id="appointment-notes"
                              placeholder="Añada notas o instrucciones para el paciente"
                              className="resize-none"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline">Cancelar</Button>
                          <Button onClick={handleScheduleAppointment}>Programar Cita</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <Tabs defaultValue="history" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="history">Historial</TabsTrigger>
                    <TabsTrigger value="notes">Notas Clínicas</TabsTrigger>
                    <TabsTrigger value="documents">Documentos</TabsTrigger>
                  </TabsList>
                  <TabsContent value="history" className="mt-4">
                    <div className="space-y-4">
                      {medicalHistory.map((entry) => (
                        <div key={entry.id} className="border rounded-md p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium">
                              {format(entry.date, "d 'de' MMMM 'de' yyyy", { locale: es })}
                            </div>
                            <Badge variant="outline" className="bg-gray-100">
                              {entry.type}
                            </Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-medium">Diagnóstico:</span> {entry.diagnosis}
                            </div>
                            <div>
                              <span className="font-medium">Tratamiento:</span> {entry.treatment}
                            </div>
                            <div>
                              <span className="font-medium">Notas:</span> {entry.notes}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="notes" className="mt-4">
                    <div className="space-y-4">
                      <div className="border rounded-md p-4">
                        <h4 className="font-medium mb-2">Añadir Nueva Nota Clínica</h4>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label htmlFor="note-type" className="text-sm font-medium">
                              Tipo de nota
                            </label>
                            <select
                              id="note-type"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <option value="consultation">Consulta</option>
                              <option value="followup">Seguimiento</option>
                              <option value="procedure">Procedimiento</option>
                              <option value="test">Resultados de examen</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="diagnosis" className="text-sm font-medium">
                              Diagnóstico
                            </label>
                            <Input id="diagnosis" placeholder="Ingrese el diagnóstico" />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="treatment" className="text-sm font-medium">
                              Tratamiento
                            </label>
                            <Input id="treatment" placeholder="Ingrese el tratamiento prescrito" />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="clinical-notes" className="text-sm font-medium">
                              Notas clínicas
                            </label>
                            <Textarea
                              id="clinical-notes"
                              placeholder="Ingrese notas clínicas detalladas"
                              className="resize-none"
                            />
                          </div>
                          <Button onClick={handleAddNote} className="w-full bg-sky-500 hover:bg-sky-600">
                            Guardar Nota Clínica
                          </Button>
                        </div>
                      </div>
                      <div className="border rounded-md p-4">
                        <h4 className="font-medium mb-2">Notas Anteriores</h4>
                        <div className="space-y-4">
                          {medicalHistory.map((entry) => (
                            <div key={entry.id} className="border-t pt-4 mt-4">
                              <div className="flex justify-between items-start mb-2">
                                <div className="text-sm font-medium">
                                  {format(entry.date, "d 'de' MMMM 'de' yyyy", { locale: es })}
                                </div>
                                <Badge variant="outline" className="bg-gray-100">
                                  {entry.type}
                                </Badge>
                              </div>
                              <div className="space-y-1 text-sm">
                                <div>
                                  <span className="font-medium">Diagnóstico:</span> {entry.diagnosis}
                                </div>
                                <div>
                                  <span className="font-medium">Tratamiento:</span> {entry.treatment}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="documents" className="mt-4">
                    <div className="space-y-4">
                      <div className="border rounded-md p-4">
                        <h4 className="font-medium mb-2">Documentos del Paciente</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 border rounded hover:bg-gray-50">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="text-sm">Resultados de análisis de sangre.pdf</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex justify-between items-center p-2 border rounded hover:bg-gray-50">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="text-sm">Radiografía de tórax.jpg</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex justify-between items-center p-2 border rounded hover:bg-gray-50">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="text-sm">Receta médica.pdf</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button variant="outline" className="w-full">
                            <Upload className="h-4 w-4 mr-2" /> Subir Nuevo Documento
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
