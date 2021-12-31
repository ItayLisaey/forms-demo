import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import classes from './form-viewer.module.scss';
import form from '../../../exampleform.json';
import { FormFields } from '../../../components/FormFields';
import { FormFieldTemplate, FormTemplate } from '../../../types/builder.types';
import { Form, Formik, useFormik } from 'formik';
import { generateInitialValues } from '../../../utils/viewer/formik.utils';
import { useEffect, useState } from 'react';

const FormViewer: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState<FormTemplate>();
  const { id } = router.query;

  useEffect(() => {
    const fetchTemplate = async () => {
      const result = await fetch('/api/templates/' + id);
      if (result.ok) {
        const t = await result.json();
        console.log('template', t.body);

        setTemplate(t.body);
        setLoading(false);
      } else {
        setTemplate(undefined);
        setLoading(false);
      }
    };
    if (id) fetchTemplate();
  }, [id]);

  if (template && !loading) {
    return (
      <div className={classes.container}>
        <Head>
          <title>{template.title}</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/form.png' />
        </Head>

        <Formik
          initialValues={generateInitialValues(template)}
          onSubmit={(values) => {
            const entry = JSON.stringify(values, null, 2);
            const res = fetch('/api/entries/' + id, {
              method: 'POST',
              body: entry,
              headers: {
                'Content-Type': 'application/json',
              },
            }).then((res) => {
              if (res.ok) {
                alert('goood :)');
              } else {
                alert('baddd :(');
              }
            });

            // alert(JSON.stringify(values, null, 2));
          }}
        >
          <Form className={classes.form}>
            <header>
              <h1>{template.title}</h1>
            </header>
            <main>
              <FormFields fields={template.fields as FormFieldTemplate[]} />
            </main>
            <footer>
              <button type='submit'>Submit</button>
            </footer>
          </Form>
        </Formik>
      </div>
    );
  } else if (loading) {
    return (
      <div className={classes.fourofour}>
        <Head>
          <title>loading</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <h1>loading...</h1>
      </div>
    );
  } else {
    return (
      <div className={classes.fourofour}>
        <Head>
          <title>404</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <h1>Missing Form 404</h1>
      </div>
    );
  }
};

export default FormViewer;
