import ConfidenceMeter from "./ConfidenceMeter";

export default function DiseaseCard({ disease, imageUrl }) {
  const badgeColors = {
    high: "bg-green-100 text-green-800",
    medium: "bg-amber-100 text-amber-800",
    low: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
      <div className="flex items-start gap-4">
        {imageUrl && (
          <img src={imageUrl} alt="Uploaded leaf"
            className="w-20 h-20 object-cover rounded-lg border border-gray-200" />
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-gray-900">{disease.display_name}</h3>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badgeColors[disease.confidence_level]}`}>
              {disease.confidence_level}
            </span>
          </div>
          <ConfidenceMeter value={disease.confidence} level={disease.confidence_level} />
        </div>
      </div>
    </div>
  );
}
