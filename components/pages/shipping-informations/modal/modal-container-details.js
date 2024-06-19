function ModalContainerDetails({ htmlFor }) {
  return (
    <>
      <input type="checkbox" id={htmlFor} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">This modal works with a hidden checkbox!</p>
          <div className="modal-action">
            <label htmlFor={htmlFor} className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalContainerDetails;
