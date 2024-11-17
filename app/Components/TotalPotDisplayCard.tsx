interface TotalPotDisplayCardProps {
  value: number;
}

export default function TotalPotDisplayCard({
  value,
}: TotalPotDisplayCardProps) {
  return (
    <div className="flex flex-col bg-[#4895ef] p-5 gap-4 border-[2px] border-[rgba(238,238,238,0.8)] rounded-lg gap-2">
      <p className="text-[#ffffff]">Total Pot</p>
      <h3 className="text-4xl text-[#ffffff] font-bold">${value}</h3>
    </div>
  );
}
