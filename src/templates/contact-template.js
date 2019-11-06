// @flow strict
import React from 'react';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import Contact from '../components/Contact';
import { useSiteMetadata } from '../hooks';
import type { MarkdownRemark } from '../types';

type Props = {
  data: {
    markdownRemark: MarkdownRemark
  }
};

const ContactTemplate = ({ data }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { html: pageBody } = data.markdownRemark;
  const { frontmatter } = data.markdownRemark;
  const { title: pageTitle, description: pageDescription, socialImage } = frontmatter;
  const metaDescription = pageDescription !== null ? pageDescription : siteSubtitle;

  return (
    <Layout title={`${pageTitle} - ${siteTitle}`} description={metaDescription} socialImage={socialImage} >
      <Sidebar />
      <Page title={pageTitle}>
        <h2>Got a project to discuss? Want to grab a coffee?</h2>
        <Contact />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query contactPage($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date
        description
        socialImage
      }
    }
  }
`;

export default ContactTemplate;
