export interface Employee {
  id: number
  first_name: string
  last_name: string
  name: string
  display_name: string
  date_of_birth?: Date
  avatar_url?: string
  personal_phone_number: string
  work_email: string
  job_title?: string
  department: string
  hire_date?: Date
  manager_id?: number
  start_date?: Date
  tenure?: number // calculated in years
  work_anniversary?: Date
  manager?: {
    job_title?: string
    first_name: string
    last_name: string
  }
}

export interface BambooEmployee {
  id: number
  displayName: string
  preferredName: string
  department: string
  isPhotoUploaded: boolean | string
  startDate: string
  workEmail: string
  mobilePhone: string
  dateOfBirth: Date
  firstName: string
  lastName: string
  supervisorEId: number
  jobTitle: string
  hireDate: Date
  terminationDate: Date
}
