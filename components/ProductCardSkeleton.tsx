export default function ProductCardSkeleton({ index = 0 }: { index?: number }) {
  const animationDelay = `${index * 100}ms`

  return (
    <article
      className="group relative bg-white border-2 border-charcoal-900 rounded-2xl overflow-hidden animate-fadeIn"
      style={{ animationDelay }}
    >
      {/* Decorative corner accent */}
      <div className="absolute top-4 right-4 w-12 h-12 bg-clay-500/10 rounded-full blur-xl z-10" />

      {/* Image skeleton */}
      <div className="relative aspect-square bg-sand-200 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-br from-sand-100 to-sand-300" />
      </div>

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-sand-200 rounded-full w-3/4 animate-pulse" />
          <div className="h-4 bg-sand-200 rounded-full w-1/2 animate-pulse" style={{ animationDelay: '100ms' }} />
        </div>

        {/* Divider */}
        <div className="h-px bg-sand-200" />

        {/* Price skeleton */}
        <div className="h-8 bg-sand-200 rounded-full w-2/3 animate-pulse" style={{ animationDelay: '200ms' }} />

        {/* Progress bar skeleton */}
        <div className="h-1 bg-sand-200 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
      </div>
    </article>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} index={i} />
      ))}
    </div>
  )
}
