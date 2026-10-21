export default function HeroSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-[#f8f9fb]">
      <div className="flex flex-col justify-center w-full min-h-60 max-w-300 mx-auto">{children}</div>
    </section>
  );
}
