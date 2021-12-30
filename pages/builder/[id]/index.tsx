import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormTemplate } from '../../../components/FormTemplate';
import { BuilderContextProvider } from '../../../context/builder.context';
import { FormTemplate as FTemplate } from '../../../types/builder.types';
import classes from './builder.module.scss';

const Builder: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <BuilderContextProvider>
      <FormTemplate id={id?.toString()} />
    </BuilderContextProvider>
  );
};

export default Builder;
