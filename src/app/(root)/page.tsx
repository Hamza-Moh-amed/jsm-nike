import { getCurrentUser} from "@/lib/auth/actions";

const HomePage = async () => {

  const user = await getCurrentUser();

  console.log('USER:', user);

  return (
    <div>
    </div>
  )
}

export default HomePage