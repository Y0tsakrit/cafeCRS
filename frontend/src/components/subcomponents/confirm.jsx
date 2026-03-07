function Confirm({ show, onClose, onConfirm }) {
  if (!show) return null;
  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-opacity-40">
      <div className="relative flex flex-col items-center bg-white shadow-lg p-8 rounded-xl w-96">
        <button
          className="top-3 right-3 absolute font-bold text-gray-500 hover:text-gray-700 text-xl"
          onClick={onClose}
        >
        </button>
        <h2 className="mb-4 font-bold text-purple-700 text-lg">Confirm Reservation</h2>
        <div className="mb-6 text-gray-700 text-center">Are you sure you want to reserve these seats?</div>
        <div className="flex gap-4">
          <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded font-bold text-gray-700" onClick={onClose}>Cancel</button>
          <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded font-bold text-white" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default Confirm;