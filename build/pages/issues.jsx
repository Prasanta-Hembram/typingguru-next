import Header from '@components/atoms/header';
import Footer from '@components/atoms/footer';
import CBody from '@components/atoms/cbody';
import { motion } from 'framer-motion';
import useForm from '@components/hooks/use-form';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';

const Input = ({ label, placeholder, ...etc }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-slate-500">{label}</span>
      <input
        placeholder={placeholder}
        className="p-3 rounded-md border border-primary-200"
        {...etc}
      />
    </div>
  );
};

const Issues = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [values, errors, handleChange, handleSubmit, setValues] = useForm({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      message: Yup.string().required('Message is required'),
    }),
    onSubmit: async (vals) => {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      try {
        await axios({
          method: 'post',
          url: '/api/issues',
          data: vals,
        });
        toast.success('Issue/Feedback reported successfully');

        setValues({
          name: '',
          email: '',
          message: '',
        });
      } catch (err) {
        toast.error('Something went wrong, try again later');
        console.log(err);
      } finally {
        setIsLoading(false);
      }

      console.log(vals);
    },
  });
  return (
    <CBody>
      <Header
        {...{
          page: 'Issues',
          isIssuePage: true,
        }}
      />

      <div className="flex-1 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 p-8 pt-4 rounded-md shadow-md"
        >
          <div className="text-xl font-medium font-resique">
            Issues / Feedback
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <Input
              label="Name"
              placeholder="Name"
              type="name"
              name="name"
              value={values.name}
              error={errors.name}
              onChange={handleChange('name')}
            />
            <Input
              label="Email"
              placeholder="Email"
              type="email"
              name="email"
              value={values.email}
              error={errors.email}
              onChange={handleChange('email')}
            />

            <div className="flex flex-col gap-1.5">
              <span className="text-slate-500">Message</span>
              <textarea
                className="border border-primary-200 rounded-md p-3 w-screen max-w-md"
                rows={5}
                placeholder="Message"
                value={values.message}
                onChange={handleChange('message')}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <motion.button
              initial={{ y: 0 }}
              whileTap={{ y: 2 }}
              className="bg-primary-500 text-white font-medium py-2 px-4 rounded-md active:bg-primary-600 text-sm"
            >
              {isLoading ? 'Sending' : 'Send'}
            </motion.button>
          </div>
        </form>
      </div>
    </CBody>
  );
};

export default Issues;
