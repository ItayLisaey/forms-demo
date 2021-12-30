import { faFileLines } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import { FormTemplate } from '../../types/builder.types';
import classes from './form-card.module.scss';

export interface FormCardProps {
  form: FormTemplate;
}

export const FormCard: React.VFC<FormCardProps> = ({ form }) => {
  const path = '/builder/' + form.id;
  return (
    <article className={classes.container}>
      <Link href={path}>
        <a className={classes.link}>
          <FontAwesomeIcon icon={faFileLines} />
        </a>
      </Link>
      <div className={classes.info}>
        <h3>{form.title}</h3>
      </div>
    </article>
  );
};
