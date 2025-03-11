"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronDown, Menu, X, Instagram, Facebook, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeProduct, setActiveProduct] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const products = [
    {
      id: 0,
      name: "تمر مجدول",
      description: "تمر فاخر ذو مذاق غني وقوام كريمي، يعتبر من أجود أنواع التمور في العالم",
      image: "/placeholder.svg?height=500&width=500",
      color: "bg-amber-800",
    },
    {
      id: 1,
      name: "تمر سيوي",
      description: "تمر ذهبي اللون يتميز بحلاوته المعتدلة ونكهته الفريدة من واحة سيوة",
      image: "/placeholder.svg?height=500&width=500",
      color: "bg-amber-600",
    },
    {
      id: 2,
      name: "تمر مذاق",
      description: "تمر استثنائي بنكهة مميزة ومذاق لا يُنسى، مثالي للاستمتاع في أي وقت",
      image: "/placeholder.svg?height=500&width=500",
      color: "bg-amber-700",
    },
  ]

  const parallaxOffset = scrollY * 0.5

  return (
    <div dir="rtl" className="min-h-screen bg-stone-50 overflow-hidden">
      {/* النافذة العائمة للتنقل */}
      <div
        className={cn(
          "fixed top-6 right-6 left-6 z-50 transition-all duration-500 rounded-2xl shadow-lg backdrop-blur-md",
          scrollY > 100 ? "bg-white/90" : "bg-transparent",
        )}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="شعار سيوه بالم"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span
              className={cn("font-bold text-xl transition-colors", scrollY > 100 ? "text-amber-900" : "text-white")}
            >
              سيوه بالم
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <NavLink active={true} scrolled={scrollY > 100}>
              الرئيسية
            </NavLink>
            <NavLink scrolled={scrollY > 100}>منتجاتنا</NavLink>
            <NavLink scrolled={scrollY > 100}>عن الشركة</NavLink>
            <NavLink scrolled={scrollY > 100}>تواصل معنا</NavLink>
          </div>

          <Button
            variant={scrollY > 100 ? "default" : "outline"}
            className={cn(
              "hidden md:block",
              scrollY > 100
                ? "bg-amber-800 hover:bg-amber-900 text-white"
                : "border-white text-white hover:bg-white/20",
            )}
          >
            اطلب الآن
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className={scrollY > 100 ? "text-amber-900" : "text-white"} />
          </Button>
        </div>
      </div>

      {/* القائمة المتحركة للجوال */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-amber-900 z-50 flex flex-col p-6">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-2">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="شعار سيوه بالم"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-bold text-xl text-white">سيوه بالم</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
              <X className="text-white" />
            </Button>
          </div>

          <div className="flex flex-col gap-8 text-white text-2xl">
            <Link href="#" className="border-b border-amber-700 pb-4 hover:text-amber-200 transition-colors">
              الرئيسية
            </Link>
            <Link href="#" className="border-b border-amber-700 pb-4 hover:text-amber-200 transition-colors">
              منتجاتنا
            </Link>
            <Link href="#" className="border-b border-amber-700 pb-4 hover:text-amber-200 transition-colors">
              عن الشركة
            </Link>
            <Link href="#" className="border-b border-amber-700 pb-4 hover:text-amber-200 transition-colors">
              تواصل معنا
            </Link>
          </div>

          <div className="mt-auto">
            <Button className="w-full bg-white text-amber-900 hover:bg-amber-100">اطلب الآن</Button>
          </div>
        </div>
      )}

      {/* قسم الصفحة الرئيسية */}
      <section className="relative h-screen overflow-hidden">
        {/* خلفية متحركة */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
            transform: `translateY(${parallaxOffset}px)`,
          }}
        />

        {/* طبقة التعتيم */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/70 to-amber-900/90 z-10" />

        {/* المحتوى */}
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="block">تمور فاخرة من</span>
              <span className="text-amber-300">واحة سيوه</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              شركة رائدة في زراعة وإنتاج أجود أنواع التمور منذ عام 2001، نقدم لكم تجربة تذوق استثنائية من قلب الصحراء
              المصرية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white text-lg py-6 px-8">تصفح منتجاتنا</Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/20 text-lg py-6 px-8">
                تعرف علينا
              </Button>
            </div>
          </motion.div>

          <div className="absolute bottom-12 left-0 right-0 flex justify-center">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
              <ChevronDown className="text-white w-10 h-10 opacity-70" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* قسم المنتجات */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-amber-900/20 to-transparent z-10" />

        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-amber-900 mb-4">منتجاتنا الفاخرة</h2>
            <p className="text-lg text-amber-800/70 max-w-2xl mx-auto">
              نقدم لكم مجموعة متميزة من أجود أنواع التمور المزروعة بعناية في واحة سيوه والواحات البحرية
            </p>
          </div>

          {/* عرض المنتجات بطريقة مبتكرة */}
          <div className="relative h-[600px] md:h-[700px] mb-12">
            {/* خلفية متحركة للمنتجات */}
            <div
              className={cn(
                "absolute inset-0 rounded-3xl transition-colors duration-700",
                products[activeProduct].color,
              )}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(0,0,0,0.4)_100%)]" />

            <div className="relative h-full flex flex-col md:flex-row">
              {/* صورة المنتج */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-8">
                <motion.div
                  key={activeProduct}
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-full max-w-md"
                >
                  <Image
                    src={products[activeProduct].image || "/placeholder.svg"}
                    alt={products[activeProduct].name}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </motion.div>
              </div>

              {/* تفاصيل المنتج */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-8">
                <motion.div
                  key={`text-${activeProduct}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-white max-w-lg"
                >
                  <h3 className="text-4xl md:text-6xl font-bold mb-6">{products[activeProduct].name}</h3>
                  <p className="text-xl mb-8 text-white/80">{products[activeProduct].description}</p>
                  <Button className="bg-white text-amber-900 hover:bg-amber-100 text-lg py-6 px-8">اطلب الآن</Button>
                </motion.div>
              </div>
            </div>

            {/* أزرار التنقل بين المنتجات */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
              {products.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => setActiveProduct(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all",
                    activeProduct === index ? "bg-white w-12" : "bg-white/50 hover:bg-white/80",
                  )}
                  aria-label={`عرض ${product.name}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* قسم عن الشركة */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="مزارع سيوه بالم"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 to-transparent" />
                <div className="absolute bottom-0 right-0 left-0 p-8">
                  <p className="text-white text-lg font-medium">مزارعنا في واحة سيوه، مصر</p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold text-amber-900 mb-6">قصة سيوه بالم</h2>
              <div className="space-y-6 text-lg text-amber-800/80">
                <p>
                  شركة سيوه بالم شركة رائدة في الزراعة بخبرة تمتد لعشرات السنين، متخصصة في زراعة تمور المجدول والسيوي في
                  واحة سيوه والواحات البحرية.
                </p>
                <p>
                  تأسست عام 2001 كشركة مساهمة مصرية، وتتخذ من الجودة شعارًا لها في الإنتاج والتصدير. حصلت على العديد من
                  الجوائز كأفضل منتج لتمر المجدول نصف الجاف، وتسعى للريادة عالميًا.
                </p>
                <div className="pt-4 grid grid-cols-2 md:grid-cols-3 gap-6">
                  <ValueCard icon="🌴" title="الزراعة" description="خبرة طويلة في زراعة المحاصيل والفاكهة والخضروات" />
                  <ValueCard icon="⭐" title="الجودة" description="التزام بمعايير الجودة في الإنتاج والتصدير" />
                  <ValueCard
                    icon="🌱"
                    title="الاستدامة"
                    description="استثمار في الزراعة لدعم الاقتصاد وتحقيق التنمية المستدامة"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* قسم الاتصال */}
      <section className="py-20 bg-amber-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">تواصل معنا</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              نحن هنا للإجابة على استفساراتكم وتلبية طلباتكم من منتجاتنا الفاخرة
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-colors">
              <h3 className="text-2xl font-bold mb-4">معلومات الاتصال</h3>
              <div className="space-y-4">
                <p className="flex items-center gap-3">
                  <span className="text-amber-300 text-xl">📞</span>
                  <span>+20 123 456 7890</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-amber-300 text-xl">✉️</span>
                  <span>info@siwapalm.com</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-amber-300 text-xl">📍</span>
                  <span>واحة سيوه، مطروح، مصر</span>
                </p>
              </div>

              <div className="mt-8">
                <h4 className="text-xl font-medium mb-4">تابعنا</h4>
                <div className="flex gap-4">
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/20">
                    <Facebook className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/20">
                    <Instagram className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/20">
                    <Twitter className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-colors">
              <h3 className="text-2xl font-bold mb-4">أرسل رسالة</h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="الاسم"
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="رسالتك"
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">إرسال</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* تذييل الصفحة */}
      <footer className="bg-amber-950 text-white/70 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <Image
                src="/placeholder.svg?height=50&width=50"
                alt="شعار سيوه بالم"
                width={50}
                height={50}
                className="rounded-full"
              />
              <span className="font-bold text-2xl text-white">سيوه بالم</span>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              <Link href="#" className="hover:text-amber-300 transition-colors">
                الرئيسية
              </Link>
              <Link href="#" className="hover:text-amber-300 transition-colors">
                منتجاتنا
              </Link>
              <Link href="#" className="hover:text-amber-300 transition-colors">
                عن الشركة
              </Link>
              <Link href="#" className="hover:text-amber-300 transition-colors">
                تواصل معنا
              </Link>
            </div>

            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p>© {new Date().getFullYear()} سيوه بالم. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// مكونات مساعدة
function NavLink({ children, active = false, scrolled = false }) {
  return (
    <Link
      href="#"
      className={cn(
        "relative font-medium transition-colors",
        scrolled ? "text-amber-900" : "text-white",
        active && "font-bold",
      )}
    >
      {children}
      {active && (
        <span
          className={cn(
            "absolute bottom-0 left-0 right-0 h-0.5 -mb-1 rounded-full",
            scrolled ? "bg-amber-600" : "bg-white",
          )}
        />
      )}
    </Link>
  )
}

function ValueCard({ icon, title, description }) {
  return (
    <div className="bg-amber-100/50 rounded-2xl p-4 hover:bg-amber-100 transition-colors">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="font-bold text-amber-900 mb-1">{title}</h3>
      <p className="text-sm text-amber-800/70">{description}</p>
    </div>
  )
}

