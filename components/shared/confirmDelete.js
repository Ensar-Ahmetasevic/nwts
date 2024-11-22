export default function ConfirmDelete({ setShowDeleteConfirm, confirmDelete }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg border-2 border-white bg-gray-800 p-6 shadow-xl">
        <h3 className="mb-4 text-lg font-bold text-white">Confirm Delete</h3>
        <p className="mb-6 text-white">Are you sure you want to delete?</p>
        <div className="flex justify-end space-x-4">
          <button className="btnDelete" onClick={() => confirmDelete()}>
            Delete
          </button>
          <button
            className="btnCancel"
            onClick={() => setShowDeleteConfirm(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
