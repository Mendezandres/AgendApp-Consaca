import Image from "next/image";
import Link from "next/link"

import { CalendarCheck, Clock, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-teal-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-sky-500">
                  Agenda tu cita médica en minutos
                </h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl">
                  Agenda tus citas médicas de forma rápida y sencilla. Conectamos pacientes con profesionales de la
                  salud para una atención oportuna y de calidad.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="bg-sky-500 hover:bg-sky-600">
                      Agendar Cita
                </Button>
                
                  <Button variant="outline" size="lg">
                    Cómo Funciona
                  </Button>
              </div>
            </div>
            <div className="mx-auto lg:mr-0 bg-sky-500 rounded-lg">
              <Image
                src="/doctor.png"
                alt="Médico atendiendo a un paciente"
                width={550}
                height={550}
                className="rounded-lg object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="como-funciona" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-sky-500">
                Cómo Funciona
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Nuestro sistema de agendamiento está diseñado para ser intuitivo y eficiente, permitiéndote gestionar
                tus citas médicas sin complicaciones.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-200">
                <CalendarCheck className="h-8 w-8 text-sky-500" />
              </div>
              <h3 className="text-xl font-bold">Selecciona Especialidad</h3>
              <p className="text-gray-600">
                Elige entre nuestras diversas especialidades médicas según tus necesidades de salud.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-200">
                <Clock className="h-8 w-8 text-sky-500" />
              </div>
              <h3 className="text-xl font-bold">Escoge Fecha y Hora</h3>
              <p className="text-gray-600">Selecciona el día y horario que mejor se adapte a tu agenda personal.</p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-200">
                <UserCheck className="h-8 w-8 text-sky-500" />
              </div>
              <h3 className="text-xl font-bold">Confirma tu Cita</h3>
              <p className="text-gray-600">Recibe confirmación inmediata y recordatorios para tu tranquilidad.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-sky-500">
                Beneficios de Nuestro Servicio
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Diseñado pensando en pacientes y profesionales de la salud para ofrecer una experiencia óptima.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <Card>
              <CardHeader>
                <CardTitle>Fácil de Usar</CardTitle>
                <CardDescription>Interfaz intuitiva para todos los usuarios</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Nuestro sistema está diseñado para ser accesible y sencillo, permitiendo que cualquier persona pueda
                  agendar citas sin dificultad.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Disponibilidad 24/7</CardTitle>
                <CardDescription>Agenda en cualquier momento</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Accede a nuestro sistema a cualquier hora del día, los 7 días de la semana, para programar o modificar
                  tus citas médicas.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recordatorios Automáticos</CardTitle>
                <CardDescription>Nunca olvides una cita</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Recibe notificaciones y recordatorios de tus próximas citas para asegurar que nunca pierdas una
                  consulta importante.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Historial de Citas</CardTitle>
                <CardDescription>Seguimiento completo</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Mantén un registro de todas tus consultas anteriores y futuras para un mejor seguimiento de tu
                  atención médica.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Múltiples Especialidades</CardTitle>
                <CardDescription>Atención integral</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Accede a diversas especialidades médicas en un solo lugar, facilitando la coordinación de tu atención
                  sanitaria.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Seguridad Garantizada</CardTitle>
                <CardDescription>Protección de datos</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Tu información personal y médica está protegida con los más altos estándares de seguridad y
                  confidencialidad.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-sky-500">
        <div className="container px-4 md:px-6 text-center">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Comienza a agendar tus citas hoy mismo
            </h2>
            <p className="max-w-[85%] text-white/90 md:text-xl/relaxed">
              Únete a miles de pacientes que ya disfrutan de la comodidad de nuestro sistema de agendamiento.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              {/*<Link href="/clientes">
                <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100">
                  Agendar Cita
                </Button>
              </Link>
              <Link href="#como-funciona">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-teal-700">
                  Conocer Más
                </Button>
              </Link>*/}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
