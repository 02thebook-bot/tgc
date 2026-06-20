"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, X } from "lucide-react"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useBibleVerse } from "./bible-verse-provider"

const translations = {
  bengali: {
    title: "বাইবেল সহায়ক",
    placeholder: "আপনার প্রশ্ন লিখুন...",
    send: "পাঠান",
    welcomeMessage: "স্বাগতম! আমি আপনাকে বাইবেল সম্পর্কে প্রশ্ন উত্তরে সাহায্য করতে পারি। কিভাবে সাহায্য করতে পারি?",
    closeChat: "চ্যাট বন্ধ করুন",
    openChat: "বাইবেল সহায়ক",
  },
  hindi: {
    title: "बाइबिल सहायक",
    placeholder: "अपना प्रश्न लिखें...",
    send: "भेजें",
    welcomeMessage: "स्वागत है! मैं आपको बाइबिल के बारे में प्रश्नों के उत्तर देने में मदद कर सकता हूँ। मैं आपकी कैसे सहायता कर सकता हूँ?",
    closeChat: "चैट बंद करें",
    openChat: "बाइबिल सहायक",
  },
  english: {
    title: "Bible Helper",
    placeholder: "Type your question...",
    send: "Send",
    welcomeMessage: "Welcome! I can help you with questions about the Bible. How can I assist you today?",
    closeChat: "Close Chat",
    openChat: "Bible Helper",
  },
}

// Sample responses for demonstration
const sampleResponses: Record<string, string> = {
  "what is john 3:16":
    'John 3:16 says: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."',
  "tell me about noah":
    "Noah was a righteous man who built an ark according to God's instructions to save his family and animals from a great flood. This story is found in Genesis chapters 6-9.",
  "what does the bible say about love":
    'The Bible has many verses about love. One of the most famous is 1 Corinthians 13:4-7: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres."',
}

interface Message {
  id: number
  text: string
  isUser: boolean
}

export default function BibleVerseBot() {
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: translations[language].welcomeMessage, isUser: false },
  ])

  const bibleVerseApi = useBibleVerse()

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = { id: messages.length + 1, text: input, isUser: true }
    setMessages((prev) => [...prev, userMessage])

    // Check if the input looks like a Bible verse reference
    const verseRegex = /([1-3]?\s*[a-zA-Z]+)\s+(\d+)(?::(\d+)(?:-(\d+))?)?/i
    const match = input.match(verseRegex)

    try {
      let responseText = "I'm not sure about that. Could you ask something else about the Bible?"

      // If it looks like a Bible verse reference, try to fetch it
      if (match) {
        const reference = match[0]
        let verseData

        try {
          if (language === "english") {
            verseData = await bibleVerseApi.fetchVerse(reference)
          } else if (language === "hindi") {
            verseData = await bibleVerseApi.fetchHindiVerse(reference)
          } else if (language === "bengali") {
            verseData = await bibleVerseApi.fetchBengaliVerse(reference)
          }

          if (verseData && verseData.text) {
            responseText = `${verseData.reference}: ${verseData.text}`
          }
        } catch (error) {
          console.error("Error fetching verse:", error)
        }
      } else {
        // Check for matching keywords in our sample responses
        const lowercaseInput = input.toLowerCase()
        for (const [key, value] of Object.entries(sampleResponses)) {
          if (lowercaseInput.includes(key)) {
            responseText = value
            break
          }
        }
      }

      const botMessage = { id: messages.length + 2, text: responseText, isUser: false }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error processing message:", error)
      const errorMessage = {
        id: messages.length + 2,
        text: "I'm sorry, I encountered an error. Please try again.",
        isUser: false,
      }
      setMessages((prev) => [...prev, errorMessage])
    }

    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg flex items-center justify-center"
      >
        <MessageSquare size={24} />
        <span className="sr-only">{translations[language].openChat}</span>
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 md:w-96 h-96 shadow-xl flex flex-col">
      <CardHeader className="p-4 border-b flex flex-row items-center justify-between">
        <h3 className="font-semibold">{translations[language].title}</h3>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X size={18} />
          <span className="sr-only">{translations[language].closeChat}</span>
        </Button>
      </CardHeader>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.isUser ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <CardFooter className="p-4 border-t">
        <div className="flex w-full gap-2">
          <Input
            placeholder={translations[language].placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={handleSend}>{translations[language].send}</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
