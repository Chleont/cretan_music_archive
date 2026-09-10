import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-background text-foreground">
      <main className="relative flex min-h-screen flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
        <section
          className="relative flex w-full max-w-7xl flex-col items-center justify-center"
          aria-label="Cretan music archive home"
        >
          <div className="absolute z-10 bottom-20 flex flex-col mb-[-3vw] bg-[#6f584230] rounded-lg p-10 h-fit w-1/2 sm:mb-[-42px]">
            <Image
              src="/logo.png"
              alt="Cretan Music Archive logo placeholder"
              width={380}
              height={160}
              priority
              sizes="50vw"
              className="mb-auto mx-auto h-auto w-1/2 object-contain"
            />
            <Image
              src="/sublogo.png"
              alt="Cretan Music Archive logo placeholder"
              fill
              priority
              className="object-contain mt-16"
            />
          </div>

          <div className="grid h-[min(85vh,760px)] w-[min(94vw,1180px)] grid-cols-2 overflow-hidden bg-surface shadow-2xl shadow-accent/15">
            <div className="relative h-full bg-surface">
              <div className="absolute bottom-3 left-3 right-0 top-3 sm:bottom-4 sm:left-4 sm:top-4">
                <Image
                  src="/kareklas.jpg"
                  alt="Archive visual placeholder left"
                  fill
                  priority
                  sizes="(max-width: 1180px) 47vw, 590px"
                  className="object-contain object-right"
                />
              </div>
            </div>
            <div className="relative h-full bg-surface-muted">
              <div className="absolute bottom-3 left-0 right-3 top-3 sm:bottom-4 sm:right-4 sm:top-4">
                <Image
                  src="/koufianos.jpg"
                  alt="Archive visual placeholder right"
                  fill
                  priority
                  sizes="(max-width: 1180px) 47vw, 590px"
                  className="object-contain object-left"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
