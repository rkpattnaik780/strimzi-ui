/*
 * Copyright Strimzi authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */
import React, { FunctionComponent } from 'react';
import './style.scss';
import { TopicsList } from '../../Elements/Components/Topics/TopicsList.patternfly';
import { LoggingProvider } from '../../Contexts/Logging';
import { PageSection, PageSectionVariants } from '@patternfly/react-core';

export type FederatedTopicsProps = {
  getApiOpenshiftComToken: () => Promise<string>;
  getToken: () => Promise<string>;
  id: string;
  apiBasePath: string;
  onCreateTopic: () => void;
};

const FederatedTopics: FunctionComponent<FederatedTopicsProps> = ({
  id,
  getApiOpenshiftComToken,
  getToken,
  apiBasePath,
  onCreateTopic,
}) => {

  return (
    <LoggingProvider>
      <PageSection variant={PageSectionVariants.light}>
        <TopicsList onCreateTopic={onCreateTopic} />
      </PageSection>
    </LoggingProvider>
  );
};

export { FederatedTopics };

export default FederatedTopics;
