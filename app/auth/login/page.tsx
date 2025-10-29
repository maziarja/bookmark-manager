import connectDB from "@/lib/database";
import LoginForm from "../_components/LoginForm";

async function page() {
  await connectDB();
  return <LoginForm />;
}

export default page;
