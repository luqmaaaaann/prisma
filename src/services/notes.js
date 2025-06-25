//Data Access Layer (DAL)
import "server-only";
import { prisma } from "@/utils/prisma";

export async function getAll() {
  //Melakukan pemanggilan method data berdasarkan desc
  const notes = await prisma.note.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return notes;
}

export async function create(title, content) {
  //penambahan data yg diinput ke database
  const newNote = await prisma.note.create({
    data: {
      title,
      content,
    },
  });
  return newNote;
}
