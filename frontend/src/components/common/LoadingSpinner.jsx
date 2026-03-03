export default function LoadingSpinner({ message = "Analyzing your crop..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
      <p className="text-gray-600 text-sm animate-pulse">{message}</p>
    </div>
  );
}
