export interface Record {
    record_status: number;
    created_at: Date; 
    created_by: number;
    updated_at: Date; 
    updated_by: number;
    deleted_at: Date | null;  
    deleted_by: number | null;
  }
  

export enum RecordStatus {
    PINDING = 1,        
    ACTIVE = 2,      
    DELETED = 3,
}
