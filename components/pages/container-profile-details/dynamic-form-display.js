import TableContainerType from "./container-type/edit-delete/table-container-type";
import FormWasteProfile from "./waste-profile/add/form-waste-profile";
import FormContainerType from "./container-type/add/form-container-type";
import FormLocationOrigin from "./location-origin/add/form-location-origin";

export default function DynamicFormDisplay({ activeButton, setActiveButton }) {
  return (
    <div>
      {activeButton === "Location origin Form" ? (
        <FormLocationOrigin cancelLocationOriginForm={setActiveButton} />
      ) : null}

      {activeButton === "Waste profile Form" ? (
        <FormWasteProfile cancelWasteProfileForm={setActiveButton} />
      ) : null}
      {activeButton === "Container type Form" ? (
        <FormContainerType OnCancel={setActiveButton} />
      ) : null}

      {activeButton === "Container type Tabel" ? (
        <TableContainerType OnCancel={setActiveButton} />
      ) : null}
    </div>
  );
}
