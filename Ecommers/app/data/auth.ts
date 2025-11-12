"use server";

export async function registerUserAction(formData: FormData) {
  console.log("hello Form Register user Action");

  const fields = {
    username: formData.get("usernamer") as string,
    password: formData.get("password") as string,
    email: formData.get("email") as string,
  };

  console.log("@@@@@@@@@@@@@@@@@@@@");
  console.log(fields);
  console.log("@@@@@@@@@@@@@@@@@@@@");
}
