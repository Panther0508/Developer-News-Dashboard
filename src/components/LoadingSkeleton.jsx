const LoadingSkeleton = ({ type = 'card', count = 3 }) => {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="skeleton h-5 w-20 rounded" />
              <div className="skeleton h-4 w-16 rounded" />
            </div>
            <div className="skeleton h-6 w-full rounded mb-2" />
            <div className="skeleton h-6 w-3/4 rounded mb-4" />
            <div className="skeleton h-4 w-full rounded mb-2" />
            <div className="skeleton h-4 w-2/3 rounded mb-4" />
            <div className="flex gap-2 mb-4">
              <div className="skeleton h-5 w-12 rounded" />
              <div className="skeleton h-5 w-12 rounded" />
              <div className="skeleton h-5 w-12 rounded" />
            </div>
            <div className="pt-3 border-t border-black-200">
              <div className="skeleton h-4 w-1/3 rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (type === 'repo') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="card p-5">
            <div className="skeleton h-5 w-3/4 rounded mb-3" />
            <div className="skeleton h-4 w-full rounded mb-2" />
            <div className="skeleton h-4 w-2/3 rounded mb-4" />
            <div className="flex gap-2 mb-4">
              <div className="skeleton h-5 w-16 rounded" />
              <div className="skeleton h-5 w-16 rounded" />
            </div>
            <div className="pt-3 border-t border-black-200">
              <div className="skeleton h-4 w-1/4 rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (type === 'tool') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="card p-5">
            <div className="flex items-center space-x-3 mb-3">
              <div className="skeleton w-10 h-10 rounded-lg" />
              <div className="skeleton h-5 w-24 rounded" />
            </div>
            <div className="skeleton h-4 w-full rounded mb-2" />
            <div className="skeleton h-4 w-3/4 rounded mb-4" />
            <div className="skeleton h-5 w-20 rounded" />
          </div>
        ))}
      </div>
    )
  }

  if (type === 'chart') {
    return (
      <div className="card p-6">
        <div className="skeleton h-6 w-40 rounded mb-6" />
        <div className="h-64">
          <div className="skeleton h-full w-full rounded" />
        </div>
      </div>
    )
  }

  return null
}

export default LoadingSkeleton
