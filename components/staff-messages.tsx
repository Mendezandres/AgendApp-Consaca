"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Search, Send, Paperclip, User, Phone, Calendar, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/hooks/use-toast"

// Datos de ejemplo para las conversaciones
const conversations = [
  {
    id: "1",
    patient: "María García",
    lastMessage: "Gracias doctor, seguiré sus indicaciones.",
    timestamp: new Date(2025, 3, 12, 14, 35),
    unread: false,
    avatar: "MG",
  },
  {
    id: "2",
    patient: "Carlos López",
    lastMessage: "¿Puedo tomar el medicamento con las comidas?",
    timestamp: new Date(2025, 3, 12, 10, 15),
    unread: true,
    avatar: "CL",
  },
  {
    id: "3",
    patient: "Laura Sánchez",
    lastMessage: "¿Es normal que tenga estos efectos secundarios?",
    timestamp: new Date(2025, 3, 11, 16, 45),
    unread: true,
    avatar: "LS",
  },
  {
    id: "4",
    patient: "Pedro Ramírez",
    lastMessage: "Confirmo mi asistencia a la cita del próximo lunes.",
    timestamp: new Date(2025, 3, 10, 9, 20),
    unread: false,
    avatar: "PR",
  },
  {
    id: "5",
    patient: "Ana Torres",
    lastMessage: "Necesito reprogramar mi cita, ¿hay disponibilidad para el viernes?",
    timestamp: new Date(2025, 3, 9, 11, 5),
    unread: false,
    avatar: "AT",
  },
]

// Datos de ejemplo para los mensajes de una conversación
const messages = [
  {
    id: "1",
    sender: "patient",
    content: "Buenos días doctor, tengo una consulta sobre mi medicación.",
    timestamp: new Date(2025, 3, 12, 9, 30),
  },
  {
    id: "2",
    sender: "doctor",
    content: "Buenos días Carlos, dígame en qué puedo ayudarle.",
    timestamp: new Date(2025, 3, 12, 9, 45),
  },
  {
    id: "3",
    sender: "patient",
    content:
      "Estoy tomando el medicamento que me recetó, pero tengo dudas sobre cuándo debo tomarlo. ¿Puedo tomar el medicamento con las comidas?",
    timestamp: new Date(2025, 3, 12, 10, 15),
  },
]

export function StaffMessages() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedConversation, setSelectedConversation] = useState<(typeof conversations)[0] | null>(null)
  const [newMessage, setNewMessage] = useState("")

  // Filtrar conversaciones por término de búsqueda
  const filteredConversations = conversations.filter((conversation) =>
    conversation.patient.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    toast({
      title: "Mensaje enviado",
      description: "Tu mensaje ha sido enviado exitosamente.",
    })

    setNewMessage("")
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-16rem)]">
      <Card className="md:w-1/3">
        <CardHeader>
          <CardTitle className="text-2xl text-sky-500">Mensajes</CardTitle>
          <CardDescription>Gestione sus conversaciones con pacientes</CardDescription>
          <div className="flex items-center space-x-2 mt-4">
            <Input
              type="search"
              placeholder="Buscar conversaciones"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" size="icon" variant="ghost">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 h-[calc(100vh-24rem)] overflow-y-auto pr-2">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`flex items-center space-x-4 p-3 rounded-md cursor-pointer hover:bg-gray-100 ${
                  selectedConversation?.id === conversation.id ? "bg-gray-100" : ""
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt={conversation.patient} />
                  <AvatarFallback>{conversation.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-medium truncate">{conversation.patient}</h4>
                    <span className="text-xs text-muted-foreground">{format(conversation.timestamp, "HH:mm")}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread && <Badge className="bg-teal-600 hover:bg-teal-600 h-2 w-2 rounded-full p-0" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="flex-1">
        {selectedConversation ? (
          <>
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt={selectedConversation.patient} />
                    <AvatarFallback>{selectedConversation.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{selectedConversation.patient}</CardTitle>
                    <CardDescription>Paciente</CardDescription>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Calendar className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <User className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex flex-col h-[calc(100vh-28rem)]">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "doctor" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "doctor" ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs text-right mt-1 opacity-70">{format(message.timestamp, "HH:mm")}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Textarea
                    placeholder="Escriba su mensaje..."
                    className="flex-1 resize-none"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button size="icon" className="bg-sky-500 hover:bg-sky-600" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium">Seleccione una conversación</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Elija una conversación de la lista para ver los mensajes
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
