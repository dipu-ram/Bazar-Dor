export default function CategoryLoading() {
  return (
    <div className="container-main animate-pulse py-8 sm:py-12">
      <div className="skeleton mb-6 h-5 w-40 rounded" />

      <div className="skeleton mb-8 h-36 rounded-3xl sm:h-44" />

      <div className="mb-5 flex items-center justify-between">
        <div className="skeleton h-6 w-36 rounded" />
        <div className="skeleton h-10 w-48 rounded-xl" />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
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
    </div>
  );
}