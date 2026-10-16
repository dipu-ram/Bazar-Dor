export default function HomeLoading() {
  return (
    <div className="container-main animate-pulse py-8 sm:py-12">
      <div className="skeleton h-72 rounded-3xl sm:h-96" />

      {[1, 2, 3].map((section) => (
        <section key={section} className="mt-10">
          <div className="skeleton mb-5 h-8 w-56 rounded" />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-[#e4eae4] bg-white p-4"
              >
                <div className="skeleton h-20 w-20 rounded-2xl" />
                <div className="skeleton mt-4 h-5 w-3/4 rounded" />
                <div className="skeleton mt-2 h-4 w-1/2 rounded" />
                <div className="skeleton mt-5 h-7 w-2/3 rounded" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}