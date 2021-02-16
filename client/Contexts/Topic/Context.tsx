/*
 * Copyright Strimzi authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */
import React, { createContext, useState } from 'react';
import {
  AdvancedTopic,
  AdvancedTopic2,
  ITopicProviderProps,
  TopicContextProp,
} from './Topic.types';

const initialState: AdvancedTopic2 = {
  name: 'SampleTopic2345',
  numPartitions: '52',
  replicationFactor: '35',
  'min.insync.replicas': '78',
  'retention.ms': '78',
  retentionTimeUnit: 'days',
  'max.message.bytes': '50',
  messageSizeUnit: 'bytes',
  'message.timestamp.type': 'CreateTime',
  'message.timestamp.difference.max.ms': '4',
  timestampDiffUnit: 'milliseconds',
  'compression.type': 'Producer',
  'log.cleanup.policy': 'Delete',
  'log.retention.bytes': '-1',
  retentionUnit: 'byte',
  'log.segment.bytes': '78',
  segmentUnit: 'bytes',
  'unclean.leader.election.enable': 'false',
  'follower.replication.throttled.replicas': '',
  'leader.replication.throttled.replicas': '',
  'delete.retention.ms': '789',
  deleteRetentionUnit: 'milliseconds',
  'min.cleanable.dirty.ratio': '4',
  'min.compaction.lag.ms': '58',
  minLagUnit: 'milliseconds',
  'segment.ms': '6048000',
  segmentTimeUnit: 'milliseconds',
  'segment.jitter.ms': '0',
  jitterTimeUnit: 'milliseconds',
  'file.delete.delay.ms': '6000',
  deleteDelayUnit: 'milliseconds',
  preallocate: 'true',
  'index.interval.bytes': '4096',
  indexIntervalUnit: 'bytes',
  'segment.index.bytes': '10847560',
  segmentIndexUnit: 'bytes',
  'flush.messages': '783945',
  intervalMessagesUnit: 'milliseconds',
  'flush.ms': '3894949',
  intervalTimeUnit: 'milliseconds',
};

export const TopicContext = createContext({} as TopicContextProp);

export const TopicContextProvider: React.FC<ITopicProviderProps> = ({
  children,
}) => {
  const [store, setStore] = useState<AdvancedTopic2>(initialState);

  const updateStore = (name: string, value: string | boolean | number) => {
    setStore({
      ...store,
      [name]: value,
    });
  };

  return (
    <TopicContext.Provider value={{ store, updateStore }}>
      {children}
    </TopicContext.Provider>
  );
};
