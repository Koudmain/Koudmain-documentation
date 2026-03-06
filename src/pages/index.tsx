import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          Koudmain DevCenter
        </Heading>
        <p className={styles.heroSubtitle}>
          Internal Technical Documentation
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx("button button--lg", styles.buttonPrimary)}
            to="/docs/intro"
          >
            Explore Documentation
          </Link>
          <Link
            className={clsx("button button--lg", styles.buttonOutline)}
            href="https://github.com/Koudmain"
          >
            GitHub Organization
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title={`Home`}
      description="Internal technical documentation for the Koudmain development team."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
