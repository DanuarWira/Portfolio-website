export default function Card({ title, value, Icon, iconColor, iconBgColor }) {
  return (
    <>
      <div className="flex justify-between items-center w-full bg-white p-6 rounded-xl transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md">
        <div className="flex flex-col gap-2">
          <h6 className="text-sm text-gray-400">{title}</h6>
          <p className="text-xl text-gray-900">{value}</p>
        </div>
        <div className={`"p-3 rounded-full ${iconBgColor}"`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </>
  );
}
