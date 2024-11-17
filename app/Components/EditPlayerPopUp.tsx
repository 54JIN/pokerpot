"use client";

import { useState } from "react";
import { ChangeEvent } from "react";

interface EditPlayerPopUpProps {
  handleClickPopUp: (data: { player: string; buyIn: number }) => void;
  handleClickManagePot: (data: { player: string; buyIn: number }) => void;
  data: {player: string, buyIn: number}
}

export default function EditPlayerPopUp({
  handleClickPopUp,
  handleClickManagePot,
  data
}: EditPlayerPopUpProps) {

  const [formData, setFormData] = useState<{ buyIn: number }>({
    buyIn: 0,
  });

  const handleChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = evt.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "buyIn" ? Number(value) : value
    }));
  };

  const handleClickAddToPlayerBuyIn = () => {
    data.buyIn = formData.buyIn
    handleClickManagePot(data);
  };
  
  const handleClickSubtractFromPlayerBuyIn = () => {
    data.buyIn = 0 - formData.buyIn
    handleClickManagePot(data);
  };

  return (
    <div className="flex flex-col bg-[#ffffff] p-5 gap-4 border-[2px] border-[rgba(238,238,238,0.8)] rounded-lg gap-2">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl">Edit player</h3>
        <button
          className="btn p-3 rounded-full"
          onClick={() => handleClickPopUp({player: "", buyIn: 0})}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-md text-[rgb(140,140,140)]">Buy In</p>
          <label className="input input-bordered rounded-xl flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <input
              type="number"
              className="grow text-md"
              placeholder="250.00"
              name="buyIn"
              value={formData.buyIn}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>
      <button className="btn" onClick={handleClickAddToPlayerBuyIn}>
        Add to Pot
      </button>
      <button className="btn" onClick={handleClickSubtractFromPlayerBuyIn}>
        Subtract from Pot
      </button>
    </div>
  );
}