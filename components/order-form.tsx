"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Check, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function OrderForm({ productName, quantity, onClose }) {
  const t = useTranslations("OrderForm")
  const [formState, setFormState] = useState({
    name: "",
    company: "",
    location: "",
    email: "",
    phone: "",
    amount: quantity,
    dateType: productName,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formState.name.trim()) newErrors.name = t("errors.nameRequired")
    if (!formState.company.trim()) newErrors.company = t("errors.companyRequired")
    if (!formState.location.trim()) newErrors.location = t("errors.locationRequired")
    if (!formState.phone.trim()) newErrors.phone = t("errors.phoneRequired")
    else if (!/^\+20\d{10}$/.test(formState.phone)) newErrors.phone = t("errors.phoneInvalid")

    if (formState.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = t("errors.emailInvalid")
    }

    if (!formState.amount || formState.amount < 1) newErrors.amount = t("errors.amountRequired")

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset form after success
      setTimeout(() => {
        onClose()
      }, 2000)
    }, 1500)
  }

  return (
    <div>
      {!isSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                {t("name")} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className={cn(errors.name && "border-red-500")}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">
                {t("company")} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="company"
                name="company"
                value={formState.company}
                onChange={handleChange}
                className={cn(errors.company && "border-red-500")}
              />
              {errors.company && <p className="text-sm text-red-500">{errors.company}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">
              {t("location")} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="location"
              name="location"
              value={formState.location}
              onChange={handleChange}
              className={cn(errors.location && "border-red-500")}
            />
            {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              {t("email")} ({t("optional")})
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              className={cn(errors.email && "border-red-500")}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              {t("phone")} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
              placeholder="+20XXXXXXXXXX"
              className={cn(errors.phone && "border-red-500")}
            />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateType">{t("dateType")}</Label>
              <Input id="dateType" name="dateType" value={formState.dateType} readOnly className="bg-amber-50" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">
                {t("amount")} (kg) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                min="1"
                value={formState.amount}
                onChange={handleChange}
                className={cn(errors.amount && "border-red-500")}
              />
              {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-red-700 text-red-700 hover:bg-red-50"
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("submitting")}
                </>
              ) : (
                t("submit")
              )}
            </Button>
          </div>
        </form>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
            <Check className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold text-green-700 mb-2">{t("success.title")}</h3>
          <p className="text-amber-800/70 mb-6">{t("success.message")}</p>
        </motion.div>
      )}
    </div>
  )
}

