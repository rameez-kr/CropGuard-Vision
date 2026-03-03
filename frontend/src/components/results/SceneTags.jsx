export default function SceneTags({ tags }) {
  if (!tags || tags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {tags.map((tag) => (
        <span key={tag.name}
          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
          {tag.name} ({Math.round(tag.confidence * 100)}%)
        </span>
      ))}
    </div>
  );
}
