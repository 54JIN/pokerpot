interface TotalPotDisplayCardProps {
  value: number;
}

export default function TotalPotDisplayCard({
  value,
}: TotalPotDisplayCardProps) {
  return (
    <div className="flex flex-col bg-[#ffffff] p-5 gap-4 border-[2px] border-[rgba(238,238,238,0.8)] rounded-lg gap-2">
      <p>Total Pot</p>
      <h3 className="text-4xl font-bold">${value}</h3>
    </div>
  );
}
