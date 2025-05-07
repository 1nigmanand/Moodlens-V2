export default function EmotionCard({ emotion, details }) {
    return (
      <div className="border rounded p-4 bg-white shadow">
        <h2 className="text-xl font-semibold mb-2">{emotion}</h2>
        <p><strong>Count:</strong> {details.count}</p>
        <ul className="mt-2 space-y-1">
          {details.situation.map((s, idx) => (
            <li key={idx} className="text-sm">
              <strong>{s.name_of_person}:</strong> {s.reason}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  