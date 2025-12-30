import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useCompetitions() {
  return useQuery({
    queryKey: [api.competitions.list.path],
    queryFn: async () => {
      const res = await fetch(api.competitions.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch competitions");
      return api.competitions.list.responses[200].parse(await res.json());
    },
  });
}

export function useCompetition(id: number) {
  return useQuery({
    queryKey: [api.competitions.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.competitions.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch competition");
      return api.competitions.get.responses[200].parse(await res.json());
    },
  });
}
