"use client";
import { createContext, useContext, useState } from "react";

type GroupDetailsSidebarContextType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export const GroupDetailsSidebarContext =
  createContext<GroupDetailsSidebarContextType>({
    isOpen: false,
    setIsOpen: () => {},
  });

export const useGroupDetailsSidebar = () =>
  useContext(GroupDetailsSidebarContext);

export default function GroupDetailsSidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <GroupDetailsSidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </GroupDetailsSidebarContext.Provider>
  );
}
