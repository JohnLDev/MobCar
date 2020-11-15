/* eslint-disable react/prop-types */
// eslint-disable-next-line no-use-before-define
import React, { useState, useEffect, FormEvent } from 'react'
import { FiX } from 'react-icons/fi'
import { ModalDiv, ModalAdm } from './styles'
import ModalCar from '../../assets/ModalCar.svg'
import { Input, SelectInput } from '../input'
import { Button } from '../button'
import Car from '../../dtos/CarDTO'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'

interface ModalProps {
  to: 'Add' | 'Edit'
  OnClose(): void
  car?: Car
}
const ModalTest: React.FC<ModalProps> = ({ OnClose, to: For, car }) => {
  const { push } = useHistory()
  const [url, setUrl] = useState('')
  const [model, setModel] = useState('')
  const [board, setBoard] = useState('')
  const [color, setColor] = useState('')
  const [observations, setObservations] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    if (car && For === 'Edit') {
      setBoard(car.board)
      setModel(car.model)
      setColor(car.color)
      setObservations(car.observations)
      setUrl(car.url)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  function handleClose(): void {
    setBoard('')
    setModel('')
    setColor('')
    setObservations('')
    setUrl('')
    setCategory('')
    OnClose()
  }

  async function handleSubmitNewCar(event: FormEvent): Promise<void> {
    switch (category) {
      case 'Category':
        toast.error('inform the car category')
        return
      case 'Default':
        console.log('oi')
        setCategory('padrao')
        break
      case 'Executive':
        setCategory('executivo')
        break
      case 'Vip':
        setCategory('vip')
        break
    }
    if (category === 'Default') {
      setCategory('padrao')
    }
    const data = { model, board, color, observations, category, url }
    const schema = yup.object().shape({
      model: yup.string().required('inform the car model'),
      board: yup.string().required('inform the car board'),
      color: yup.string().required('inform the car color'),
      observations: yup
        .string()
        .max(100)
        .required('inform some observation to car'),
      category: yup.string().required('inform the car category'),
      url: yup.string().required('inform the car image URL'),
    })
    event.preventDefault()
    console.log(data.category)
    try {
      await schema.validate(data)
      await api.post('/car/addcar', data)
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
    toast.success('Car added successfully')
    handleClose()
    push('/')
  }

  return (
    <ModalDiv to={For}>
      <div className='container'>
        <button className='close'></button>
        <div className='content' id='in'>
          {For === 'Add' ? (
            <ModalAdm>
              <div className='modal-title'>
                <div className='title-title'>
                  <img src={ModalCar} alt='carro' />
                  <h3>Add new</h3>
                </div>
                <button className='invisible-button' onClick={OnClose}>
                  <FiX size={25} color='#000000' />
                </button>
              </div>
              <h3 className='modal-title'>Welcome to family</h3>
              <form onSubmit={handleSubmitNewCar}>
                <Input
                  type='text'
                  placeholder='Model'
                  value={model}
                  onChange={({ target: { value } }) => {
                    setModel(value)
                  }}
                />
                <Input
                  type='text'
                  placeholder='Board'
                  value={board}
                  onChange={({ target: { value } }) => {
                    setBoard(value)
                  }}
                />
                <Input
                  type='text'
                  placeholder='Color'
                  value={color}
                  onChange={({ target: { value } }) => {
                    setColor(value)
                  }}
                />
                <Input
                  type='text'
                  placeholder='Observations'
                  value={observations}
                  onChange={({ target: { value } }) => {
                    setObservations(value)
                  }}
                />
                <Input
                  type='text'
                  placeholder='Url'
                  value={url}
                  onChange={({ target: { value } }) => {
                    setUrl(value)
                  }}
                />
                <SelectInput
                  name='select'
                  id='select'
                  onChange={({ target: { value } }) => {
                    setCategory(value)
                  }}
                >
                  <option>Category</option>
                  <option>Default</option>
                  <option>Executive</option>
                  <option>Vip</option>
                </SelectInput>
                <div className='buttons'>
                  <Button
                    className='frist'
                    color='#fff'
                    type='button'
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button color='#000000'>Add Car</Button>
                </div>
              </form>
            </ModalAdm>
          ) : (
            <ModalAdm>
              <div className='modal-title'>
                <div className='title-title'>
                  <img src={ModalCar} alt='carro' />
                  <h3>Edit</h3>
                </div>
                <button className='invisible-button' onClick={OnClose}>
                  <FiX size={25} color='#000000' />
                </button>
              </div>

              <form action=''>
                <div className='car-image-display-div'>
                  <img
                    src={url}
                    alt='Your pic will apear here'
                    className='car-image-display'
                  />
                </div>
                <Input
                  type='text'
                  placeholder='Model'
                  value={model}
                  onChange={({ target: { value } }) => {
                    setModel(value)
                  }}
                />
                <Input
                  type='text'
                  placeholder='Board'
                  value={board}
                  onChange={({ target: { value } }) => {
                    setBoard(value)
                  }}
                />
                <Input
                  type='text'
                  placeholder='Color'
                  value={color}
                  onChange={({ target: { value } }) => {
                    setColor(value)
                  }}
                />
                <Input
                  type='text'
                  placeholder='Observations'
                  value={observations}
                  onChange={({ target: { value } }) => {
                    setObservations(value)
                  }}
                />
                <Input
                  type='text'
                  placeholder='Url'
                  value={url}
                  onChange={({ target: { value } }) => {
                    setUrl(value)
                  }}
                />

                <div className='buttons'>
                  <Button
                    className='frist'
                    color='#fff'
                    type='button'
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button color='#000000'>Save</Button>
                </div>
              </form>
            </ModalAdm>
          )}
        </div>
      </div>
    </ModalDiv>
  )
}

export default ModalTest
