import axios from 'axios'
import { type BambooEmployee, type Employee } from '../types/employeeTypes'
import { calculateTenure } from '../utils/date'
import * as crypto from 'crypto'

function md5 (input: string): string {
  const hash = crypto.createHash('md5')
  hash.update(input)
  return hash.digest('hex')
}
export const getPhotoUrl = (email: string): string => {
  const hash = md5(email.toLowerCase().trim())
  return `https://stackone.bamboohr.com/employees/photos/?h=${hash}`
}

const formatResponse = (employee: BambooEmployee): Employee => {
  const tenure = calculateTenure(employee.hireDate, employee.terminationDate)
  const avatar_url = employee.isPhotoUploaded === 'true' || employee.isPhotoUploaded === true ? getPhotoUrl(employee.workEmail) : undefined
  return {
    id: employee.id,
    first_name: employee.firstName,
    last_name: employee.lastName,
    name: employee.preferredName ?? employee.displayName,
    display_name: employee.displayName,
    date_of_birth: employee.dateOfBirth,
    avatar_url,
    personal_phone_number: employee.mobilePhone,
    work_email: employee.workEmail,
    job_title: employee.jobTitle,
    department: employee.department,
    hire_date: employee.hireDate,
    tenure,
    work_anniversary: employee.hireDate,
    manager_id: employee.supervisorEId,
    start_date: employee.hireDate
  }
}

export const getBambooEmployeeData = async (employeeId: number): Promise<Employee> => {
  const apiKey = process.env.BAMBOO_API_KEY

  const fields = ['displayName', 'preferredName', 'department', 'isPhotoUploaded', 'startDate', 'workEmail', 'mobilePhone', 'dateOfBirth', 'firstName', 'lastName', 'supervisorEId', 'jobTitle', 'hireDate', 'terminationDate'].join(',')
  const url = `https://api.bamboohr.com/api/gateway.php/stackone/v1/employees/${employeeId}/?fields=${fields}`

  const response = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${apiKey}:x`).toString('base64')}`
    }
  })

  return formatResponse(response.data as BambooEmployee)
}
