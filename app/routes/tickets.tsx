import { supabase } from "~/supabase-client";
import type { Route } from "./+types/tickets";
import { Link } from "react-router";

export async function loader() {
  const { data, error } = await supabase.from("tickets").select("*");
  if (error) {
    return { error: error.message };
  }

  return { tickets: data };
}

export default function Tickets({ loaderData }: Route.ComponentProps) {
  const { error, tickets } = loaderData;

  return (
    <div className="max-w-5xl mx-auto mt-6 space-y-4">
      <h2 className="text-center text-4xl ">
        List of <span className="text-success font-bold">open</span> bounties
      </h2>
      {error && <div>{error}</div>}
      <ul className="grid grid-cols-3 gap-4 max-h-[500px] overflow-y-auto">
        {tickets?.map((ticket) => (
          <li
            key={ticket.id}
            className="font-bold bg-base-200 p-6 rounded-3xl hover:bg-neutral hover:text-neutral-content duration-200"
          >
            <Link to={"/"} className="flex flex-col">
              <span className="text-warning text-xs">Id: {ticket.id}</span>
              <span>{ticket.title}</span>
              <p>{ticket.description}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="divider"></div>

      <h2 className="text-center text-4xl ">
        List of <span className="text-error font-bold">closed</span> bounties
      </h2>
      {error && <div>{error}</div>}
      <ul className="grid grid-cols-3 gap-4 max-h-[500px] overflow-y-auto">
        {tickets?.map((ticket) => (
          <li
            key={ticket.id}
            className="font-bold bg-base-200 p-6 rounded-3xl hover:bg-neutral hover:text-neutral-content duration-200"
          >
            <Link to={"/"} className="flex flex-col">
              <span className="text-warning text-xs">Id: {ticket.id}</span>
              <span>{ticket.title}</span>
              <p>{ticket.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
