import Navbar from "@/components/Navbar";


export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <>
     <Navbar />
      {children}
    </>
  );
}
