import Image from "next/image";
import { Nav } from "@/components/nav";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-background text-foreground">
      <main className="relative flex flex-col min-h-screen flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
        <Image
          src="/main.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover object-bottom"
        />
        <section
          className="relative z-10 flex w-full max-w-7xl flex-col items-center justify-center"
          aria-label="Cretan music archive home"
        >
          <div className="absolute bottom-20 z-10 mb-[-3vw] flex h-fit w-[min(88vw,560px)] flex-col items-center rounded-lg bg-archive-ivory/80 px-6 py-8 text-center text-deep-grove shadow-2xl shadow-archive-black/20 sm:mb-[-42px] sm:px-10 sm:py-9">
            <h1 className="!text-5xl font-semibold leading-none text-deep-grove sm:text-7xl">
              Μπαλούκος
            </h1>
            <p className="mt-5 max-w-md text-balance text-base font-medium leading-snug text-shallow-grove sm:text-xl">
              Εκπαιδευτικό αρχείο προπολεμικής κρητικής μουσικής
            </p>
          </div>
        </section>
        <div className="relative overflow-visible h-0 mt-30">
          <Nav />
        </div>
      </main>
    </div>
  );
}
