// @flow strict
import React from 'react';
import styles from './Banner.module.scss';

type Props = {
  bannerType: string
};

const Banner = ({ bannerType, children }: Props) => {
  return (
    <div className={bannerType == 'success' ? styles['success'] : styles['error']}>
      { children }
    </div>
  )
};

export default Banner;
