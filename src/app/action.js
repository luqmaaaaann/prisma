"use server";

import { getSession } from "@/services/session";
import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerAction(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  console.log({ name, email, password });

  try {
    await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);
  } catch (err) {
    console.log(err);
    return {
      message: "User already exist",
    };
  }
}

export async function loginAction(formData) {
  const cookiesStore = await cookies();
  const email = formData.get("email");
  const password = formData.get("password");

  let user = null;

  try {
    user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
  } catch (err) {
    console.log("Something went wrong");
    return {
      message: "Something went wrong",
    };
  }

  if (!user) {
    console.log("User does not exist");
    return {
      message: "User does not exist",
    };
  }

  //cek Password yg benar/salah
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    console.log("Invalid Password");
    return {
      message: "Invalid Password",
    };
  }

  //Authorization
  const newSession = await prisma.session.create({
    data: {
      userId: user.id,
    },
  });

  console.log({ newSession });

  cookiesStore.set("sessionId", newSession.id, {
    httpOnly: true,
    maxAge: 1000 * 30,
  });
  redirect("/dashboard");
}

export async function logoutAction(_) {
  const cookiesStore = await cookies();
  const session = await getSession();

  await prisma.session.delete({
    where: {
      id: session.id,
    },
  });

  cookiesStore.delete("sessionId");
  redirect("/");
}
