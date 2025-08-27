// src/components/Card.jsx
export default function Card({ title, children }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 border border-teal-200 hover:shadow-xl transition duration-300">
      {title && <h2 className="text-xl font-semibold text-teal-700 mb-3">{title}</h2>}
      <div className="text-gray-700">{children}</div>
    </div>
  );
}
