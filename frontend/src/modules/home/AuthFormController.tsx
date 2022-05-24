import React from 'react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import {
  MeDocument,
  MeQuery,
  useRegisterMutation,
} from '../../generated/graphql';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { toErrorMap } from '../../utils/toErrorMap';
import { GoogleUser } from './GoogleAuthButtonController';

interface AuthFormControllerProps {
  authOptions: GoogleUser | undefined;
}

export const AuthFormController: React.FC<AuthFormControllerProps> = ({
  authOptions,
}) => {
  const router = useRouter();
  const [register] = useRegisterMutation();

  return (
    <Formik
      initialValues={
        authOptions
          ? {
              email: authOptions.email,
              name: authOptions.name,
              // ts error: object could be null so to supress error '!'
              username: authOptions.email.match(/^([^@]*)@/)![1],
              profilePicture: authOptions.picture,
              accessToken: authOptions.access_token,
            }
          : {
              email: '',
              name: '',
              username: '',
              profilePicture: '',
              accessToken: '',
            }
      }
      onSubmit={async (values, { setErrors }) => {
        const response = await register({
          variables: { options: values },
          update: (cache, { data }) => {
            cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                __typename: 'Query',
                me: data?.register.user,
              },
            });
          },
        });

        if (response.data?.register.errors) {
          setErrors(toErrorMap(response.data.register.errors));
        } else if (response.data?.register.user) {
          // register successful
          router.push('/dashboard');
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField name="username" label="Username" placeholder="Username" />
          <div className="mt-3">
            <InputField name="name" label="Name" placeholder="Name" />
          </div>
          <div className="mt-3">
            <InputField name="email" label="Email" placeholder="Email" />
          </div>
          <Button
            type="submit"
            buttonClass="primary"
            size="normal"
            style={{ marginTop: '2em' }}
            loading={isSubmitting}
            loadingText={isSubmitting ? 'Registering' : null}
          >
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};
