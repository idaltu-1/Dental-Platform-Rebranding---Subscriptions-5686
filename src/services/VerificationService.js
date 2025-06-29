class VerificationService {
  constructor() {
    this.verificationQueue = [];
    this.verificationHistory = [];
    this.initializeMockData();
  }

  initializeMockData() {
    this.verificationQueue = [
      {
        id: 'VER-001',
        type: 'insurance',
        status: 'pending',
        priority: 'high',
        patientId: 'P001',
        patientName: 'John Smith',
        insuranceProvider: 'Blue Cross Blue Shield',
        policyNumber: 'BC123456789',
        requestedBy: 'Dr. Sarah Wilson',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        estimatedTime: '15 minutes',
        metadata: {
          treatmentType: 'Root Canal',
          estimatedCost: 1200,
          preAuthRequired: true
        }
      },
      {
        id: 'VER-002',
        type: 'patient_identity',
        status: 'in_progress',
        priority: 'normal',
        patientId: 'P002',
        patientName: 'Emma Davis',
        requestedBy: 'Admin Staff',
        createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        estimatedTime: '5 minutes',
        metadata: {
          documentType: 'Driver License',
          verificationMethod: 'Photo ID'
        }
      }
    ];

    this.verificationHistory = [
      {
        id: 'VER-003',
        type: 'insurance',
        status: 'verified',
        patientName: 'Michael Wilson',
        insuranceProvider: 'Aetna',
        completedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        verifiedBy: 'Insurance Coordinator',
        result: {
          coverage: '80%',
          deductible: '$500',
          remaining: '$200',
          approved: true
        }
      }
    ];
  }

  // Insurance Verification
  async verifyInsurance(patientId, insuranceData) {
    try {
      await this.simulateDelay(3000); // Simulate API call to insurance provider

      const verificationResult = {
        id: `VER-${Date.now()}`,
        patientId,
        type: 'insurance',
        status: 'verified',
        provider: insuranceData.provider,
        policyNumber: insuranceData.policyNumber,
        verifiedAt: new Date(),
        coverage: {
          isActive: true,
          coveragePercentage: Math.random() > 0.2 ? 80 : 0, // 80% success rate
          deductible: 500,
          remainingDeductible: Math.floor(Math.random() * 500),
          annualMaximum: 2000,
          usedBenefits: Math.floor(Math.random() * 1000),
          effectiveDate: new Date('2024-01-01'),
          expirationDate: new Date('2024-12-31')
        },
        preAuthorization: {
          required: Math.random() > 0.5,
          approved: Math.random() > 0.3,
          referenceNumber: `PA-${Date.now()}`
        }
      };

      // Add to history
      this.verificationHistory.unshift(verificationResult);

      // Remove from queue if it was there
      this.verificationQueue = this.verificationQueue.filter(v => 
        !(v.patientId === patientId && v.type === 'insurance')
      );

      await this.logVerificationEvent('insurance_verified', verificationResult.id);

      return {
        success: true,
        result: verificationResult
      };

    } catch (error) {
      console.error('Insurance verification failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Patient Identity Verification
  async verifyPatientIdentity(patientId, identityData) {
    try {
      await this.simulateDelay(2000);

      const verificationResult = {
        id: `VER-${Date.now()}`,
        patientId,
        type: 'patient_identity',
        status: 'verified',
        verifiedAt: new Date(),
        identity: {
          documentType: identityData.documentType,
          documentNumber: identityData.documentNumber,
          verified: Math.random() > 0.1, // 90% success rate
          matchScore: Math.floor(Math.random() * 20) + 80, // 80-100% match
          biometricCheck: Math.random() > 0.2,
          addressVerified: Math.random() > 0.3
        }
      };

      this.verificationHistory.unshift(verificationResult);
      
      await this.logVerificationEvent('identity_verified', verificationResult.id);

      return {
        success: true,
        result: verificationResult
      };

    } catch (error) {
      console.error('Identity verification failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Document Verification
  async verifyDocument(documentId, documentData) {
    try {
      await this.simulateDelay(1500);

      const verificationResult = {
        id: `VER-${Date.now()}`,
        documentId,
        type: 'document',
        status: 'verified',
        verifiedAt: new Date(),
        document: {
          type: documentData.type,
          authentic: Math.random() > 0.05, // 95% success rate
          qualityScore: Math.floor(Math.random() * 20) + 80,
          readabilityScore: Math.floor(Math.random() * 15) + 85,
          completeness: Math.random() > 0.1,
          signatures: {
            present: Math.random() > 0.2,
            valid: Math.random() > 0.1
          }
        }
      };

      this.verificationHistory.unshift(verificationResult);
      
      await this.logVerificationEvent('document_verified', verificationResult.id);

      return {
        success: true,
        result: verificationResult
      };

    } catch (error) {
      console.error('Document verification failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get verification queue
  async getVerificationQueue() {
    await this.simulateDelay(300);
    return this.verificationQueue.sort((a, b) => {
      // Sort by priority first, then by creation date
      const priorityOrder = { high: 3, normal: 2, low: 1 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  }

  // Get verification history
  async getVerificationHistory(limit = 50) {
    await this.simulateDelay(200);
    return this.verificationHistory
      .slice(0, limit)
      .sort((a, b) => new Date(b.verifiedAt || b.completedAt) - new Date(a.verifiedAt || a.completedAt));
  }

  // Add verification request to queue
  async addToVerificationQueue(verificationRequest) {
    try {
      const newRequest = {
        id: `VER-${Date.now()}`,
        ...verificationRequest,
        status: 'pending',
        createdAt: new Date(),
        estimatedTime: this.getEstimatedTime(verificationRequest.type)
      };

      this.verificationQueue.unshift(newRequest);
      
      await this.logVerificationEvent('verification_requested', newRequest.id);

      return {
        success: true,
        request: newRequest
      };

    } catch (error) {
      console.error('Failed to add verification request:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Update verification status
  async updateVerificationStatus(verificationId, status, notes = '') {
    try {
      const verification = this.verificationQueue.find(v => v.id === verificationId);
      
      if (!verification) {
        throw new Error('Verification request not found');
      }

      verification.status = status;
      verification.updatedAt = new Date();
      
      if (notes) {
        verification.notes = notes;
      }

      if (status === 'completed' || status === 'verified') {
        // Move to history
        this.verificationHistory.unshift(verification);
        this.verificationQueue = this.verificationQueue.filter(v => v.id !== verificationId);
      }

      await this.logVerificationEvent('verification_updated', verificationId);

      return {
        success: true,
        verification
      };

    } catch (error) {
      console.error('Failed to update verification:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Batch verification
  async batchVerify(verificationIds) {
    try {
      const results = [];
      
      for (const id of verificationIds) {
        const verification = this.verificationQueue.find(v => v.id === id);
        if (verification) {
          let result;
          
          switch (verification.type) {
            case 'insurance':
              result = await this.verifyInsurance(verification.patientId, {
                provider: verification.insuranceProvider,
                policyNumber: verification.policyNumber
              });
              break;
            case 'patient_identity':
              result = await this.verifyPatientIdentity(verification.patientId, {
                documentType: verification.metadata?.documentType
              });
              break;
            case 'document':
              result = await this.verifyDocument(verification.documentId, {
                type: verification.metadata?.documentType
              });
              break;
            default:
              result = { success: false, error: 'Unknown verification type' };
          }
          
          results.push({
            id,
            ...result
          });
        }
      }

      return {
        success: true,
        results
      };

    } catch (error) {
      console.error('Batch verification failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get verification statistics
  async getVerificationStats() {
    await this.simulateDelay(400);

    const totalVerifications = this.verificationHistory.length;
    const queuedVerifications = this.verificationQueue.length;
    const todayVerifications = this.verificationHistory.filter(v => {
      const today = new Date();
      const verifiedDate = new Date(v.verifiedAt || v.completedAt);
      return verifiedDate.toDateString() === today.toDateString();
    }).length;

    const averageTime = this.calculateAverageVerificationTime();
    const successRate = this.calculateSuccessRate();

    return {
      total: totalVerifications,
      queued: queuedVerifications,
      today: todayVerifications,
      averageTime,
      successRate,
      byType: {
        insurance: this.verificationHistory.filter(v => v.type === 'insurance').length,
        identity: this.verificationHistory.filter(v => v.type === 'patient_identity').length,
        document: this.verificationHistory.filter(v => v.type === 'document').length
      },
      byStatus: {
        verified: this.verificationHistory.filter(v => v.status === 'verified').length,
        failed: this.verificationHistory.filter(v => v.status === 'failed').length,
        pending: this.verificationQueue.filter(v => v.status === 'pending').length,
        in_progress: this.verificationQueue.filter(v => v.status === 'in_progress').length
      }
    };
  }

  // Helper methods
  getEstimatedTime(type) {
    const times = {
      insurance: '10-15 minutes',
      patient_identity: '3-5 minutes',
      document: '5-8 minutes'
    };
    return times[type] || '5-10 minutes';
  }

  calculateAverageVerificationTime() {
    // Mock calculation - in real app, track actual times
    return '12 minutes';
  }

  calculateSuccessRate() {
    const total = this.verificationHistory.length;
    const successful = this.verificationHistory.filter(v => v.status === 'verified').length;
    return total > 0 ? Math.round((successful / total) * 100) : 0;
  }

  async logVerificationEvent(event, verificationId, metadata = {}) {
    const logEntry = {
      timestamp: new Date(),
      event,
      verificationId,
      userId: 'current-user-id',
      metadata
    };
    console.log('Verification Event:', logEntry);
    return logEntry;
  }

  simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const verificationService = new VerificationService();