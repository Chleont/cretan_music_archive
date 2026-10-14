import Image from "next/image";
import { Nav } from "@/components/nav";
import { getDictionary, getLocale } from "@/lib/translations";

export default async function Home({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const dictionary = getDictionary(getLocale(params.lang));

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-background text-foreground">
      <main className="relative flex min-h-screen flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
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
          aria-label={dictionary.homePage.ariaLabel}
        >
          <div className="absolute bottom-20 z-10 mb-[-3vw] flex h-fit w-[min(88vw,560px)] flex-col items-center rounded-lg bg-archive-ivory/80 px-6 py-8 text-center text-deep-grove shadow-2xl shadow-archive-black/20 sm:mb-[-42px] sm:px-10 sm:py-9">
            <h1 className="!text-5xl font-semibold leading-none text-deep-grove sm:text-7xl">
              {dictionary.homePage.title}
            </h1>
            <p className="mt-5 max-w-md text-balance text-base font-medium leading-snug text-shallow-grove sm:text-xl">
              {dictionary.homePage.subtitle}
            </p>
          </div>
        </section>
        <div className="relative mt-30 h-0 overflow-visible">
          <Nav
            labels={dictionary.navigation}
            ariaLabel={dictionary.common.primaryNavigation}
          />
        </div>
      </main>
    </div>
  );
}
