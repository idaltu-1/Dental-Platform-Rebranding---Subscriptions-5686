class AutomationService {
  constructor() {
    this.webhookEndpoint = process.env.REACT_APP_WEBHOOK_ENDPOINT || 'https://api.refer.dental/webhooks';
    this.apiKey = process.env.REACT_APP_API_KEY || 'demo-api-key';
  }

  // n8n Workflow Integration
  async triggerN8nWorkflow(workflowId, data) {
    try {
      const payload = {
        workflowId,
        data: await this.sanitizeData(data),
        timestamp: new Date().toISOString(),
        source: 'refer.dental'
      };

      // Simulate n8n webhook call
      console.log('N8n Workflow Triggered:', payload);
      
      return { success: true, workflowId, data: payload };
    } catch (error) {
      console.error('N8n workflow trigger failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Zapier Integration
  async triggerZapierZap(zapId, data) {
    try {
      const payload = {
        ...await this.sanitizeData(data),
        source: 'refer.dental',
        timestamp: new Date().toISOString()
      };

      console.log('Zapier Zap Triggered:', { zapId, payload });
      
      return { success: true, zapId, response: payload };
    } catch (error) {
      console.error('Zapier zap trigger failed:', error);
      return { error: error.message };
    }
  }

  // Make.com Integration
  async triggerMakeScenario(scenarioId, data) {
    try {
      const payload = {
        ...await this.sanitizeData(data),
        source: 'refer.dental',
        timestamp: new Date().toISOString()
      };

      console.log('Make Scenario Triggered:', { scenarioId, payload });
      
      return { success: true, scenarioId, response: payload };
    } catch (error) {
      console.error('Make scenario trigger failed:', error);
      return { error: error.message };
    }
  }

  // Lindy.ai Integration
  async triggerLindyWorkflow(workflowId, data) {
    try {
      const payload = {
        ...await this.sanitizeData(data),
        source: 'refer.dental',
        timestamp: new Date().toISOString()
      };

      console.log('Lindy Workflow Triggered:', { workflowId, payload });
      
      return { success: true, workflowId, response: payload };
    } catch (error) {
      console.error('Lindy workflow trigger failed:', error);
      return { error: error.message };
    }
  }

  // GoHighLevel Integration
  async triggerGHLWorkflow(workflowId, data) {
    try {
      const payload = {
        ...await this.sanitizeData(data),
        source: 'refer.dental',
        timestamp: new Date().toISOString()
      };

      console.log('GHL Workflow Triggered:', { workflowId, payload });
      
      return { success: true, workflowId, response: payload };
    } catch (error) {
      console.error('GHL workflow trigger failed:', error);
      return { error: error.message };
    }
  }

  // Webhook Catalog
  getWebhookCatalog() {
    return {
      'referral.created': {
        description: 'Triggered when a new referral is created',
        payload: {
          referralId: 'string',
          patientName: 'string',
          referringDoctor: 'string',
          specialistDoctor: 'string',
          urgency: 'string',
          notes: 'string',
          createdAt: 'datetime'
        }
      },
      'clinical_note.created': {
        description: 'Triggered when a clinical note is created',
        payload: {
          noteId: 'string',
          patientId: 'string',
          authorId: 'string',
          type: 'string',
          status: 'string',
          createdAt: 'datetime'
        }
      }
    };
  }

  async sanitizeData(data) {
    const sanitized = { ...data };
    
    // Remove sensitive fields
    const sensitiveFields = ['ssn', 'dateOfBirth', 'fullPhoneNumber', 'fullAddress'];
    sensitiveFields.forEach(field => {
      if (sanitized[field]) {
        delete sanitized[field];
      }
    });

    return sanitized;
  }
}

export const automationService = new AutomationService();