class ScheduleService {
  constructor() {
    this.appointments = [
      {
        id: '1',
        title: 'Endodontic Consultation',
        patientName: 'John Smith',
        doctorName: 'Dr. Sarah Wilson',
        start: new Date(2024, 1, 15, 9, 0),
        end: new Date(2024, 1, 15, 10, 0),
        type: 'consultation',
        status: 'confirmed',
        priority: 'normal',
        notes: 'Root canal evaluation'
      },
      {
        id: '2',
        title: 'Oral Surgery Follow-up',
        patientName: 'Emma Davis',
        doctorName: 'Dr. Michael Chen',
        start: new Date(2024, 1, 15, 14, 30),
        end: new Date(2024, 1, 15, 15, 30),
        type: 'follow-up',
        status: 'confirmed',
        priority: 'high',
        notes: 'Post-surgical check'
      },
      {
        id: '3',
        title: 'Periodontal Treatment',
        patientName: 'Robert Taylor',
        doctorName: 'Dr. Lisa Anderson',
        start: new Date(2024, 1, 16, 11, 0),
        end: new Date(2024, 1, 16, 12, 30),
        type: 'treatment',
        status: 'pending',
        priority: 'normal',
        notes: 'Deep cleaning procedure'
      }
    ];
  }

  async getAppointments(date, viewType = 'day') {
    await this.simulateDelay(500);
    
    const startDate = new Date(date);
    const endDate = new Date(date);
    
    if (viewType === 'week') {
      startDate.setDate(startDate.getDate() - startDate.getDay());
      endDate.setDate(startDate.getDate() + 6);
    } else if (viewType === 'month') {
      startDate.setDate(1);
      endDate.setMonth(endDate.getMonth() + 1, 0);
    }

    return this.appointments.filter(apt => {
      const aptDate = new Date(apt.start);
      return aptDate >= startDate && aptDate <= endDate;
    });
  }

  async createAppointment(appointmentData) {
    await this.simulateDelay(800);
    
    const newAppointment = {
      id: Date.now().toString(),
      ...appointmentData,
      status: 'confirmed',
      createdAt: new Date()
    };

    this.appointments.push(newAppointment);
    return newAppointment;
  }

  async updateAppointment(id, updates) {
    await this.simulateDelay(600);
    
    const index = this.appointments.findIndex(apt => apt.id === id);
    if (index !== -1) {
      this.appointments[index] = { ...this.appointments[index], ...updates };
      return this.appointments[index];
    }
    throw new Error('Appointment not found');
  }

  async deleteAppointment(id) {
    await this.simulateDelay(400);
    
    const index = this.appointments.findIndex(apt => apt.id === id);
    if (index !== -1) {
      this.appointments.splice(index, 1);
      return true;
    }
    throw new Error('Appointment not found');
  }

  async getAvailableSlots(doctorId, date) {
    await this.simulateDelay(600);
    
    // Mock available slots
    const slots = [];
    for (let hour = 9; hour < 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const slot = new Date(date);
        slot.setHours(hour, minute, 0, 0);
        
        // Check if slot is available
        const isBooked = this.appointments.some(apt => 
          apt.start <= slot && apt.end > slot
        );
        
        if (!isBooked) {
          slots.push({
            time: slot,
            available: true,
            duration: 30
          });
        }
      }
    }
    
    return slots.slice(0, 20); // Return first 20 available slots
  }

  simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const scheduleService = new ScheduleService();