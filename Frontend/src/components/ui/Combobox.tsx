'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn, extractEmplId } from '../../lib/utils'
import { Button } from './button-shadcn'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from './command'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { useEmployeeSearch } from '../../hooks/useEmployeeSearch'
import { Person } from '../../types/person'
import { useEffect, useState } from 'react'
import personAPI from '../../api/PersonAPI'

interface ComboboxProps {
  setSelectedEmplId: React.Dispatch<React.SetStateAction<number | undefined>>
}

// const employees = [
//   {
//     value: '2 - Obama Barak - developer',
//     label: 'Obama Barak - developer',
//   },
//   {
//     value: '1 - Homer Simpson - owner',
//     label: 'Homer Simpson - owner',
//   },
//   {
//     value: '3 - Candy Man - sales man',
//     label: 'Candy Man - sales man',
//   },
//   {
//     value: '4 - Who the fook is that guy? - I dunno',
//     label: 'Who the fook is that guy? - I dunno',
//   },
//   {
//     value: '5 - I ran out of names - unemployed',
//     label: 'I ran out of names - unemployed',
//   },
// ]

export function Combobox({ setSelectedEmplId }: ComboboxProps) {
  const [employees, setEmployees] = useState<Person[]>([])
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const { setEmployee } = useEmployeeSearch()

  useEffect(() => {
    personAPI.getPersons().then((res) => {
      setEmployees(res.people.filter(p => p.role !== 'Customer'))
    })
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[400px] justify-between'
        >
          {value
            ? employees.find(
                (e) => e.name.toLowerCase() === value.toLowerCase()
              )?.name
            : 'No employee selected'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[400px] p-0'>
        <Command>
          <CommandInput placeholder='Search for an employee...' />
          <CommandEmpty>No employee found.</CommandEmpty>
          <CommandGroup>
            {employees.map((e) => (
              <CommandItem
                key={e.id}
                value={e.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue)
                  setSelectedEmplId(e.id)
                  setEmployee(e)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value.toLowerCase() === e.name.toLowerCase()
                      ? 'opacity-100'
                      : 'opacity-0'
                  )}
                />
                {e.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
