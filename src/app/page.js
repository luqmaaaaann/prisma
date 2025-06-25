import { prisma } from "@/utils/prisma";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createTodoAction } from "./action";
//Pemanggilan semua di noteMethods (generik)
import * as noteMethods from "@/services/notes";

export default async function Home() {
  //Pemanggilan getNotes ke services
  const notes = await noteMethods.getAll();

  return (
    <div>
      <form action={createTodoAction}>
        <Input name="title" />
        <Textarea name="content" />
        <Button>Create</Button>
      </form>
      <h3>My Notes</h3>
      <div>
        {/* melakukan mapping u/ pemanggilan data id dan title */}
        {notes.map((note) => {
          return <div key={note.id}>{note.title}</div>;
        })}
      </div>
    </div>
  );
}
