import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-primary grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <nav className="w-full flex flex-row items-center justify-between">
        <Link href="/" className="flex flex-row items-center">
          <Image
            src="/images/logo.svg"
            width={772}
            height={448}
            alt=""
            className="w-[60px] h-[200px] mr-2"
          />
          <p className="text-primary-foreground font-primary font-bold text-4xl">
            KYRO
          </p>
        </Link>
        <div className="flex flex-row items-center">
          <Link
            href={"https://x.com/kyrodotgreen"}
            target="_blank"
            className="text-primary-foreground font-primary font-bold text-xl hover:text-black mr-8"
          >
            𝕏
          </Link>
          <Link
            href={"/app"}
            className="text-primary-foreground font-primary font-bold text-xl hover:text-black"
          >
            Launch App
          </Link>
        </div>
      </nav>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col">
          <div className="flex items-center justify-start">
            <Image
              src="/images/ewaste.png"
              width={150}
              height={20}
              alt=""
              className="rounded-[100px] w-[80px] lg:w-[150px] mr-4 grayscale"
            />
            <h1 className="mb-2 text-primary-foreground font-primary font-bold text-[56px] lg:text-[112px]">
              Turning
            </h1>
          </div>
          <h1 className="-mt-6 lg:-mt-10 text-primary-foreground font-primary font-bold text-[56px] lg:text-[112px] leading-tight">
            your e-waste into tokens
          </h1>
        </div>
      </main>
      <p className="w-full h-px bg-primary-foreground my-4"></p>
      {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer> */}
    </div>
  );
}
