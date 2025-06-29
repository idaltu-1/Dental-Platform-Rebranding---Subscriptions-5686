import React from 'react';
import { QuestProvider } from '@questlabs/react-sdk';
import { questConfig } from '../../config/questConfig';

function FeedbackProvider({ children }) {
  return (
    <QuestProvider
      apiKey={questConfig.APIKEY}
      entityId={questConfig.ENTITYID}
      apiType="PRODUCTION"
      themeConfig={{
        primaryColor: questConfig.PRIMARY_COLOR,
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      {children}
    </QuestProvider>
  );
}

export default FeedbackProvider;