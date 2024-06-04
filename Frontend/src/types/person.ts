export type Person = {
  id: number
  name: string
  phoneNumber: string
  licensePlate?: string
  role: 'Employee' | 'Customer' | 'Secretary' | 'Admin'
}