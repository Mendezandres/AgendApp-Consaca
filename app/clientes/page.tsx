import { AppointmentForm } from "@/components/appointment-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PatientAppointments } from "@/components/patient-appointments"
import { PatientProfile } from "@/components/patient-profile"
import { PatientDocuments } from "@/components/patient-documents"

export default function ClientesPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-sky-500 sm:text-4xl">Portal del Paciente</h1>
        <p className="mt-4 text-lg text-gray-600">
          Gestione sus citas médicas, acceda a su historial y documentos médicos
        </p>
      </div>

      <Tabs defaultValue="agendar" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="agendar">Agendar</TabsTrigger>
          <TabsTrigger value="citas">Mis Citas</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
          <TabsTrigger value="perfil">Mi Perfil</TabsTrigger>
        </TabsList>
        <TabsContent value="agendar" className="mt-6">
          <AppointmentForm />
        </TabsContent>
        <TabsContent value="citas" className="mt-6">
          <PatientAppointments />
        </TabsContent>
        <TabsContent value="documentos" className="mt-6">
          <PatientDocuments />
        </TabsContent>
        <TabsContent value="perfil" className="mt-6">
          <PatientProfile />
        </TabsContent>
      </Tabs>
    </div>
  )
}
