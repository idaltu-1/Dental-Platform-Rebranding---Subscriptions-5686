class VerificationService {
  constructor() {
    this.verificationQueue = [];
    this.verificationHistory = [];
    this.verificationCache = new Map();
    this.maxRetries = 3;
    this.retryDelay = 1000;
    this.initializeMockData();
    
    // Start periodic cleanup
    this.startPeriodicCleanup();
  }

  // Start periodic cleanup of expired cache entries
  startPeriodicCleanup() {
    setInterval(() => {
      this.clearExpiredCache();
    }, 30 * 60 * 1000); // Every 30 minutes
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
    // Input validation
    const validationErrors = this.validateInsuranceData(patientId, insuranceData);
    if (validationErrors.length > 0) {
      await this.logVerificationEvent('validation_failed', null, {
        errors: validationErrors,
        patientId,
        type: 'insurance'
      });
      return {
        success: false,
        error: 'Validation failed: ' + validationErrors.join(', '),
        validationErrors
      };
    }

    // Check cache first
    const cacheKey = `insurance-${patientId}-${insuranceData.policyNumber}`;
    const cached = this.verificationCache.get(cacheKey);
    if (cached && !this.isCacheExpired(cached)) {
      await this.logVerificationEvent('cache_hit', cached.id, { cacheKey });
      return {
        success: true,
        result: cached,
        fromCache: true
      };
    }

    const verificationId = `VER-${Date.now()}`;
    await this.logVerificationEvent('verification_started', verificationId, {
      type: 'insurance',
      patientId,
      provider: insuranceData.provider
    });

    try {
      const result = await this.retryWithBackoff(async () => {
        return await this.performInsuranceVerification(patientId, insuranceData, verificationId);
      });

      // Cache the result
      const cacheEntry = {
        ...result,
        cachedAt: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      };
      this.verificationCache.set(cacheKey, cacheEntry);

      await this.logVerificationEvent('verification_completed', verificationId, {
        type: 'insurance',
        success: true,
        cached: true
      });

      return {
        success: true,
        result
      };

    } catch (error) {
      await this.logVerificationEvent('verification_failed', verificationId, {
        type: 'insurance',
        error: error.message,
        patientId
      });

      return {
        success: false,
        error: this.categorizeError(error),
        errorCode: error.code || 'UNKNOWN_ERROR'
      };
    }
  }

  async performInsuranceVerification(patientId, insuranceData, verificationId) {
    await this.simulateDelay(3000); // Simulate API call to insurance provider

    // Simulate potential network failures
    if (Math.random() < 0.1) { // 10% chance of network error
      const error = new Error('Network timeout connecting to insurance provider');
      error.code = 'NETWORK_TIMEOUT';
      throw error;
    }

    const verificationResult = {
      id: verificationId,
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
      },
      verificationScore: Math.floor(Math.random() * 20) + 80, // 80-100
      riskLevel: this.calculateRiskLevel(insuranceData)
    };

    // Add to history
    this.verificationHistory.unshift(verificationResult);

    // Remove from queue if it was there
    this.verificationQueue = this.verificationQueue.filter(v => 
      !(v.patientId === patientId && v.type === 'insurance')
    );

    return verificationResult;
  }

  // Patient Identity Verification
  async verifyPatientIdentity(patientId, identityData) {
    // Input validation
    const validationErrors = this.validateIdentityData(patientId, identityData);
    if (validationErrors.length > 0) {
      await this.logVerificationEvent('validation_failed', null, {
        errors: validationErrors,
        patientId,
        type: 'patient_identity'
      });
      return {
        success: false,
        error: 'Validation failed: ' + validationErrors.join(', '),
        validationErrors
      };
    }

    // Check cache first
    const cacheKey = `identity-${patientId}-${identityData.documentType}`;
    const cached = this.verificationCache.get(cacheKey);
    if (cached && !this.isCacheExpired(cached)) {
      await this.logVerificationEvent('cache_hit', cached.id, { cacheKey });
      return {
        success: true,
        result: cached,
        fromCache: true
      };
    }

    const verificationId = `VER-${Date.now()}`;
    await this.logVerificationEvent('verification_started', verificationId, {
      type: 'patient_identity',
      patientId,
      documentType: identityData.documentType
    });

    try {
      const result = await this.retryWithBackoff(async () => {
        return await this.performIdentityVerification(patientId, identityData, verificationId);
      });

      // Cache the result
      const cacheEntry = {
        ...result,
        cachedAt: new Date(),
        expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000) // 12 hours
      };
      this.verificationCache.set(cacheKey, cacheEntry);

      await this.logVerificationEvent('verification_completed', verificationId, {
        type: 'patient_identity',
        success: true,
        cached: true
      });

      return {
        success: true,
        result
      };

    } catch (error) {
      await this.logVerificationEvent('verification_failed', verificationId, {
        type: 'patient_identity',
        error: error.message,
        patientId
      });

      return {
        success: false,
        error: this.categorizeError(error),
        errorCode: error.code || 'UNKNOWN_ERROR'
      };
    }
  }

  async performIdentityVerification(patientId, identityData, verificationId) {
    await this.simulateDelay(2000);

    // Simulate potential failures
    if (Math.random() < 0.05) { // 5% chance of service error
      const error = new Error('Identity verification service unavailable');
      error.code = 'SERVICE_UNAVAILABLE';
      throw error;
    }

    const verificationResult = {
      id: verificationId,
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
        addressVerified: Math.random() > 0.3,
        fraudRisk: this.calculateFraudRisk(),
        confidenceLevel: this.calculateConfidenceLevel()
      },
      verificationScore: Math.floor(Math.random() * 20) + 80,
      riskLevel: this.calculateRiskLevel(identityData)
    };

    this.verificationHistory.unshift(verificationResult);
    
    return verificationResult;
  }

  // Document Verification
  async verifyDocument(documentId, documentData) {
    // Input validation
    const validationErrors = this.validateDocumentData(documentId, documentData);
    if (validationErrors.length > 0) {
      await this.logVerificationEvent('validation_failed', null, {
        errors: validationErrors,
        documentId,
        type: 'document'
      });
      return {
        success: false,
        error: 'Validation failed: ' + validationErrors.join(', '),
        validationErrors
      };
    }

    // Check cache first
    const cacheKey = `document-${documentId}-${documentData.type}`;
    const cached = this.verificationCache.get(cacheKey);
    if (cached && !this.isCacheExpired(cached)) {
      await this.logVerificationEvent('cache_hit', cached.id, { cacheKey });
      return {
        success: true,
        result: cached,
        fromCache: true
      };
    }

    const verificationId = `VER-${Date.now()}`;
    await this.logVerificationEvent('verification_started', verificationId, {
      type: 'document',
      documentId,
      documentType: documentData.type
    });

    try {
      const result = await this.retryWithBackoff(async () => {
        return await this.performDocumentVerification(documentId, documentData, verificationId);
      });

      // Cache the result
      const cacheEntry = {
        ...result,
        cachedAt: new Date(),
        expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000) // 6 hours
      };
      this.verificationCache.set(cacheKey, cacheEntry);

      await this.logVerificationEvent('verification_completed', verificationId, {
        type: 'document',
        success: true,
        cached: true
      });

      return {
        success: true,
        result
      };

    } catch (error) {
      await this.logVerificationEvent('verification_failed', verificationId, {
        type: 'document',
        error: error.message,
        documentId
      });

      return {
        success: false,
        error: this.categorizeError(error),
        errorCode: error.code || 'UNKNOWN_ERROR'
      };
    }
  }

  async performDocumentVerification(documentId, documentData, verificationId) {
    await this.simulateDelay(1500);

    // Simulate potential failures
    if (Math.random() < 0.03) { // 3% chance of processing error
      const error = new Error('Document processing failed');
      error.code = 'DOCUMENT_PROCESSING_ERROR';
      throw error;
    }

    const verificationResult = {
      id: verificationId,
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
        },
        metadata: {
          fileSize: Math.floor(Math.random() * 5000) + 1000,
          format: 'PDF',
          pages: Math.floor(Math.random() * 3) + 1,
          encrypted: Math.random() > 0.7
        }
      },
      verificationScore: Math.floor(Math.random() * 20) + 80,
      riskLevel: this.calculateRiskLevel(documentData)
    };

    this.verificationHistory.unshift(verificationResult);
    
    return verificationResult;
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
  async batchVerify(verificationIds, onProgress = null) {
    const batchId = `BATCH-${Date.now()}`;
    await this.logVerificationEvent('batch_verification_started', batchId, {
      totalItems: verificationIds.length,
      verificationIds
    });

    try {
      const results = [];
      const errors = [];
      
      for (let i = 0; i < verificationIds.length; i++) {
        const id = verificationIds[i];
        const verification = this.verificationQueue.find(v => v.id === id);
        
        // Progress callback
        if (onProgress) {
          onProgress({
            current: i + 1,
            total: verificationIds.length,
            percentage: Math.round(((i + 1) / verificationIds.length) * 100),
            currentItem: verification?.patientName || id
          });
        }
        
        if (verification) {
          try {
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
            
          } catch (error) {
            errors.push({
              id,
              error: error.message,
              type: verification.type
            });
            
            results.push({
              id,
              success: false,
              error: error.message
            });
          }
        } else {
          errors.push({
            id,
            error: 'Verification not found in queue'
          });
          
          results.push({
            id,
            success: false,
            error: 'Verification not found in queue'
          });
        }
      }

      const successCount = results.filter(r => r.success).length;
      const failureCount = results.length - successCount;

      await this.logVerificationEvent('batch_verification_completed', batchId, {
        totalItems: verificationIds.length,
        successCount,
        failureCount,
        errors: errors.length > 0 ? errors : undefined
      });

      return {
        success: true,
        results,
        summary: {
          total: verificationIds.length,
          successful: successCount,
          failed: failureCount,
          errors: errors.length > 0 ? errors : undefined
        }
      };

    } catch (error) {
      await this.logVerificationEvent('batch_verification_failed', batchId, {
        error: error.message,
        totalItems: verificationIds.length
      });
      
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

  // Input validation methods
  validateInsuranceData(patientId, insuranceData) {
    const errors = [];
    
    if (!patientId || typeof patientId !== 'string') {
      errors.push('Valid patient ID is required');
    }
    
    if (!insuranceData || typeof insuranceData !== 'object') {
      errors.push('Insurance data is required');
    } else {
      if (!insuranceData.provider || typeof insuranceData.provider !== 'string') {
        errors.push('Insurance provider is required');
      }
      if (!insuranceData.policyNumber || typeof insuranceData.policyNumber !== 'string') {
        errors.push('Policy number is required');
      }
      if (insuranceData.policyNumber && insuranceData.policyNumber.length < 6) {
        errors.push('Policy number must be at least 6 characters');
      }
    }
    
    return errors;
  }

  validateIdentityData(patientId, identityData) {
    const errors = [];
    
    if (!patientId || typeof patientId !== 'string') {
      errors.push('Valid patient ID is required');
    }
    
    if (!identityData || typeof identityData !== 'object') {
      errors.push('Identity data is required');
    } else {
      if (!identityData.documentType || typeof identityData.documentType !== 'string') {
        errors.push('Document type is required');
      }
      
      const validDocTypes = ['Driver License', 'Passport', 'State ID', 'Military ID'];
      if (identityData.documentType && !validDocTypes.includes(identityData.documentType)) {
        errors.push('Invalid document type');
      }
    }
    
    return errors;
  }

  validateDocumentData(documentId, documentData) {
    const errors = [];
    
    if (!documentId || typeof documentId !== 'string') {
      errors.push('Valid document ID is required');
    }
    
    if (!documentData || typeof documentData !== 'object') {
      errors.push('Document data is required');
    } else {
      if (!documentData.type || typeof documentData.type !== 'string') {
        errors.push('Document type is required');
      }
      
      const validTypes = ['medical_record', 'insurance_card', 'id_document', 'treatment_plan'];
      if (documentData.type && !validTypes.includes(documentData.type)) {
        errors.push('Invalid document type');
      }
    }
    
    return errors;
  }

  // Enhanced logging with structured data
  async logVerificationEvent(event, verificationId, metadata = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      verificationId,
      userId: 'current-user-id',
      sessionId: this.getSessionId(),
      level: this.getLogLevel(event),
      metadata: {
        ...metadata,
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
        ip: 'masked' // In production, would get actual IP
      }
    };
    
    // In production, this would send to a logging service
    console.log(`[${logEntry.level}] Verification Event:`, JSON.stringify(logEntry, null, 2));
    return logEntry;
  }

  getLogLevel(event) {
    const levels = {
      'verification_requested': 'INFO',
      'verification_started': 'INFO',
      'verification_completed': 'INFO',
      'verification_failed': 'ERROR',
      'verification_retry': 'WARN',
      'batch_verification_started': 'INFO',
      'batch_verification_completed': 'INFO'
    };
    return levels[event] || 'INFO';
  }

  getSessionId() {
    if (!this.sessionId) {
      this.sessionId = `sess-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    return this.sessionId;
  }

  // Retry mechanism with exponential backoff
  async retryWithBackoff(operation, maxRetries = this.maxRetries, delay = this.retryDelay) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        
        if (attempt === maxRetries) {
          await this.logVerificationEvent('verification_failed', null, {
            error: error.message,
            attempts: attempt
          });
          break;
        }
        
        const backoffDelay = delay * Math.pow(2, attempt - 1);
        await this.logVerificationEvent('verification_retry', null, {
          attempt,
          maxRetries,
          nextRetryIn: backoffDelay,
          error: error.message
        });
        
        await this.simulateDelay(backoffDelay);
      }
    }
    
    throw lastError;
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

  // Helper methods
  getEstimatedTime(type) {
    const times = {
      insurance: '10-15 minutes',
      patient_identity: '3-5 minutes',
      document: '5-8 minutes'
    };
    return times[type] || '5-10 minutes';
  }

  // Cache management
  isCacheExpired(cacheEntry) {
    if (!cacheEntry.expiresAt) return true;
    return new Date() > new Date(cacheEntry.expiresAt);
  }

  clearExpiredCache() {
    const now = new Date();
    let removedCount = 0;
    
    for (const [key, entry] of this.verificationCache.entries()) {
      if (this.isCacheExpired(entry)) {
        this.verificationCache.delete(key);
        removedCount++;
      }
    }
    
    if (removedCount > 0) {
      console.log(`Cleared ${removedCount} expired cache entries`);
    }
    
    return removedCount;
  }

  getCacheStats() {
    const totalEntries = this.verificationCache.size;
    let expiredEntries = 0;
    
    for (const [, entry] of this.verificationCache.entries()) {
      if (this.isCacheExpired(entry)) {
        expiredEntries++;
      }
    }
    
    return {
      totalEntries,
      expiredEntries,
      activeEntries: totalEntries - expiredEntries,
      hitRate: this.calculateCacheHitRate()
    };
  }

  calculateCacheHitRate() {
    // This would be tracked in a real implementation
    return Math.floor(Math.random() * 30) + 70; // Mock 70-100% hit rate
  }

  // Error categorization
  categorizeError(error) {
    const errorMap = {
      'NETWORK_TIMEOUT': 'Network connection failed. Please try again.',
      'SERVICE_UNAVAILABLE': 'Verification service is temporarily unavailable.',
      'DOCUMENT_PROCESSING_ERROR': 'Unable to process document. Please check file format.',
      'VALIDATION_ERROR': 'Invalid input data provided.',
      'RATE_LIMIT_EXCEEDED': 'Too many requests. Please wait before retrying.',
      'AUTHENTICATION_FAILED': 'Authentication failed. Please check credentials.',
      'UNKNOWN_ERROR': 'An unexpected error occurred. Please contact support.'
    };
    
    return errorMap[error.code] || error.message || 'Unknown error occurred';
  }

  // Risk assessment
  calculateRiskLevel(data) {
    let riskScore = 0;
    
    // Basic risk scoring logic
    if (data.provider && data.provider.toLowerCase().includes('unknown')) riskScore += 20;
    if (data.policyNumber && data.policyNumber.length < 8) riskScore += 10;
    if (data.documentType && data.documentType === 'temporary') riskScore += 15;
    
    if (riskScore >= 30) return 'high';
    if (riskScore >= 15) return 'medium';
    return 'low';
  }

  calculateFraudRisk() {
    const risk = Math.random();
    if (risk < 0.05) return 'high';
    if (risk < 0.2) return 'medium';
    return 'low';
  }

  calculateConfidenceLevel() {
    return Math.floor(Math.random() * 20) + 80; // 80-100%
  }

  // Search and filtering
  searchVerificationHistory(searchTerm, filters = {}) {
    let results = [...this.verificationHistory];
    
    // Text search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(item => 
        item.patientName?.toLowerCase().includes(term) ||
        item.type?.toLowerCase().includes(term) ||
        item.insuranceProvider?.toLowerCase().includes(term) ||
        item.id?.toLowerCase().includes(term)
      );
    }
    
    // Apply filters
    if (filters.type) {
      results = results.filter(item => item.type === filters.type);
    }
    
    if (filters.status) {
      results = results.filter(item => item.status === filters.status);
    }
    
    if (filters.dateRange) {
      const { start, end } = filters.dateRange;
      results = results.filter(item => {
        const itemDate = new Date(item.verifiedAt || item.completedAt);
        return itemDate >= start && itemDate <= end;
      });
    }
    
    if (filters.riskLevel) {
      results = results.filter(item => item.riskLevel === filters.riskLevel);
    }
    
    return results;
  }

  searchVerificationQueue(searchTerm, filters = {}) {
    let results = [...this.verificationQueue];
    
    // Text search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(item => 
        item.patientName?.toLowerCase().includes(term) ||
        item.type?.toLowerCase().includes(term) ||
        item.insuranceProvider?.toLowerCase().includes(term) ||
        item.id?.toLowerCase().includes(term)
      );
    }
    
    // Apply filters
    if (filters.type) {
      results = results.filter(item => item.type === filters.type);
    }
    
    if (filters.status) {
      results = results.filter(item => item.status === filters.status);
    }
    
    if (filters.priority) {
      results = results.filter(item => item.priority === filters.priority);
    }
    
    return results;
  }

  // Verification expiration and refresh
  async refreshVerification(verificationId) {
    try {
      const verification = this.verificationHistory.find(v => v.id === verificationId);
      
      if (!verification) {
        throw new Error('Verification not found');
      }
      
      // Check if refresh is needed (older than 24 hours)
      const age = Date.now() - new Date(verification.verifiedAt).getTime();
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours
      
      if (age < maxAge) {
        return {
          success: true,
          message: 'Verification is still valid',
          verification
        };
      }
      
      // Refresh the verification
      let refreshResult;
      switch (verification.type) {
        case 'insurance':
          refreshResult = await this.verifyInsurance(verification.patientId, {
            provider: verification.provider,
            policyNumber: verification.policyNumber
          });
          break;
        case 'patient_identity':
          refreshResult = await this.verifyPatientIdentity(verification.patientId, {
            documentType: verification.identity.documentType,
            documentNumber: verification.identity.documentNumber
          });
          break;
        case 'document':
          refreshResult = await this.verifyDocument(verification.documentId, {
            type: verification.document.type
          });
          break;
        default:
          throw new Error('Unknown verification type');
      }
      
      await this.logVerificationEvent('verification_refreshed', verificationId, {
        originalDate: verification.verifiedAt,
        refreshedDate: new Date()
      });
      
      return refreshResult;
      
    } catch (error) {
      await this.logVerificationEvent('refresh_failed', verificationId, {
        error: error.message
      });
      
      return {
        success: false,
        error: error.message
      };
    }
  }

  simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const verificationService = new VerificationService();