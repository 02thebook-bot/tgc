"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface EventCardProps {
  title: string
  date: string
  time: string
  location: string
  description: string
  index: number
}

export function EnhancedEventCard({ title, date, time, location, description, index }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className={cn(
          "card-hover overflow-hidden h-full",
          "border-t-4",
          index % 3 === 0
            ? "border-t-worship-red"
            : index % 3 === 1
              ? "border-t-worship-purple"
              : "border-t-worship-gold",
        )}
      >
        <CardContent className="p-6 flex flex-col h-full">
          <h3 className="text-xl font-semibold mb-3">{title}</h3>

          <div className="space-y-3 mb-4 flex-grow">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full",
                  index % 3 === 0
                    ? "bg-red-100 text-worship-red"
                    : index % 3 === 1
                      ? "bg-purple-100 text-worship-purple"
                      : "bg-yellow-100 text-worship-gold",
                )}
              >
                <Calendar size={16} />
              </div>
              <span>{date}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full",
                  index % 3 === 0
                    ? "bg-red-100 text-worship-red"
                    : index % 3 === 1
                      ? "bg-purple-100 text-worship-purple"
                      : "bg-yellow-100 text-worship-gold",
                )}
              >
                <Clock size={16} />
              </div>
              <span>{time}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full",
                  index % 3 === 0
                    ? "bg-red-100 text-worship-red"
                    : index % 3 === 1
                      ? "bg-purple-100 text-worship-purple"
                      : "bg-yellow-100 text-worship-gold",
                )}
              >
                <MapPin size={16} />
              </div>
              <span>{location}</span>
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-300">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
