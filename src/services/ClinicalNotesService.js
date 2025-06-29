import { encryptionService } from './EncryptionService';

class ClinicalNotesService {
  constructor() {
    this.notes = [];
    this.initializeMockData();
  }

  initializeMockData() {
    this.notes = [
      {
        id: '1',
        title: 'Initial Endodontic Consultation',
        content: 'Chief Complaint: Patient presents with severe throbbing pain in upper right quadrant, particularly tooth #3.\n\nClinical Findings:\n- Deep carious lesion on mesial surface of tooth #3\n- Positive response to cold test\n- Percussion sensitivity present\n- Periapical radiolucency noted on radiograph\n\nDiagnosis: Irreversible pulpitis with symptomatic apical periodontitis, tooth #3\n\nTreatment Plan: Root canal therapy recommended for tooth #3 with subsequent crown restoration',
        type: 'consultation',
        status: 'final',
        patientId: 'P001',
        patientName: 'John Smith',
        author: 'Dr. Sarah Wilson',
        authorId: 'D001',
        tags: ['endodontic', 'consultation', 'tooth-3', 'root-canal'],
        priority: 'high',
        createdAt: new Date('2024-01-15T10:30:00'),
        updatedAt: new Date('2024-01-15T10:45:00'),
        referralId: 'R001'
      },
      {
        id: '2',
        title: 'Periodontal Examination - Follow-up',
        content: 'Follow-up Assessment: Patient returns for 3-month periodontal maintenance following initial therapy.\n\nFindings:\n- Improved gingival health overall\n- Reduced bleeding on probing\n- Pocket depths stable at 2-4mm\n- Good oral hygiene compliance\n\nRecommendations: Continue current oral hygiene regimen. Schedule next maintenance in 3 months.',
        type: 'follow-up',
        status: 'final',
        patientId: 'P002',
        patientName: 'Sarah Johnson',
        author: 'Dr. Michael Chen',
        authorId: 'D002',
        tags: ['periodontal', 'maintenance', 'follow-up'],
        priority: 'normal',
        createdAt: new Date('2024-01-18T14:20:00'),
        updatedAt: new Date('2024-01-18T14:35:00'),
        referralId: 'R002'
      },
      {
        id: '3',
        title: 'Treatment Plan - Comprehensive Restoration',
        content: 'Comprehensive Treatment Plan: Patient presents for full mouth rehabilitation following periodontal therapy.\n\nProposed Treatment:\n- Crown restoration tooth #3 (post-RCT)\n- Crown restoration tooth #14 (large MOD restoration)\n- Bridge #18-#20 (replace missing #19)\n- Implant placement site #30\n\nSequence:\n1. Complete healing from periodontal therapy (6 weeks)\n2. Implant placement #30\n3. Crown preparations #3, #14\n4. Bridge preparation #18-#20\n5. Final restorations after implant integration',
        type: 'treatment-plan',
        status: 'final',
        patientId: 'P004',
        patientName: 'Lisa Anderson',
        author: 'Dr. Robert Taylor',
        authorId: 'D004',
        tags: ['treatment-plan', 'comprehensive', 'crown', 'bridge', 'implant'],
        priority: 'normal',
        createdAt: new Date('2024-01-25T13:30:00'),
        updatedAt: new Date('2024-01-25T14:15:00'),
        referralId: 'R004'
      }
    ];
  }

  async getNotes() {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return [...this.notes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      console.error('Failed to get notes:', error);
      throw error;
    }
  }

  async createNote(noteData) {
    try {
      const newNote = {
        id: Date.now().toString(),
        ...noteData,
        author: 'Current User',
        authorId: 'current-user-id',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      this.notes.unshift(newNote);
      await this.logAuditEvent('note_created', newNote.id);
      
      return newNote;
    } catch (error) {
      console.error('Failed to create note:', error);
      throw error;
    }
  }

  async updateNote(id, noteData) {
    try {
      const noteIndex = this.notes.findIndex(n => n.id === id);
      if (noteIndex === -1) {
        throw new Error('Note not found');
      }

      const updatedNote = {
        ...this.notes[noteIndex],
        ...noteData,
        updatedAt: new Date()
      };

      this.notes[noteIndex] = updatedNote;
      await this.logAuditEvent('note_updated', id);
      
      return updatedNote;
    } catch (error) {
      console.error('Failed to update note:', error);
      throw error;
    }
  }

  async deleteNote(id) {
    try {
      const noteIndex = this.notes.findIndex(n => n.id === id);
      if (noteIndex === -1) {
        throw new Error('Note not found');
      }

      this.notes.splice(noteIndex, 1);
      await this.logAuditEvent('note_deleted', id);
      
      return true;
    } catch (error) {
      console.error('Failed to delete note:', error);
      throw error;
    }
  }

  async exportNotes(notes) {
    try {
      const sanitizedNotes = notes.map(note => ({
        ID: note.id,
        Title: note.title,
        Type: note.type,
        Status: note.status,
        'Patient Name': note.patientName,
        'Patient ID': note.patientId,
        Author: note.author,
        Tags: note.tags.join(', '),
        Priority: note.priority,
        'Created Date': new Date(note.createdAt).toLocaleDateString(),
        Content: note.content.substring(0, 500)
      }));

      // Create CSV content
      const headers = Object.keys(sanitizedNotes[0]);
      const csvContent = [
        headers.join(','),
        ...sanitizedNotes.map(note => 
          headers.map(header => `"${note[header] || ''}"`).join(',')
        )
      ].join('\n');

      // Download CSV
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `clinical-notes-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);

      await this.logAuditEvent('notes_exported', null, { count: notes.length });
      
      return true;
    } catch (error) {
      console.error('Failed to export notes:', error);
      throw error;
    }
  }

  async getTemplates() {
    return [
      {
        id: 'endodontic-consultation',
        title: 'Endodontic Consultation',
        type: 'consultation',
        content: `Chief Complaint:
[Patient's primary concern in their own words]

History of Present Illness:
[Duration, character, and progression of symptoms]

Clinical Examination:
- Extraoral examination: [findings]
- Intraoral examination: [findings]  
- Percussion test: [results]
- Palpation: [results]
- Thermal testing: [results]

Radiographic Findings:
[Description of radiographic findings]

Diagnosis:
[Primary and differential diagnoses]

Treatment Plan:
[Recommended treatment options with rationale]

Prognosis:
[Expected outcome and factors affecting prognosis]`
      },
      {
        id: 'progress-note',
        title: 'Progress Note',
        type: 'progress-note',
        content: `Date: [Date of appointment]
Treatment: [Procedure performed]

Subjective:
[Patient's reported symptoms and concerns]

Objective:
- Clinical findings: [observations]
- Vital signs: [if applicable]
- Intraoral examination: [relevant findings]

Assessment:
[Clinical impression and progress evaluation]

Plan:
- Treatment completed: [procedures performed]
- Next appointment: [planned procedures]  
- Home care instructions: [patient instructions]
- Medications prescribed: [if any]

Patient Response:
[Patient's tolerance and response to treatment]`
      }
    ];
  }

  async logAuditEvent(action, noteId, metadata = {}) {
    try {
      const auditLog = {
        timestamp: new Date(),
        action,
        noteId,
        userId: 'current-user-id',
        metadata
      };

      console.log('Audit Log:', auditLog);
      return auditLog;
    } catch (error) {
      console.error('Failed to log audit event:', error);
    }
  }
}

export const clinicalNotesService = new ClinicalNotesService();