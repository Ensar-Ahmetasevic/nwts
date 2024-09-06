import FormPreStorageType from "./pre-storage-type/forms/form-pre-storage-type";

export default function PreStorageSetupDynamicFormDisplay({
  activeButton,
  setActiveButton,
}) {
  return (
    <div className="flex justify-center">
      {activeButton === "Pre-Storage Type Form" ? (
        <FormPreStorageType OnCancel={setActiveButton} />
      ) : null}
    </div>
  );
}
