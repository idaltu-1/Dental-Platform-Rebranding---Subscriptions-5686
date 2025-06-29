class NotificationService {
  constructor() {
    this.notifications = [];
    this.subscribers = new Set();
    this.initializeMockData();
  }

  initializeMockData() {
    this.notifications = [
      {
        id: '1',
        type: 'referral',
        title: 'New Referral Received',
        message: 'Dr. Smith has referred John Doe for endodontic consultation',
        priority: 'high',
        isRead: false,
        createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        userId: 'current-user',
        metadata: {
          referralId: 'ref-123',
          patientName: 'John Doe',
          referringDoctor: 'Dr. Smith'
        }
      },
      {
        id: '2',
        type: 'appointment',
        title: 'Appointment Confirmed',
        message: 'Sarah Johnson confirmed her appointment for tomorrow at 2:00 PM',
        priority: 'normal',
        isRead: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        userId: 'current-user',
        metadata: {
          appointmentId: 'apt-456',
          patientName: 'Sarah Johnson'
        }
      },
      {
        id: '3',
        type: 'insurance',
        title: 'Insurance Verification Complete',
        message: 'Insurance verified for Michael Wilson - coverage confirmed',
        priority: 'normal',
        isRead: true,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        userId: 'current-user',
        metadata: {
          patientName: 'Michael Wilson',
          insuranceProvider: 'Blue Cross'
        }
      },
      {
        id: '4',
        type: 'document',
        title: 'Document Uploaded',
        message: 'New X-ray images uploaded for Emma Davis',
        priority: 'low',
        isRead: true,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        userId: 'current-user',
        metadata: {
          documentType: 'X-ray',
          patientName: 'Emma Davis'
        }
      }
    ];

    // Simulate real-time notifications
    this.startMockNotifications();
  }

  startMockNotifications() {
    setInterval(() => {
      if (Math.random() > 0.8) { // 20% chance every 30 seconds
        this.generateMockNotification();
      }
    }, 30000);
  }

  generateMockNotification() {
    const types = ['referral', 'appointment', 'insurance', 'document', 'system'];
    const priorities = ['low', 'normal', 'high'];
    
    const type = types[Math.floor(Math.random() * types.length)];
    const priority = priorities[Math.floor(Math.random() * priorities.length)];

    const mockNotifications = {
      referral: [
        'New urgent referral received',
        'Referral status updated',
        'Referral appointment scheduled'
      ],
      appointment: [
        'Appointment reminder sent',
        'Appointment cancelled by patient',
        'New appointment scheduled'
      ],
      insurance: [
        'Insurance verification pending',
        'Pre-authorization approved',
        'Insurance claim processed'
      ],
      document: [
        'Lab results uploaded',
        'Treatment photos added',
        'Consent form signed'
      ],
      system: [
        'System backup completed',
        'Software update available',
        'Maintenance scheduled'
      ]
    };

    const messages = mockNotifications[type];
    const message = messages[Math.floor(Math.random() * messages.length)];

    const notification = {
      id: Date.now().toString(),
      type,
      title: message,
      message: `${message} - ${new Date().toLocaleTimeString()}`,
      priority,
      isRead: false,
      createdAt: new Date(),
      userId: 'current-user',
      metadata: {}
    };

    this.addNotification(notification);
  }

  async getNotifications(userId = 'current-user', limit = 50) {
    await this.simulateDelay(300);
    return this.notifications
      .filter(n => n.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  }

  async getRecentNotifications(limit = 10) {
    await this.simulateDelay(200);
    return this.notifications
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  }

  async markAsRead(notificationId) {
    await this.simulateDelay(200);
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
      notification.readAt = new Date();
    }
    return notification;
  }

  async markAllAsRead(userId = 'current-user') {
    await this.simulateDelay(400);
    const readAt = new Date();
    this.notifications
      .filter(n => n.userId === userId && !n.isRead)
      .forEach(n => {
        n.isRead = true;
        n.readAt = readAt;
      });
    return true;
  }

  async deleteNotification(notificationId) {
    await this.simulateDelay(200);
    const index = this.notifications.findIndex(n => n.id === notificationId);
    if (index > -1) {
      this.notifications.splice(index, 1);
      return true;
    }
    return false;
  }

  async createNotification(notificationData) {
    await this.simulateDelay(300);
    const notification = {
      id: Date.now().toString(),
      ...notificationData,
      isRead: false,
      createdAt: new Date()
    };
    this.addNotification(notification);
    return notification;
  }

  addNotification(notification) {
    this.notifications.unshift(notification);
    
    // Notify subscribers
    this.subscribers.forEach(callback => {
      try {
        callback(notification);
      } catch (error) {
        console.error('Notification subscriber error:', error);
      }
    });
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.unsubscribe(callback);
  }

  unsubscribe(callback) {
    this.subscribers.delete(callback);
  }

  getUnreadCount(userId = 'current-user') {
    return this.notifications.filter(n => n.userId === userId && !n.isRead).length;
  }

  simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const notificationService = new NotificationService();