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
  TextContent,
  TextVariants,
  Text
} from '@patternfly/react-core';
import '../CreateTopic/CreateTopicWizard.patternfly.css';

import { MessageSection } from './MessageSection.patternfly';
import { CoreConfiguration } from './CoreConfiguration.patternfly';
import { LogSection } from './LogSection.patternfly';
import { ReplicationSection } from './ReplicationSection.patternfly';
import { IndexSection } from './IndexSection.patternfly';
import { FlushSection } from './FlushSection.patternfly';
import { CleanupSection } from './CleanupSection.patternfly';
import { AdvancedTopic, TopicContext } from '../../../Contexts/Topic';
import { DefaultApi, NewTopicInput } from '../../../OpenApi/api';

interface ITopicAdvanceConfig {
  isCreate: boolean;
  saveTopic: () => void;
}

export const TopicAdvanceConfig: React.FunctionComponent<ITopicAdvanceConfig> = ({
  isCreate,
  saveTopic,
}) => {
  const actionText = isCreate === true ? 'Create Topic' : 'Save';
  const { store } = React.useContext(TopicContext);

  const unitsToMilliSecond = {
    "milliseconds": 1,
    "millisecond": 1,
    "second": 1000,
    "day": 86400000,
    "month": 2592000000,
    "year": 31536000000
  };

  interface keyValPair {
    key: string;
    value: string;
  }

  const formatTopicRequest = (topic: AdvancedTopic): NewTopicInput => {
    const { name, numPartitions, replicationFactor, ...rest } = topic;

    let responseBody: keyValPair[] = []

    for (const key in rest) {
      if (key) {
        responseBody.push({
          key,
          value: rest[key].toString()
        })
      }

    }

    return {
      name,
      settings: {
        numPartitions: Number(numPartitions),
        replicationFactor: Number(replicationFactor),
        config: responseBody
      }
    }


  }

  const convertUnits = (topic2: AdvancedTopic) => {

    let topic = { ...topic2 };

    for (const key in topic) {
      if (key.split(".").pop() === "ms") {
        topic[key] = String(Number(topic[key]) * unitsToMilliSecond[topic[`${key}.unit`] || "millisecond"])
      }
      if (key.split(".").pop() === "bytes") {
        topic[key] = String(Number(topic[key]) * unitsToBytes[topic[`${key}.unit`] || "bytes"])
      }
    }

    if (topic['flush.messages']) {
      topic['flush.messages'] = String(Number(topic['flush.messages']) * unitsToMilliSecond[topic['flush.messages.unit'] || "millisecond"])
    }

    for (const key in topic) {
      if (key.split(".").pop() === "unit") {
        delete topic[key];
      }
    }

    console.log(topic);

    return topic;
  }

  const unitsToBytes = {
    'bytes': 1,
    'kilobytes': 1000,
    'megabytes': 1000000,
    'gigabytes': 1000000000,
    'terabytes': 1000000000000,
  }

  // TODO: Handle saving advanced topics at a higher level

  const saveTopic2 = () => {
    const x = convertUnits(store);
    console.log(formatTopicRequest(x));
    new DefaultApi().createTopic(formatTopicRequest(x)).then(res => {
      if (res.status === 200) {
        console.log(res.data);
      }
      // closeWizard();
    })
  }

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
            {isCreate ? (
              <></>
            ) : (
              <JumpLinksItem key={7} href='#delete'>
                Delete
              </JumpLinksItem>
            )}
          </JumpLinks>
        </GridItem>
        <GridItem span={10} style={{ padding: '30px 30px' }}>
          <div>
            <PageGroup
              hasOverflowScroll
              id='advanced-create-topic'
              className='topics-wizard-content'
            >
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

                {isCreate ? (
                  <></>
                ) : (
                  <>
                    <br />
                    <Divider />
                    <br />
                    <br />
                    <TextContent className='section-margin'>
                      <Text
                        component={TextVariants.h2}
                        tabIndex={-1}
                        id='delete'
                      >
                        Delete topic (irreversible)
                      </Text>
                      <Text component={TextVariants.p}>
                        This permanently removes this topic from this instance
                        of Strimzi. Applications will no longer have access to
                        this topic.
                      </Text>
                    </TextContent>
                    <br />
                    <Button variant='danger' className='section-margin'>
                      Delete topic
                    </Button>
                  </>
                )}
              </PageSection>
            </PageGroup>
          </div>
        </GridItem>
      </Grid>
    </>
  );
};
