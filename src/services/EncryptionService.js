// Simple encryption service without crypto-js dependency
class EncryptionService {
  constructor() {
    this.secretKey = import.meta.env.VITE_REACT_APP_ENCRYPTION_KEY || 'default-key-for-development';
  }

  async encrypt(text) {
    try {
      // Simple base64 encoding for demo (in production, use proper encryption)
      return btoa(text);
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Failed to encrypt data');
    }
  }

  async decrypt(encryptedText) {
    try {
      // Simple base64 decoding for demo
      return atob(encryptedText);
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Failed to decrypt data');
    }
  }

  async hashData(data) {
    try {
      // Simple hash for demo (in production, use proper hashing)
      let hash = 0;
      for (let i = 0; i < data.length; i++) {
        const char = data.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return hash.toString(36);
    } catch (error) {
      console.error('Hashing failed:', error);
      throw new Error('Failed to hash data');
    }
  }

  generateSecureId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // HIPAA-compliant data sanitization
  sanitizePHI(data) {
    const phiFields = [
      'ssn', 'socialSecurityNumber', 'dateOfBirth', 'address', 
      'phoneNumber', 'email', 'medicalRecordNumber', 'accountNumber',
      'certificateNumber', 'vehicleIdentifier', 'deviceIdentifier',
      'webUrl', 'ipAddress', 'biometricIdentifier', 'fullFacePhoto',
      'comparableImage'
    ];

    const sanitized = { ...data };
    
    phiFields.forEach(field => {
      if (sanitized[field]) {
        sanitized[field] = '[REDACTED]';
      }
    });

    return sanitized;
  }
}

export const encryptionService = new EncryptionService();