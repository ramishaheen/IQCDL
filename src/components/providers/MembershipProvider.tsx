"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface CommunityMembership {
  id: string;
  email: string;
  name: string;
  discountCode: string;
  createdAt: string;
}

interface MembershipContextValue {
  membership: CommunityMembership | null;
  isMember: boolean;
  grant: (input: { email: string; name: string }) => CommunityMembership;
  link: (id: string) => void;
  clear: () => void;
}

const MembershipContext = createContext<MembershipContextValue | null>(null);
const STORAGE_KEY = "iqcdl_membership";
export const DISCOUNT_CODE = "IQCDL10";
export const MEMBERSHIP_PRICE_USD = 19;

function makeMembershipId(): string {
  return `IQCDL-M-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export function MembershipProvider({ children }: { children: ReactNode }) {
  const [membership, setMembership] = useState<CommunityMembership | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMembership(JSON.parse(raw) as CommunityMembership);
    } catch {
      /* ignore */
    }
  }, []);

  const persist = useCallback((m: CommunityMembership | null) => {
    setMembership(m);
    try {
      if (m) localStorage.setItem(STORAGE_KEY, JSON.stringify(m));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const grant = useCallback(
    (input: { email: string; name: string }) => {
      const m: CommunityMembership = {
        id: makeMembershipId(),
        email: input.email,
        name: input.name,
        discountCode: DISCOUNT_CODE,
        createdAt: new Date().toISOString(),
      };
      persist(m);
      return m;
    },
    [persist],
  );

  // Lets a returning member unlock features by entering their ID on a new device.
  const link = useCallback(
    (id: string) => {
      persist({
        id: id.trim().toUpperCase(),
        email: "",
        name: "Member",
        discountCode: DISCOUNT_CODE,
        createdAt: new Date().toISOString(),
      });
    },
    [persist],
  );

  return (
    <MembershipContext.Provider
      value={{ membership, isMember: !!membership, grant, link, clear: () => persist(null) }}
    >
      {children}
    </MembershipContext.Provider>
  );
}

export function useMembership(): MembershipContextValue {
  const ctx = useContext(MembershipContext);
  if (!ctx) throw new Error("useMembership must be used within MembershipProvider");
  return ctx;
}
