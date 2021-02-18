/*
 * Copyright Strimzi authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */
import React, { FunctionComponent } from 'react';
import './style.scss';
import { LoggingProvider } from '../../Contexts/Logging';
import { PageSection, PageSectionVariants } from '@patternfly/react-core';
import { CreateTopicWizard } from '../../Elements/Components/CreateTopic/CreateTopicWizard.patternfly';

export type FederatedCreateTopicProps = {
  getApiOpenshiftComToken: () => Promise<string>;
  getToken: () => Promise<string>;
  id: string;
  apiBasePath: string;
  onCloseCreateTopic: () => void;
};

const FederatedCreateTopic: FunctionComponent<FederatedCreateTopicProps> = ({
  id,
  getApiOpenshiftComToken,
  getToken,
  apiBasePath,
  onCloseCreateTopic,
}) => {
  const setIsCreateTopic = (b: boolean) => {
    if (!b) {
      onCloseCreateTopic();
    }
  };

  return (
    <LoggingProvider>
      <PageSection variant={PageSectionVariants.light}>
        <CreateTopicWizard setIsCreateTopic={setIsCreateTopic} />
      </PageSection>
    </LoggingProvider>
  );
};

export { FederatedCreateTopic };

export default FederatedCreateTopic;
