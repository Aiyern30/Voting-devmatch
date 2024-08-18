import { Button } from "@/components/ui/Button";
import Header from "@/components/ui/Components/Header";
import Footer from "@/components/ui/Components/Footer";
const url = process.env.NEXT_PUBLIC_API_URL;
console.log("url", url);

export default function Home() {
  return (
    <div>
      <Header />

      <div className="w-full h-[630px] bg-[#F1E5D1] flex justify-center items-center relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('Homepage.png')" }}
        ></div>

        <div className="relative flex flex-col space-y-3 z-10">
          <div className="text-3xl font-bold">Decentralized Voting System</div>
          <div>Secure, transparent, and decentralized voting for everyone.</div>
          <div className="flex space-x-2 mx-auto">
            <Button className="bg-[#DBB5B5] border border-[#2A2929] text-black">
              Get Started
            </Button>
            <Button className="bg-[#C39898] border border-[#2A2929] text-black">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-[#DBB5B5] h-16"></div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
