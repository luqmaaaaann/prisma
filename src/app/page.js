import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginAction, registerAction } from "./action";

export default async function Home() {
  //Pemanggilan semua data query ke database
  // const users = await prisma.user.findMany({
  //   //Mengambil relasi dari post milik user untuk mengambil id dan title
  //   include: {
  //     post: {
  //       select: {
  //         id: true,
  //         title: true,
  //       },
  //     },
  //   },
  // });

  //Render UI
  return (
    <div>
      <form action={loginAction}>
        <Input name="email" placeholder="Email" type="email" />
        <Input name="password" placeholder="Password" type="password" />
        <Button>Login</Button>
      </form>
    </div>

    // <div>
    //   <form action={registerAction}>
    //     <Input name="name" placeholder="Name" />
    //     <Input name="email" placeholder="Email" />
    //     <Input name="password" placeholder="Password" type="password" />
    //     <Button>Register</Button>
    //   </form>
    // </div>

    // <div>
    //   <h3>My users</h3>
    //   <div>
    //     {/* melakukan mapping u/ pemanggilan data id dan title */}
    //     {users.map((user) => {
    //       return (
    //         <div key={user.id} className="p-4 rounded-lg w-fit border">
    //           <div>
    //             {user.name} - {user.email}
    //           </div>
    //           {/*jumlah post yg dimiliki user*/}
    //           <div>User have {user.post.length} post</div>

    //           {/*Nested Mapping (menampilkan semua judul post dari user)*/}
    //           <div>
    //             {user.post.map((post) => {
    //               return <div key={post.id}>{post.title}</div>;
    //             })}
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
  );
}
