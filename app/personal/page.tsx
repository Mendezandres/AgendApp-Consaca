import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppointmentList } from "@/components/appointment-list"
import { StaffSchedule } from "@/components/staff-schedule"
import { PatientManagement } from "@/components/patient-management"
import { StaffMessages } from "@/components/staff-messages"

export default function PersonalPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-sky-500 sm:text-4xl">Panel del Personal de Salud</h1>
        <p className="mt-4 text-lg text-gray-600">Gestione sus citas médicas y la información de sus pacientes</p>
      </div>

      <Tabs defaultValue="citas" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="citas">Citas</TabsTrigger>
          <TabsTrigger value="horario">Horario</TabsTrigger>
          <TabsTrigger value="pacientes">Pacientes</TabsTrigger>
          <TabsTrigger value="mensajes">Mensajes</TabsTrigger>
        </TabsList>
        <TabsContent value="citas" className="mt-6">
          <AppointmentList
            title="Mis Citas Programadas"
            description="Visualice y gestione sus próximas citas médicas"
          />
        </TabsContent>
        <TabsContent value="horario" className="mt-6">
          <StaffSchedule />
        </TabsContent>
        <TabsContent value="pacientes" className="mt-6">
          <PatientManagement />
        </TabsContent>
        <TabsContent value="mensajes" className="mt-6">
          <StaffMessages />
        </TabsContent>
      </Tabs>
    </div>
  )
}
