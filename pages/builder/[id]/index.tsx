import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FormTemplate } from '../../../components/FormTemplate';
import { BuilderContextProvider } from '../../../context/builder.context';

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
