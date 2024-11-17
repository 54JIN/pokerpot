"use client";

//Components
import AddUserPopUp from "./Components/AddUserPopUp";
import PlayerDisplayCard from "./Components/PlayerDisplayCard";
import TotalPotDisplayCard from "./Components/TotalPotDisplayCard";
import { useState } from "react";

export default function Home() {
  const [addUserPopUpOpen, setAddUserPopUpOpen] = useState(false);
  const [totalPot, setTotalPot] = useState<number>(0);
  const [players, setPlayers] = useState<{ player: string; buyIn: number }[]>([]);

  const handleClickPopUpAddUser = () => {
    setAddUserPopUpOpen(!addUserPopUpOpen);
  };
  
  const handleClickAddPlayer = (data: { player: string; buyIn: number }) => {
    setPlayers((prevData) => [
      ...prevData,
      data
    ]);
    setTotalPot((prevTotal) => (
      prevTotal + data.buyIn
    ))
    setAddUserPopUpOpen(!addUserPopUpOpen);
  };

  return (
    <>
      <div className="flex w-full justify-center items-center min-h-screen p-5">
        <div className="flex flex-col bg-[#ffffff] p-5 gap-4 border-[2px] border-[rgba(238,238,238,0.8)] rounded-lg w-[95vw] max-w-[360px]">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl">Poker Pot</h1>
            <button
              className="btn p-3 rounded-full"
              onClick={handleClickPopUpAddUser}
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
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />
              </svg>
            </button>
          </div>
          <TotalPotDisplayCard value={totalPot} />
          {players.map((data, idx) => {
            return (
              <PlayerDisplayCard name={data.player} value={data.buyIn} key={idx}/>
            )
          })}
        </div>
      </div>
      {addUserPopUpOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex h-screen w-screen justify-center items-center bg-gray-200 bg-opacity-90">
          <AddUserPopUp handleClickPopUpClose={handleClickPopUpAddUser} handleClickAddPlayer={handleClickAddPlayer}/>
        </div>
      )}
    </>
  );
}
