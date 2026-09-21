import { getCurrentUser} from "@/lib/auth/actions";

const HomePage = async () => {

  const user = await getCurrentUser();

  console.log('USER:', user);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      <section>
        
      </section>


    </main>
  )
}

export default HomePage