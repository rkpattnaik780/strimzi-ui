/*
 * Copyright Strimzi authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */

import React from 'react';
import {
  Grid,
  GridItem,
  PageSection,
  PageGroup,
  JumpLinks,
  JumpLinksItem,
  ActionGroup,
  Button,
  Divider,
} from '@patternfly/react-core';
import '../CreateTopic/CreateTopicWizard.patternfly.css';

import { MessageSection } from './MessageSection.patternfly';
import { CoreConfiguration } from './CoreConfiguration.patternfly';
import { LogSection } from './LogSection.patternfly';
import { ReplicationSection } from './ReplicationSection.patternfly';
import { IndexSection } from './IndexSection.patternfly';
import { FlushSection } from './FlushSection.patternfly';
import { CleanupSection } from './CleanupSection.patternfly';
import { TopicContextProvider } from 'Contexts/Topic';

interface ITopicAdvanceConfig {
  isCreate: boolean;
  saveTopic: () => void;
}

export const TopicAdvanceConfig: React.FunctionComponent<ITopicAdvanceConfig> = ({
  isCreate,
  saveTopic,
}) => {
  const actionText = isCreate === true ? 'Create Topic' : 'Save';

  return (
    <>
      <Grid hasGutter>
        <GridItem span={2} style={{ padding: '30px 30px' }}>
          <JumpLinks
            isVertical
            label='JUMP TO SECTION'
            scrollableSelector='#advanced-create-topic'
            style={{ position: 'absolute' }}
          >
            <JumpLinksItem key={0} href='#core-configuration'>
              Core configuration
            </JumpLinksItem>
            <JumpLinksItem key={1} href='#messages'>
              Messages
            </JumpLinksItem>
            <JumpLinksItem key={2} href='#log'>
              Log
            </JumpLinksItem>
            <JumpLinksItem key={3} href='#replication'>
              Replication
            </JumpLinksItem>
            <JumpLinksItem key={4} href='#cleanup'>
              Cleanup
            </JumpLinksItem>
            <JumpLinksItem key={5} href='#index'>
              Index
            </JumpLinksItem>
            <JumpLinksItem key={6} href='#flush'>
              Flush
            </JumpLinksItem>
          </JumpLinks>
        </GridItem>
        <GridItem span={10} style={{ padding: '30px 30px' }}>
          <div>
            <PageGroup
              hasOverflowScroll
              id='advanced-create-topic'
              className='topics-wizard-content'
            >
              <TopicContextProvider>
                <PageSection>
                  <CoreConfiguration />

                  <MessageSection />

                  <LogSection />

                  <ReplicationSection />

                  <CleanupSection />

                  <IndexSection />

                  <FlushSection />

                  <ActionGroup>
                    <Button onClick={saveTopic} variant='primary'>
                      {actionText}
                    </Button>
                    <Button variant='link'>Cancel</Button>
                  </ActionGroup>
                  <Divider />
                  {isCreate ? <></> : <>Delete Component</>}
                </PageSection>
              </TopicContextProvider>
            </PageGroup>
          </div>
        </GridItem>
      </Grid>
    </>
  );
};
