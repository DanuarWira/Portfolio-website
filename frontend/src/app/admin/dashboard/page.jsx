import Card from "@/components/dashboard/card";
import { BookOpenText, BookText, ClipboardList, Star } from "lucide-react";

export default function DashboardPage() {
  const cards = [
    {
      title: "Jumlah Artikel",
      value: "20",
      icon: BookText,
      iconBgColor: "bg-primary-50",
      iconColor: "text-primary-600",
    },
    {
      title: "Jumlah Portofolio",
      value: "20",
      icon: BookOpenText,
      iconBgColor: "bg-secondary-50",
      iconColor: "text-secondary-600",
    },
    {
      title: "Jumlah Pengalaman",
      value: "20",
      icon: ClipboardList,
      iconBgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Jumlah Skill",
      value: "20",
      icon: Star,
      iconBgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((item, index) => (
            <Card key={index} title={item.title} value={item.value} Icon={item.icon} iconBgColor={item.iconBgColor} iconColor={item.iconColor} />
          ))}
        </div>
      </div>
    </>
  );
}
