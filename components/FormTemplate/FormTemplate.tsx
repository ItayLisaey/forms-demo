import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import { BuilderContext } from '../../context/builder.context';
import { EditFields } from '../EditFields';
import classes from './form-template.module.scss';
import {
  faFloppyDisk,
  faRotate,
  faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';

export interface FormTemplateProps {
  id: string | undefined;
}

export const FormTemplate: React.VFC<FormTemplateProps> = ({ id }) => {
  const { form, editId, addField, editTitle, setForm } =
    useContext(BuilderContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      editId(id.toString());
    }
  }, [editId, id]);

  useEffect(() => {
    const fetchTemplate = async () => {
      const res = await fetch('/api/templates/' + id);
      if (res.ok) {
        const { body } = await res.json();
        setForm(body);
      }
      setLoading(false);
    };
    fetchTemplate();
  }, [id, setForm]);

  const handleSave = async () => {
    const template = JSON.stringify(form, null, 2);
    const res = await fetch('/api/templates/' + id, {
      method: 'POST',
      body: template,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      alert('form ok');
    } else {
      alert('form not ok :(');
    }
  };

  if (!loading) {
    return (
      <div className={classes.container}>
        <Head>
          <title>{form.title}</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <header className={classes.header}>
          <input
            type='text'
            placeholder='Form Name'
            value={form.title}
            onChange={(e) => editTitle(e.target.value)}
          />
        </header>
        <main className={classes.main}>
          <EditFields />
        </main>
        <footer className={classes.footer}>
          <button onClick={addField}>
            <FontAwesomeIcon icon={faSquarePlus} />
            <span>Add Field</span>
          </button>
          <div className={classes.more}>
            <button>
              <FontAwesomeIcon icon={faRotate} />
              <span>Reset</span>
            </button>
            <button onClick={handleSave}>
              <FontAwesomeIcon icon={faFloppyDisk} />
              <span>Save</span>
            </button>
          </div>
        </footer>
      </div>
    );
  } else {
    return (
      <div className={classes.container}>
        <Head>
          <title>loading...</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <h1>loading</h1>
      </div>
    );
  }
};
