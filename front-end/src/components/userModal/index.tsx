/* eslint-disable react/prop-types */
// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import { ModalDiv, ModalUser } from './styles'
import ModalCar from '../../assets/ModalCar.svg'
import { FiX } from 'react-icons/fi'
import * as yup from 'yup'
import { Button } from '../button'
import { Input } from '../input'
import Car from '../../dtos/CarDTO'
import DateMask from '../../utils/DateMask'
import api from '../../services/api'
import { toast } from 'react-toastify'
import FormatValue from '../../utils/FormatValue'

interface ModalProps {
  OnClose(): void
  car: Car
}

interface Rent {
  price: number
  diffDays: number
}
const UserModal: React.FC<ModalProps> = ({ OnClose, car }) => {
  const [showFields, setShowFields] = useState(false)
  const [date_From, setDateFrom] = useState('')
  const [date_Until, setDateUntil] = useState('')

  async function handleSimulate(id: number): Promise<void> {
    const data = { date_From, date_Until }
    const schema = yup.object().shape({
      date_From: yup
        .string()
        .length(10, 'inform a valid date format')
        .required('inform a date'),
      date_Until: yup
        .string()
        .length(10, 'inform a valid date format')
        .required('inform a date'),
    })
    const [d1, m1, y1] = date_From.split('/')
    const [d2, m2, y2] = date_Until.split('/')
    if (
      d1.length !== 2 ||
      d2.length !== 2 ||
      m1.length !== 2 ||
      m2.length !== 2 ||
      y1.length !== 4 ||
      y2.length !== 4 ||
      parseInt(m1) > 12 ||
      parseInt(m2) > 12 ||
      parseInt(d1) > 31 ||
      parseInt(d2) > 31
    ) {
      toast.error('invalid date format(dd/mm/yyyy)')
      return
    }
    try {
      await schema.validate(data)
      const response = await api.post<Rent>(`/car/rentprice/${id}`, data)
      alert(`
      rent for ${response.data.diffDays}days cost${FormatValue(
        response.data.price,
      )} `)
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.errors.map(error => toast.error(error, {}))
        return
      }

      const {
        data: { message },
      } = error.response
      toast.error(message)
    }
  }
  async function handleRent(id: number): Promise<void> {
    const data = { date_From, date_Until }
    const schema = yup.object().shape({
      date_From: yup
        .string()
        .length(10, 'inform a valid date format')
        .required('inform a date'),
      date_Until: yup
        .string()
        .length(10, 'inform a valid date format')
        .required('inform a date'),
    })

    try {
      await schema.validate(data)
      const response = await api.post(`/car/rent/${id}`, data)
      toast.success(`Success rented by ${response.data.price}`)
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.errors.map(error => toast.error(error, {}))
        return
      }

      const {
        data: { message },
      } = error.response
      toast.error(message)
      return
    }
    OnClose()
  }

  function handleClose(): void {
    setShowFields(false)
    OnClose()
  }
  return (
    <ModalDiv Inputs={showFields}>
      <div className='container'>
        <button className='close'></button>
        <div className='content'>
          <ModalUser>
            <div className='modal-title'>
              <div className='title-title'>
                <img src={ModalCar} alt='carro' />
                <h3>{car.model}</h3>
              </div>
              <button className='invisible-button' onClick={handleClose}>
                <FiX size={25} color='#000000' />
              </button>
            </div>
            <img className='foto' src={car.url} alt='carro' />
            <div className='infos'>
              <span>License plate:{car.board}</span>
              <span>Color:{car.color}</span>
              <span>
                Category:
                {car.category === 'padrao'
                  ? 'Default'
                  : car.category === 'executivo'
                  ? 'Executive'
                  : 'Vip'}
              </span>
              <span>Observations:{car.observations}</span>
            </div>
            {showFields && (
              <>
                <Input
                  type='text'
                  placeholder='From'
                  value={date_From}
                  maxLength={10}
                  onChange={({ target: { value } }) => {
                    setDateFrom(DateMask(value))
                  }}
                />
                <Input
                  type='text'
                  placeholder='Until'
                  maxLength={10}
                  value={date_Until}
                  onChange={({ target: { value } }) => {
                    setDateUntil(DateMask(value))
                  }}
                />
              </>
            )}
            <div className='buttons'>
              <Button
                className='frist'
                color='#fff'
                onClick={() =>
                  showFields ? handleSimulate(car.id) : setShowFields(true)
                }
              >
                Simulate
              </Button>
              <Button
                color='#000000'
                onClick={() =>
                  showFields ? handleRent(car.id) : setShowFields(true)
                }
              >
                Rent
              </Button>
            </div>
          </ModalUser>
        </div>
      </div>
    </ModalDiv>
  )
}

export default UserModal
