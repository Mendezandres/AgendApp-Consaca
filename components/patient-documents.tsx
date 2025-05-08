"use client"

import { useState } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Download, Upload, Search, Filter, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

// Datos de ejemplo para los documentos
const documents = [
  {
    id: "1",
    name: "Resultados de análisis de sangre",
    type: "Laboratorio",
    date: new Date(2025, 3, 10),
    doctor: "Dr. Juan Rodríguez",
    specialty: "Medicina General",
    size: "1.2 MB",
  },
  {
    id: "2",
    name: "Radiografía de tórax",
    type: "Imagen",
    date: new Date(2025, 2, 15),
    doctor: "Dra. Ana Martínez",
    specialty: "Cardiología",
    size: "3.5 MB",
  },
  {
    id: "3",
    name: "Receta médica - Antibióticos",
    type: "Receta",
    date: new Date(2025, 3, 10),
    doctor: "Dr. Roberto Gómez",
    specialty: "Medicina General",
    size: "0.5 MB",
  },
  {
    id: "4",
    name: "Informe de consulta - Dermatología",
    type: "Informe",
    date: new Date(2025, 1, 20),
    doctor: "Dra. Sofía Vargas",
    specialty: "Dermatología",
    size: "0.8 MB",
  },
  {
    id: "5",
    name: "Resultados de electrocardiograma",
    type: "Examen",
    date: new Date(2024, 11, 5),
    doctor: "Dra. Ana Martínez",
    specialty: "Cardiología",
    size: "2.1 MB",
  },
]

// Datos de ejemplo para las prescripciones
const prescriptions = [
  {
    id: "1",
    medication: "Amoxicilina 500mg",
    dosage: "1 cápsula cada 8 horas por 7 días",
    date: new Date(2025, 3, 10),
    doctor: "Dr. Juan Rodríguez",
    specialty: "Medicina General",
    status: "activa",
  },
  {
    id: "2",
    medication: "Paracetamol 500mg",
    dosage: "1 tableta cada 6 horas si hay dolor",
    date: new Date(2025, 3, 10),
    doctor: "Dr. Juan Rodríguez",
    specialty: "Medicina General",
    status: "activa",
  },
  {
    id: "3",
    medication: "Loratadina 10mg",
    dosage: "1 tableta diaria por 15 días",
    date: new Date(2025, 2, 15),
    doctor: "Dra. Sofía Vargas",
    specialty: "Dermatología",
    status: "completada",
  },
  {
    id: "4",
    medication: "Ibuprofeno 400mg",
    dosage: "1 tableta cada 8 horas por 5 días",
    date: new Date(2025, 1, 20),
    doctor: "Dr. Roberto Gómez",
    specialty: "Traumatología",
    status: "completada",
  },
]

export function PatientDocuments() {
  const [searchTerm, setSearchTerm] = useState("")
  const [documentType, setDocumentType] = useState("todos")

  // Filtrar documentos por término de búsqueda y tipo
  const filteredDocuments = documents.filter(
    (document) =>
      (document.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        document.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        document.specialty.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (documentType === "todos" || document.type.toLowerCase() === documentType.toLowerCase()),
  )

  // Filtrar prescripciones por término de búsqueda
  const filteredPrescriptions = prescriptions.filter(
    (prescription) =>
      prescription.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDownload = (documentId: string) => {
    toast({
      title: "Descarga iniciada",
      description: "Tu documento se está descargando.",
    })
  }

  const handleUpload = () => {
    toast({
      title: "Documento subido",
      description: "Tu documento ha sido subido exitosamente.",
    })
  }

  return (
    <Tabs defaultValue="documentos" className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="documentos">Documentos Médicos</TabsTrigger>
        <TabsTrigger value="recetas">Recetas y Medicamentos</TabsTrigger>
      </TabsList>
      <TabsContent value="documentos" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Mis Documentos Médicos</CardTitle>
            <CardDescription>Accede a tus informes, resultados y otros documentos médicos</CardDescription>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="search"
                  placeholder="Buscar documentos"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button type="submit" size="icon" variant="ghost">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                >
                  <option value="todos">Todos los tipos</option>
                  <option value="laboratorio">Laboratorio</option>
                  <option value="imagen">Imagen</option>
                  <option value="receta">Receta</option>
                  <option value="informe">Informe</option>
                  <option value="examen">Examen</option>
                </select>
                <Button variant="ghost" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-sky-500 hover:bg-sky-600">
                    <Upload className="mr-2 h-4 w-4" /> Subir Documento
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Subir nuevo documento</DialogTitle>
                    <DialogDescription>
                      Sube un nuevo documento médico a tu historial. Formatos aceptados: PDF, JPG, PNG.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <label htmlFor="doc-name" className="text-sm font-medium">
                        Nombre del documento
                      </label>
                      <Input id="doc-name" placeholder="Ej: Resultados de análisis de sangre" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="doc-type" className="text-sm font-medium">
                        Tipo de documento
                      </label>
                      <select
                        id="doc-type"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Seleccionar tipo</option>
                        <option value="laboratorio">Laboratorio</option>
                        <option value="imagen">Imagen</option>
                        <option value="receta">Receta</option>
                        <option value="informe">Informe</option>
                        <option value="examen">Examen</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="doc-date" className="text-sm font-medium">
                        Fecha del documento
                      </label>
                      <Input id="doc-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="doc-file" className="text-sm font-medium">
                        Archivo
                      </label>
                      <Input id="doc-file" type="file" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleUpload} className="bg-sky-500 hover:bg-sky-600">
                      Subir Documento
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre del documento</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Tamaño</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.length > 0 ? (
                    filteredDocuments.map((document) => (
                      <TableRow key={document.id}>
                        <TableCell className="font-medium">{document.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-gray-100">
                            {document.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{format(document.date, "d 'de' MMMM 'de' yyyy", { locale: es })}</TableCell>
                        <TableCell>
                          <div>{document.doctor}</div>
                          <div className="text-xs text-muted-foreground">{document.specialty}</div>
                        </TableCell>
                        <TableCell>{document.size}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDownload(document.id)}>
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No se encontraron documentos que coincidan con los criterios de búsqueda.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="recetas" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Mis Recetas y Medicamentos</CardTitle>
            <CardDescription>Gestiona tus recetas médicas y medicamentos actuales</CardDescription>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="search"
                  placeholder="Buscar medicamentos"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button type="submit" size="icon" variant="ghost">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medicamento</TableHead>
                    <TableHead>Dosis</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrescriptions.length > 0 ? (
                    filteredPrescriptions.map((prescription) => (
                      <TableRow key={prescription.id}>
                        <TableCell className="font-medium">{prescription.medication}</TableCell>
                        <TableCell>{prescription.dosage}</TableCell>
                        <TableCell>{format(prescription.date, "d 'de' MMMM 'de' yyyy", { locale: es })}</TableCell>
                        <TableCell>
                          <div>{prescription.doctor}</div>
                          <div className="text-xs text-muted-foreground">{prescription.specialty}</div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              prescription.status === "activa"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No se encontraron recetas que coincidan con los criterios de búsqueda.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
