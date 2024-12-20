"use client";

//Components
import AddUserPopUp from "./Components/AddUserPopUp";
import EditPlayerPopUp from "./Components/EditPlayerPopUp";
import PlayerDisplayCard from "./Components/PlayerDisplayCard";
import TotalPotDisplayCard from "./Components/TotalPotDisplayCard";
import { useEffect, useState } from "react";

interface Player {
  name: string;
  buyIn: number;
}

export default function Home() {
  const [addUserPopUpOpen, setAddUserPopUpOpen] = useState(false);
  const [editUserPopUpOpen, setEditUserPopUpOpen] = useState(false);
  const [playerToEdit, setPlayerToEdit] = useState({player: "", buyIn: 0});
  const [totalPot, setTotalPot] = useState<number>(0);
  const [players, setPlayers] = useState<{ player: string; buyIn: number }[]>(
    []
  );

  useEffect(() => {
    const storedPlayers = localStorage.getItem("players");

    if (storedPlayers) {
      const parsedPlayers = JSON.parse(storedPlayers);
      setPlayers(parsedPlayers); // Parse the stringified array into an object
      const total = parsedPlayers.reduce(
        (acc: number, player: Player) => acc + player.buyIn,
        0
      );
      setTotalPot(total);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  const handleClickPopUpAddUser = () => {
    setAddUserPopUpOpen(!addUserPopUpOpen);
  };
  
  const handleClickEditUserPopUpOpen = (data: {player: string, buyIn: number}) => {
    setPlayerToEdit(data)
    setEditUserPopUpOpen(!editUserPopUpOpen);
  };

  const handleClickRemoveHistory = () => {
    localStorage.removeItem("players");
    setPlayers([])
    setTotalPot(0)
  };

  const handleClickAddPlayer = (data: { player: string; buyIn: number }) => {
    setPlayers((prevData) => [...prevData, data]);
    setTotalPot((prevTotal) => prevTotal + data.buyIn);
    setAddUserPopUpOpen(!addUserPopUpOpen);
  };
  
  const handleClickManagePot = (data: { player: string; buyIn: number }) => {
    setPlayers((prevData) => prevData.map((p) => p.player === data.player? {...data, buyIn: (p.buyIn + data.buyIn)} : p));
    setTotalPot((prevTotal) => prevTotal + data.buyIn);
    setEditUserPopUpOpen(!editUserPopUpOpen);
  };

  return (
    <>
      <div className="flex w-full justify-center items-center min-h-screen p-5">
        <div className="flex flex-col bg-[#ffffff] p-5 gap-4 border-[2px] border-[rgba(238,238,238,0.8)] rounded-lg w-[95vw] max-w-[360px]">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl">Poker Pot</h1>
            <div className="flex gap-2">
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
              <button
                className="btn p-3 rounded-full"
                onClick={handleClickRemoveHistory}
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
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
          <TotalPotDisplayCard value={totalPot} />
          {players.map((data, idx) => {
            return (
              <PlayerDisplayCard
                name={data.player}
                value={data.buyIn}
                handleClickEditUserPopUpOpen={handleClickEditUserPopUpOpen}
                key={idx}
              />
            );
          })}
        </div>
      </div>
      {addUserPopUpOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex h-screen w-screen justify-center items-center bg-gray-200 bg-opacity-90">
          <AddUserPopUp
            handleClickPopUpClose={handleClickPopUpAddUser}
            handleClickAddPlayer={handleClickAddPlayer}
            currentPlayers={players}
          />
        </div>
      )}
      {editUserPopUpOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex h-screen w-screen justify-center items-center bg-gray-200 bg-opacity-90">
          <EditPlayerPopUp
            handleClickPopUp={handleClickEditUserPopUpOpen}
            handleClickManagePot={handleClickManagePot}
            data={playerToEdit}
          />
        </div>
      )}
    </>
  );
}
