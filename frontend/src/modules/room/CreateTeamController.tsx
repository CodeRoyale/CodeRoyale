import React, { useState, useContext } from "react";
import { Form, Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "../../components/Button";
import { InputField } from "../../components/InputField";
import { Modal } from "../../components/Modal";
import { useRoom } from "../../global-stores";
import { createTeam } from "../../service/roomSocket";
import { toErrorMap } from "../../utils/toErrorMap";
import { WebSocketContext } from "../ws/WebSocketProvider";
import "react-toastify/dist/ReactToastify.css";

export const CreateTeamController: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { conn } = useContext(WebSocketContext);
  const setRoom = useRoom((state) => state.setRoom);

  return (
    <>
      <ToastContainer theme="dark" />
      <Button
        buttonClass="primary"
        size="normal"
        onClick={() => setIsOpen(true)}
      >
        New Team
      </Button>
      <Modal
        title="Create Team"
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <Formik
          initialValues={{
            teamName: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            console.log("onSubmit: ", values);
            const { teamName } = values;
            try {
              const response: any = await createTeam(conn, teamName);

              if (response.room) {
                console.log("CREATE_TEAM: ", response.room);
                setIsOpen(false);
                setRoom(response.room);
              }
            } catch (error: any) {
              console.log(error);
              if (error.errors[0].field === "CreateTeam") {
                toast("Create Team Failed", {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: false,
                  progress: undefined,
                });
              } else {
                setErrors(toErrorMap((error as any).errors));
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="teamName"
                label="Team Name"
                placeholder="Team Name"
                type="text"
              />
              <Button
                type="submit"
                buttonClass="primary"
                size="normal"
                style={{ marginTop: "2em" }}
                loading={isSubmitting}
                loadingText={isSubmitting ? "Creating a Team" : null}
              >
                Create Team
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};
