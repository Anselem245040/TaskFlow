import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface Member {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member";
}

interface Team {
  id: string;
  name: string;
  members: Member[];
}

interface TeamContextType {
  team: Team | null;
  createTeam: (name: string) => Promise<void>;
  joinTeam: (inviteToken: string) => Promise<void>;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider = ({ children }: { children: ReactNode }) => {
  const [team, setTeam] = useState<Team | null>(null);

  const createTeam = async (name: string) => {
    setTeam({
      id: "t1",
      name,
      members: [],
    });
  };

  const joinTeam = async (inviteToken: string) => {};
  return (
    <TeamContext.Provider value={{ team, createTeam, joinTeam }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) throw new Error("useTeam must be used within a TeamProvider");
  return context;
};
