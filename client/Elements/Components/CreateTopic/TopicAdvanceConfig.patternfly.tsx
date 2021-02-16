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
import { AdvancedTopic2, TopicContext } from 'Contexts/Topic';
import { DefaultApi, NewTopicInput } from 'OpenApi/api';

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
    "milliseconds" : 1,
    "millisecond" : 1,
    "second": 1000,
    "day": 86400000,
    "month": 2592000000,
    "year": 31536000000
  };

  interface keyValPair{
    key: string;
    value: string;
  }

  const formatTopicRequest = (topic: AdvancedTopic2): NewTopicInput => {
    const { name, numPartitions, replicationFactor, ...rest} = topic;

    let responseBody: keyValPair[] = []

    for(const key in rest){
      if(key){
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

  const convertUnits = (topic2: AdvancedTopic2) => {

    let topic = {...topic2};
    
    if(topic['retention.ms']){
      topic['retention.ms'] = String(Number(topic['retention.ms']) * unitsToMilliSecond[topic.retentionTimeUnit || "millisecond"])
    }
    if(topic['message.timestamp.difference.max.ms']){
      topic['message.timestamp.difference.max.ms'] = String(Number(topic['message.timestamp.difference.max.ms']) * unitsToMilliSecond[topic.timestampDiffUnit || "millisecond"])
    }
    if(topic['delete.retention.ms']){
      topic['delete.retention.ms'] = String(Number(topic['delete.retention.ms']) * unitsToMilliSecond[topic.deleteRetentionUnit || "millisecond"])
    }
    if(topic['min.compaction.lag.ms']){
      topic['min.compaction.lag.ms'] = String(Number(topic['min.compaction.lag.ms']) * unitsToMilliSecond[topic.minLagUnit || "millisecond"])
    }
    if(topic['segment.ms']){
      topic['segment.ms'] = String(Number(topic['segment.ms']) * unitsToMilliSecond[topic.segmentTimeUnit || "millisecond"])
    }
    if(topic['segment.jitter.ms']){
      topic['segment.jitter.ms'] = String(Number(topic['segment.jitter.ms']) * unitsToMilliSecond[topic.jitterTimeUnit || "millisecond"])
    }
    if(topic['file.delete.delay.ms']){
      topic['file.delete.delay.ms'] = String(Number(topic['file.delete.delay.ms']) * unitsToMilliSecond[topic.deleteDelayUnit || "millisecond"])
    }
    if(topic['flush.messages']){
      topic['flush.messages'] = String(Number(topic['flush.messages']) * unitsToMilliSecond[topic.intervalMessagesUnit || "millisecond"])
    }
    if(topic['flush.ms']){
      topic['flush.ms'] = String(Number(topic['flush.ms']) * unitsToMilliSecond[topic.intervalTimeUnit || "millisecond"])
    }


    if(topic['max.message.bytes']){
      topic['max.message.bytes'] = String(Number(topic['max.message.bytes']) * unitsToBytes[topic.messageSizeUnit || "bytes"])
    }
    if(topic['log.retention.bytes']){
      topic['log.retention.bytes'] = String(Number(topic['log.retention.bytes']) * unitsToBytes[topic.retentionUnit || "bytes"])
    }
    if(topic['index.interval.bytes']){
      topic['index.interval.bytes'] = String(Number(topic['index.interval.bytes']) * unitsToBytes[topic.indexIntervalUnit || "bytes"])
    }
    if(topic['segment.index.bytes']){
      topic['segment.index.bytes'] = String(Number(topic['segment.index.bytes']) * unitsToBytes[topic.segmentIndexUnit || "bytes"])
    }

    delete topic.retentionTimeUnit;
    delete topic.timestampDiffUnit;
    delete topic.deleteRetentionUnit;
    delete topic.minLagUnit;
    delete topic.segmentTimeUnit;
    delete topic.jitterTimeUnit;
    delete topic.deleteDelayUnit;
    delete topic.intervalMessagesUnit;
    delete topic.intervalTimeUnit;

    delete topic.messageSizeUnit;
    delete topic.retentionUnit;
    delete topic.indexIntervalUnit;
    delete topic.segmentIndexUnit;

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

  const saveTopic2 = () => {
    const x = convertUnits(store);
    console.log(formatTopicRequest(x));
    new DefaultApi().createTopic(formatTopicRequest(x)).then(res => {
        if(res.status === 200){
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
          </JumpLinks>
        </GridItem>
        <GridItem span={10} style={{ padding: '30px 30px' }}>
          <div>
            <PageGroup
              hasOverflowScroll
              id='advanced-create-topic'
              className='topics-wizard-content'
            >
              {/* <TopicContextProvider> */}
                <PageSection>
                  <CoreConfiguration />

                  <MessageSection />

                  <LogSection />

                  <ReplicationSection />

                  <CleanupSection />

                  <IndexSection />

                  <FlushSection />

                  <ActionGroup>
                    <Button onClick={saveTopic2} variant='primary'>
                      {actionText}
                    </Button>
                    <Button variant='link'>Cancel</Button>
                  </ActionGroup>
                  <Divider />
                  {isCreate ? <></> : <>Delete Component</>}
                </PageSection>
              {/* </TopicContextProvider> */}
            </PageGroup>
          </div>
        </GridItem>
      </Grid>
    </>
  );
};
