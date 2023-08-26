import Navbar from "@/components/Navbar";
import ContactList from "@/components/ContactList";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal";
import FormInput from "@/components/FormInput";
import Alert from "@/components/Alert";

import useModal from "@/hooks/useModal";
import useInput from "@/hooks/useInput";

import { useMutation } from "@apollo/client";
import { GET_CONTACT_AGGREGATE, GET_CONTACT_LIST } from "@/graphql/queries";
import { ADD_CONTACT_WITH_PHONES, EDIT_CONTACT_BY_ID } from "@/graphql/mutation";

function App() {
  const { inputValues } = useInput();
  const { openModal, closeModal, modals } = useModal();
  const [addContact] = useMutation(ADD_CONTACT_WITH_PHONES, {
    refetchQueries: [GET_CONTACT_LIST, GET_CONTACT_AGGREGATE],
    variables: {
      first_name: inputValues["first_name"],
      last_name: inputValues["last_name"],
      phones: inputValues["phones"],
    },
  });

  const [editContact] = useMutation(EDIT_CONTACT_BY_ID, {
    refetchQueries: [GET_CONTACT_LIST, GET_CONTACT_AGGREGATE],
    variables: {
      id: inputValues["id"],
      _set: {
        first_name: inputValues["first_name"],
        last_name: inputValues["last_name"],
        phones: inputValues["phones"],
      },
    },
  });

  return (
    <>
      <Navbar />
      <ContactList />
      <Pagination />
      <Modal
        id="modal-add-contact"
        title="Add Contact"
        isOpen={modals["modal-add-contact"]}
        onClose={() => closeModal("modal-add-contact")}
        onClick={() => {
          addContact();
          closeModal("modal-add-contact");
          openModal("alert-add-contact");
        }}
        withAction
      >
        <FormInput />
      </Modal>
      <Modal id="alert-add-contact" isOpen={modals["alert-add-contact"]} onClose={() => closeModal("alert-add-contact")}>
        <Alert title="Add Contact Succesfully" description="Congratulation, Your added new contact" src="/success.png" alt="success-icon" />
      </Modal>
      <Modal id="alert-modal" isOpen={modals["alert-edit-contact"]} onClose={() => closeModal("alert-edit-contact")}>
        <Alert
          title="Edit Contact Succesfully"
          description="Congratulation, Your contact has been changed"
          src="/success.png"
          alt="success-icon"
        />
      </Modal>
      <Modal
        id="modal-edit-contact"
        title="Edit Contact"
        isOpen={modals["modal-edit-contact"]}
        onClose={() => closeModal("modal-edit-contact")}
        onClick={() => {
          editContact();
          closeModal("modal-edit-contact");
          openModal("alert-edit-contact");
        }}
        withAction
      >
        <FormInput />
      </Modal>
    </>
  );
}

export default App;
