"use client";

import { useState } from "react";
import { ChangeEvent } from "react";

interface AddUserPopUpProps {
  handleClickPopUpClose: () => void;
  handleClickAddPlayer: (data: { player: string; buyIn: number }) => void;
}

export default function AddUserPopUp({
  handleClickPopUpClose,
  handleClickAddPlayer,
}: AddUserPopUpProps) {

  const [formData, setFormData] = useState<{ player: string; buyIn: number }>({
    player: "",
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

  const handleClickAddNewPlayer = () => {
    if (formData.player !== "" && formData.buyIn > 0) {
      handleClickAddPlayer(formData);
    }
  };

  return (
    <div className="flex flex-col bg-[#ffffff] p-5 gap-4 border-[2px] border-[rgba(238,238,238,0.8)] rounded-lg gap-2">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl">Add player</h3>
        <button
          className="btn p-3 rounded-full"
          onClick={handleClickPopUpClose}
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
          <p className="text-md text-[rgb(140,140,140)]">Player Name</p>
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
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <input
              type="text"
              className="grow text-md"
              placeholder="johndoe"
              name="player"
              value={formData.player}
              onChange={handleChange}
            />
          </label>
        </div>
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
      <button className="btn" onClick={handleClickAddNewPlayer}>
        Add Player
      </button>
    </div>
  );
}
