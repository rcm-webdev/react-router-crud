import { supabase } from "~/supabase-client";
import type { Route } from "./+types/ticket";
import { Form, redirect, type ActionFunctionArgs } from "react-router";

export function meta() {
  return [
    { title: "Edit Ticket | TaskPilot" },
    {
      name: "description",
      content: "Edit an existing ticket using our Supabase CRUD app",
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;
  if (!id) {
    return { error: "No ticket found." };
  }
  const { data, error } = await supabase
    .from("tickets")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    return { error: error.message };
  }

  return { ticket: data };
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const intent = formData.get("intent");
  const { id } = params;

  if (intent === "delete") {
    const { error } = await supabase.from("tickets").delete().eq("id", id);
    if (error) {
      return { error: error.message };
    }
    return redirect("/");
  } else if (intent == "update") {
    const { error } = await supabase
      .from("tickets")
      .update({ title, description })
      .eq("id", id);
    if (error) {
      return { error: error.message };
    }
    return redirect("/");
  } else {
    return {};
  }
}

export default function Ticket({ loaderData }: Route.ComponentProps) {
  const { error, ticket } = loaderData;
  return (
    <div>
      <div className="max-w-xl mx-auto bg-base-200 p-8 rounded-2xl shadow-lg">
        <div className="mx-25">
          <h2 className="text-2xl font-bold mb-6">{`Update Ticket #${ticket.id}`}</h2>
          <Form method="post" className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex flex-col w-full">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={ticket.title}
                  className="input input-bordered"
                  placeholder="Enter issue subject"
                  required
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  defaultValue={ticket.description}
                  className="textarea textarea-bordered"
                  placeholder="Describe the issue"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 ">
              <button
                type="submit"
                value={"update"}
                name="intent"
                className="mt-6 btn btn-success"
              >
                Update Ticket
              </button>
              <button
                type="submit"
                value={"delete"}
                name="intent"
                className="mt-6 btn btn-error"
              >
                Delete Ticket
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
