import { encryptionService } from './EncryptionService';

class ReferralService {
  constructor() {
    this.referrals = [];
    this.referralTemplates = [];
    this.communications = [];
    this.documents = [];
    this.initializeMockData();
  }

  initializeMockData() {
    // Initialize referral templates
    this.referralTemplates = [
      {
        id: 'template_endodontics',
        name: 'Endodontics Referral',
        type: 'Endodontics',
        urgency: 'high',
        notes: 'Root canal evaluation needed. Patient experiencing pain.',
        symptoms: 'Tooth pain, sensitivity to cold/hot',
        requiredFields: ['patientName', 'patientPhone', 'symptoms', 'toothNumber']
      },
      {
        id: 'template_oral_surgery',
        name: 'Oral Surgery Referral',
        type: 'Oral Surgery',
        urgency: 'normal',
        notes: 'Surgical evaluation required.',
        symptoms: 'Extraction needed, impacted tooth',
        requiredFields: ['patientName', 'patientPhone', 'symptoms', 'medicalHistory']
      },
      {
        id: 'template_periodontics',
        name: 'Periodontics Referral',
        type: 'Periodontics',
        urgency: 'normal',
        notes: 'Gum disease evaluation and treatment.',
        symptoms: 'Gum bleeding, recession, pocket depth',
        requiredFields: ['patientName', 'patientPhone', 'symptoms', 'probingDepths']
      }
    ];

    // Initialize mock referrals with enhanced data
    this.referrals = [
      {
        id: 'REF-001',
        patientName: 'John Smith',
        patientEmail: 'john.smith@email.com',
        patientPhone: '(555) 123-4567',
        patientAddress: '123 Main St, Springfield, IL',
        patientDateOfBirth: '1985-06-15',
        referringDoctor: 'Dr. Sarah Wilson',
        referringPractice: 'Springfield Family Dentistry',
        specialist: 'Dr. Michael Chen',
        specialistPractice: 'Advanced Endodontics',
        type: 'Endodontics',
        status: 'pending',
        priority: 'high',
        urgency: 'high',
        date: '2024-01-15',
        notes: 'Root canal evaluation needed. Patient experiencing severe pain.',
        symptoms: 'Severe tooth pain, sensitivity to cold',
        preferredDate: '2024-02-01',
        insurance: 'Blue Cross Blue Shield',
        insurancePolicyNumber: 'BC123456789',
        medicalHistory: 'Diabetes, Hypertension',
        medications: 'Metformin, Lisinopril',
        toothNumber: '14',
        attachments: ['xray_001.jpg', 'medical_history.pdf'],
        communicationCount: 2,
        lastCommunication: '2024-01-16T10:30:00Z',
        estimatedCost: 1200.00,
        preAuthRequired: true,
        followUpRequired: true,
        createdAt: '2024-01-15T09:00:00Z',
        updatedAt: '2024-01-16T10:30:00Z'
      },
      {
        id: 'REF-002',
        patientName: 'Emma Davis',
        patientEmail: 'emma.davis@email.com',
        patientPhone: '(555) 987-6543',
        patientAddress: '456 Oak Ave, Springfield, IL',
        patientDateOfBirth: '1992-03-22',
        referringDoctor: 'Dr. Robert Taylor',
        referringPractice: 'Oak Street Dental',
        specialist: 'Dr. Lisa Anderson',
        specialistPractice: 'Surgical Associates',
        type: 'Oral Surgery',
        status: 'accepted',
        priority: 'normal',
        urgency: 'normal',
        date: '2024-01-18',
        notes: 'Wisdom tooth extraction required',
        symptoms: 'Impacted wisdom tooth causing discomfort',
        preferredDate: '2024-02-05',
        insurance: 'Aetna',
        insurancePolicyNumber: 'AE987654321',
        medicalHistory: 'No significant medical history',
        medications: 'None',
        toothNumber: '32',
        attachments: ['panoramic_xray.jpg'],
        communicationCount: 1,
        lastCommunication: '2024-01-18T14:20:00Z',
        estimatedCost: 800.00,
        preAuthRequired: false,
        followUpRequired: false,
        appointmentScheduled: true,
        appointmentDate: '2024-02-05T10:00:00Z',
        createdAt: '2024-01-18T08:30:00Z',
        updatedAt: '2024-01-18T14:20:00Z'
      },
      {
        id: 'REF-003',
        patientName: 'Michael Wilson',
        patientEmail: 'mike.wilson@email.com',
        patientPhone: '(555) 456-7890',
        patientAddress: '789 Pine St, Springfield, IL',
        patientDateOfBirth: '1978-11-08',
        referringDoctor: 'Dr. Jennifer Brown',
        referringPractice: 'Pine Street Dental Care',
        specialist: 'Dr. David Lee',
        specialistPractice: 'Periodontal Specialists',
        type: 'Periodontics',
        status: 'completed',
        priority: 'normal',
        urgency: 'normal',
        date: '2024-01-20',
        notes: 'Gum disease treatment completed successfully',
        symptoms: 'Gum bleeding and recession',
        preferredDate: '2024-01-25',
        insurance: 'Cigna',
        insurancePolicyNumber: 'CG555666777',
        medicalHistory: 'Smoking history',
        medications: 'None',
        toothNumber: 'Multiple',
        attachments: ['perio_chart.pdf', 'treatment_plan.pdf'],
        communicationCount: 4,
        lastCommunication: '2024-01-25T16:45:00Z',
        estimatedCost: 2500.00,
        preAuthRequired: true,
        followUpRequired: true,
        appointmentScheduled: true,
        appointmentDate: '2024-03-01T09:00:00Z',
        treatmentCompleted: true,
        outcomeNotes: 'Treatment successful, patient responding well',
        createdAt: '2024-01-20T10:15:00Z',
        updatedAt: '2024-01-25T16:45:00Z'
      }
    ];

    // Initialize mock communications
    this.communications = [
      {
        id: 'COMM-001',
        referralId: 'REF-001',
        from: 'Dr. Sarah Wilson',
        to: 'Dr. Michael Chen',
        message: 'Patient experiencing severe pain. Please prioritize this case.',
        timestamp: '2024-01-15T10:30:00Z',
        type: 'urgent',
        attachments: []
      },
      {
        id: 'COMM-002',
        referralId: 'REF-001',
        from: 'Dr. Michael Chen',
        to: 'Dr. Sarah Wilson',
        message: 'Reviewed case. Can see patient tomorrow at 2 PM.',
        timestamp: '2024-01-16T08:15:00Z',
        type: 'response',
        attachments: []
      }
    ];
  }

  // Referral CRUD operations
  async getAllReferrals() {
    await this.simulateDelay(500);
    return [...this.referrals].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async getReferralById(id) {
    await this.simulateDelay(300);
    return this.referrals.find(referral => referral.id === id);
  }

  async createReferral(referralData) {
    await this.simulateDelay(800);
    
    const newReferral = {
      id: `REF-${String(Date.now()).slice(-3).padStart(3, '0')}`,
      ...referralData,
      status: 'pending',
      priority: referralData.priority || 'normal',
      communicationCount: 0,
      attachments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.referrals.unshift(newReferral);
    await this.logAuditEvent('referral_created', newReferral.id);
    
    return newReferral;
  }

  async updateReferral(id, updates) {
    await this.simulateDelay(600);
    
    const index = this.referrals.findIndex(referral => referral.id === id);
    if (index !== -1) {
      this.referrals[index] = { 
        ...this.referrals[index], 
        ...updates, 
        updatedAt: new Date().toISOString() 
      };
      await this.logAuditEvent('referral_updated', id);
      return this.referrals[index];
    }
    throw new Error('Referral not found');
  }

  async updateReferralStatus(id, status, notes = '') {
    await this.simulateDelay(400);
    
    const referral = await this.getReferralById(id);
    if (!referral) throw new Error('Referral not found');

    const updates = {
      status,
      updatedAt: new Date().toISOString()
    };

    if (notes) {
      updates.statusNotes = notes;
    }

    if (status === 'completed') {
      updates.completedAt = new Date().toISOString();
    }

    return this.updateReferral(id, updates);
  }

  async deleteReferral(id) {
    await this.simulateDelay(400);
    
    const index = this.referrals.findIndex(referral => referral.id === id);
    if (index !== -1) {
      this.referrals.splice(index, 1);
      await this.logAuditEvent('referral_deleted', id);
      return true;
    }
    throw new Error('Referral not found');
  }

  // Communication methods
  async getReferralCommunications(referralId) {
    await this.simulateDelay(300);
    return this.communications.filter(comm => comm.referralId === referralId);
  }

  async addCommunication(referralId, communicationData) {
    await this.simulateDelay(400);
    
    const newCommunication = {
      id: `COMM-${String(Date.now()).slice(-3).padStart(3, '0')}`,
      referralId,
      ...communicationData,
      timestamp: new Date().toISOString()
    };

    this.communications.push(newCommunication);
    
    // Update referral communication count
    const referral = this.referrals.find(r => r.id === referralId);
    if (referral) {
      referral.communicationCount = (referral.communicationCount || 0) + 1;
      referral.lastCommunication = newCommunication.timestamp;
    }

    await this.logAuditEvent('communication_added', referralId);
    return newCommunication;
  }

  // Template methods
  async getReferralTemplates() {
    await this.simulateDelay(200);
    return this.referralTemplates;
  }

  async createReferralFromTemplate(templateId, patientData) {
    await this.simulateDelay(500);
    
    const template = this.referralTemplates.find(t => t.id === templateId);
    if (!template) throw new Error('Template not found');

    const referralData = {
      ...patientData,
      type: template.type,
      urgency: template.urgency,
      notes: template.notes,
      symptoms: template.symptoms
    };

    return this.createReferral(referralData);
  }

  // Analytics methods
  async getReferralAnalytics() {
    await this.simulateDelay(600);
    
    const total = this.referrals.length;
    const pending = this.referrals.filter(r => r.status === 'pending').length;
    const accepted = this.referrals.filter(r => r.status === 'accepted').length;
    const completed = this.referrals.filter(r => r.status === 'completed').length;
    const declined = this.referrals.filter(r => r.status === 'declined').length;

    const byType = this.referrals.reduce((acc, referral) => {
      acc[referral.type] = (acc[referral.type] || 0) + 1;
      return acc;
    }, {});

    const byUrgency = this.referrals.reduce((acc, referral) => {
      acc[referral.urgency] = (acc[referral.urgency] || 0) + 1;
      return acc;
    }, {});

    const avgResponseTime = this.calculateAverageResponseTime();
    const completionRate = total > 0 ? (completed / total * 100).toFixed(1) : 0;

    return {
      total,
      pending,
      accepted,
      completed,
      declined,
      byType,
      byUrgency,
      avgResponseTime,
      completionRate
    };
  }

  calculateAverageResponseTime() {
    const respondedReferrals = this.referrals.filter(r => 
      r.status !== 'pending' && r.lastCommunication
    );
    
    if (respondedReferrals.length === 0) return 0;

    const totalTime = respondedReferrals.reduce((acc, referral) => {
      const created = new Date(referral.createdAt);
      const responded = new Date(referral.lastCommunication);
      return acc + (responded - created);
    }, 0);

    return Math.round(totalTime / respondedReferrals.length / (1000 * 60 * 60)); // hours
  }

  // Search and filter methods
  async searchReferrals(query, filters = {}) {
    await this.simulateDelay(400);
    
    let results = this.referrals;

    // Text search
    if (query) {
      const searchLower = query.toLowerCase();
      results = results.filter(referral => 
        referral.patientName.toLowerCase().includes(searchLower) ||
        referral.id.toLowerCase().includes(searchLower) ||
        referral.referringDoctor.toLowerCase().includes(searchLower) ||
        referral.specialist.toLowerCase().includes(searchLower) ||
        referral.type.toLowerCase().includes(searchLower)
      );
    }

    // Apply filters
    if (filters.status && filters.status !== 'all') {
      results = results.filter(referral => referral.status === filters.status);
    }

    if (filters.type && filters.type !== 'all') {
      results = results.filter(referral => referral.type === filters.type);
    }

    if (filters.urgency && filters.urgency !== 'all') {
      results = results.filter(referral => referral.urgency === filters.urgency);
    }

    if (filters.dateRange) {
      const { start, end } = filters.dateRange;
      results = results.filter(referral => {
        const referralDate = new Date(referral.createdAt);
        return referralDate >= new Date(start) && referralDate <= new Date(end);
      });
    }

    return results;
  }

  // Document attachment methods
  async attachDocument(referralId, documentData) {
    await this.simulateDelay(500);
    
    const referral = this.referrals.find(r => r.id === referralId);
    if (!referral) throw new Error('Referral not found');

    const document = {
      id: `DOC-${String(Date.now()).slice(-3).padStart(3, '0')}`,
      referralId,
      ...documentData,
      uploadedAt: new Date().toISOString()
    };

    this.documents.push(document);
    referral.attachments = referral.attachments || [];
    referral.attachments.push(document.filename);

    await this.logAuditEvent('document_attached', referralId);
    return document;
  }

  async getReferralDocuments(referralId) {
    await this.simulateDelay(300);
    return this.documents.filter(doc => doc.referralId === referralId);
  }

  // Audit logging
  async logAuditEvent(action, referralId, metadata = {}) {
    const auditLog = {
      timestamp: new Date().toISOString(),
      action,
      referralId,
      userId: 'current-user-id',
      metadata
    };
    
    console.log('Referral Audit Log:', auditLog);
    return auditLog;
  }

  // Utility methods
  simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Batch operations
  async batchUpdateReferrals(referralIds, updates) {
    await this.simulateDelay(800);
    
    const results = [];
    for (const id of referralIds) {
      try {
        const updated = await this.updateReferral(id, updates);
        results.push({ id, success: true, referral: updated });
      } catch (error) {
        results.push({ id, success: false, error: error.message });
      }
    }
    
    return results;
  }

  async batchUpdateStatus(referralIds, status, notes = '') {
    await this.simulateDelay(600);
    
    const results = [];
    for (const id of referralIds) {
      try {
        const updated = await this.updateReferralStatus(id, status, notes);
        results.push({ id, success: true, referral: updated });
      } catch (error) {
        results.push({ id, success: false, error: error.message });
      }
    }
    
    return results;
  }
}

export const referralService = new ReferralService();