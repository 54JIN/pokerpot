interface PlayerDisplayCardProps {
  name: string;
  value: number;
  handleClickEditUserPopUpOpen: (data: { player: string; buyIn: number }) => void;
}

export default function PlayerDisplayCard({
  name,
  value,
  handleClickEditUserPopUpOpen
}: PlayerDisplayCardProps) {
  return (
    <div className="flex flex-col bg-[#da2c38] p-5 gap-4 border-[2px] border-[rgba(238,238,238,0.8)] rounded-lg gap-2">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-[#ffffff] font-bold">{name}</p>
          <p className="text-[#dee2e6]">total buy in</p>
        </div>
        <button className="btn btn-ghost p-3 rounded-full" onClick={() => handleClickEditUserPopUpOpen({player: name, buyIn: value})}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ffffff"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </button>
      </div>
      <h3 className="text-2xl text-[#ffffff] font-bold">${value}</h3>
    </div>
  );
}
