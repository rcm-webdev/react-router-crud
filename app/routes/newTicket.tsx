import { Form, redirect, type ActionFunctionArgs } from "react-router";
import { supabase } from "~/supabase-client";

export function meta() {
  return [
    { title: "New Ticket | TaskPilot" },
    {
      name: "description",
      content: "Create a new ticket using our Supabase CRUD app",
    },
  ];
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!title || !description) {
    return { error: "Title and description are required" };
  }

  const { data, error } = await supabase
    .from("tickets")
    .insert({ title, description })
    .select();
  if (error) {
    console.error("Error inserting ticket:", error.message);
    return { error: error.message };
  }

  if (data && data.length > 0) {
    console.log("Ticket created with ID:", data[0].id);
  }

  return redirect("/");
}

export default function NewTicket() {
  return (
    <div className="max-w-xl mx-auto flex items-center justify-center min-h-screen">
      <div className="w-full bg-base-200 p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Create New Ticket Bounty</h2>
        <Form method="post" className="space-y-4 ">
          <div className="flex flex-col">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              name="title"
              className="input input-bordered"
              placeholder="Enter issue subject"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered"
              placeholder="Describe the issue"
              required
            />
          </div>

          <button type="submit" className="mt-6 btn btn-secondary">
            Create Ticket
          </button>
        </Form>
      </div>
    </div>
  );
}
