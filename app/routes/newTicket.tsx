import { Form, redirect, type ActionFunctionArgs } from "react-router";
import { supabase } from "~/supabase-client";

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
    <div>
      <h2>Create New Ticket</h2>
      <Form method="post">
        <div>
          <label>Title</label>
          <input type="text" name="title" required />
        </div>
        <div>
          <label>Description</label>
          <textarea name="description" required />
        </div>

        <button type="submit">Create Ticket</button>
      </Form>
    </div>
  );
}
