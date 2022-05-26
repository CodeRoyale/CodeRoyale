import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Form, Formik } from 'formik';
import { Button } from '../../components/Button';
import { InputField } from '../../components/InputField';
import {
  MeDocument,
  MeQuery,
  useMeQuery,
  useUpdateUserMutation,
} from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import 'react-toastify/dist/ReactToastify.css';

export const SettingsCardController: React.FC = () => {
  const { data, loading } = useMeQuery();
  const [updateUser] = useUpdateUserMutation();

  let body = null;

  if (loading) {
  } else if (!data?.me) {
  } else {
    body = (
      <div className="bg-primary-800 rounded-lg p-6 mt-8">
        <Formik
          initialValues={{
            username: data.me.username,
            name: data.me.name,
            email: data.me.email,
            bio: data.me.bio,
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await updateUser({
              variables: {
                options: {
                  username: values.username,
                  name: values.name,
                  bio: values.bio ? values.bio : null,
                },
              },
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: 'Query',
                    me: data?.updateUser.user,
                  },
                });
              },
            });

            if (response.data?.updateUser.errors) {
              setErrors(toErrorMap(response.data.updateUser.errors));
            } else if (response.data?.updateUser.user) {
              // update user successful
              toast('Updated profile successfully!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
              });
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <span className="text-primary-100 font-bold text-xl">
                Settings
              </span>
              <div className="mt-6">
                <InputField
                  name="username"
                  label="Username"
                  placeholder="Username"
                />
              </div>
              <div className="mt-3">
                <InputField name="name" label="Name" placeholder="Name" />
              </div>
              <div className="mt-3">
                <InputField
                  name="email"
                  label="Email"
                  placeholder="Email"
                  disabled
                />
              </div>
              <div className="mt-3">
                <InputField textarea name="bio" label="Bio" placeholder="Bio" />
              </div>
              <Button
                type="submit"
                buttonClass="primary"
                size="normal"
                style={{ marginTop: '2em' }}
                loading={isSubmitting}
                loadingText={isSubmitting ? 'Registering' : null}
              >
                Update
              </Button>
            </Form>
          )}
        </Formik>
        <ToastContainer theme="dark" />
      </div>
    );
  }

  return <>{body}</>;
};
