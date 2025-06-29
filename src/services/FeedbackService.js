class FeedbackService {
  constructor() {
    this.feedbackData = [];
    this.questConfig = {
      QUEST_FEEDBACK_QUESTID: 'c-greta-feedback-workflow',
      USER_ID: 'u-6ae7c6a4-0629-46f5-af15-77d15ec50e1c',
      APIKEY: 'k-aaa16c06-6e6f-42e4-8db2-76b83c09768e',
      ENTITYID: 'e-9e39e7b8-a68b-4a3d-a048-e8d0165a5992'
    };
  }

  // Track feedback interactions
  async trackFeedbackEvent(eventType, data = {}) {
    try {
      const eventData = {
        timestamp: new Date().toISOString(),
        eventType,
        userId: localStorage.getItem('userId') || this.questConfig.USER_ID,
        sessionId: this.getSessionId(),
        ...data
      };

      console.log('Feedback Event Tracked:', eventData);
      
      // In a real implementation, this would be sent to your analytics service
      this.feedbackData.push(eventData);
      
      return { success: true, eventData };
    } catch (error) {
      console.error('Failed to track feedback event:', error);
      return { success: false, error: error.message };
    }
  }

  // Get feedback analytics
  async getFeedbackAnalytics() {
    try {
      const analytics = {
        totalFeedbacks: this.feedbackData.length,
        feedbacksByType: this.groupBy(this.feedbackData, 'eventType'),
        recentFeedbacks: this.feedbackData.slice(-10),
        averageRating: this.calculateAverageRating(),
        completionRate: this.calculateCompletionRate()
      };

      return analytics;
    } catch (error) {
      console.error('Failed to get feedback analytics:', error);
      throw error;
    }
  }

  // Submit feedback to Questera
  async submitFeedback(feedbackData) {
    try {
      await this.trackFeedbackEvent('feedback_submitted', feedbackData);
      
      // Here you would integrate with Questera's API
      console.log('Feedback submitted to Questera:', feedbackData);
      
      return { success: true, message: 'Feedback submitted successfully' };
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      return { success: false, error: error.message };
    }
  }

  // Helper methods
  getSessionId() {
    let sessionId = sessionStorage.getItem('feedbackSessionId');
    if (!sessionId) {
      sessionId = 'feedback_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('feedbackSessionId', sessionId);
    }
    return sessionId;
  }

  groupBy(array, key) {
    return array.reduce((result, item) => {
      const group = item[key];
      if (!result[group]) {
        result[group] = [];
      }
      result[group].push(item);
      return result;
    }, {});
  }

  calculateAverageRating() {
    const ratings = this.feedbackData
      .filter(item => item.rating)
      .map(item => item.rating);
    
    if (ratings.length === 0) return 0;
    
    return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
  }

  calculateCompletionRate() {
    const started = this.feedbackData.filter(item => item.eventType === 'feedback_started').length;
    const completed = this.feedbackData.filter(item => item.eventType === 'feedback_submitted').length;
    
    if (started === 0) return 0;
    
    return (completed / started) * 100;
  }
}

export const feedbackService = new FeedbackService();