// eslint-disable-next-line no-use-before-define
import React, { useState, useEffect } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Page, Container, CarContainer, ModalOptions } from './styles'
import { Button } from '../../components/button'
import ThreeDots from '../../assets/ThreeDots.svg'
import AdmModal from '../../components/admModal'
import UserModal from '../../components/userModal'
import api from '../../services/api'
import Car from '../../dtos/CarDTO'
import { useAuth } from '../../hooks/authContext'
import { toast } from 'react-toastify'

const Dashboard: React.FC = () => {
  const [isViewMoreModalVisible, setIsViewMoreModalVisible] = useState(false)
  const [isAdmModalVisible, setIsAdmModalVisible] = useState(false)
  const [isMiniModalVisible, setIsMiniModalVisible] = useState(false)
  const [isEditModalVisible, setEditModalVisible] = useState(false)
  const [miniModalVisible, setMiniModalVisible] = useState(0)
  const [cars, setCars] = useState<Car[]>([])
  const [carToShow, setCarToShow] = useState<Car>({} as Car)
  const { user } = useAuth()

  useEffect(() => {
    api.get('/car/index').then(response => {
      setCars(response.data)
    })
  }, [])

  function handleViewMoreModal(car: Car): void {
    setCarToShow(car)
    setIsViewMoreModalVisible(true)
  }

  function handleOpenMiniModal(id: number): void {
    setIsMiniModalVisible(true)
    setMiniModalVisible(id)
  }

  async function handleDeleteCar(id: number, model: string): Promise<void> {
    console.log(user)
    if (!user || (user && !user.is_Adm)) {
      toast.error('You dont have permission to remove a car')
      return
    }
    const confirm = window.confirm(`Are you sure you want to delete ${model}`)
    if (!confirm) {
      return
    }
    try {
      await api.delete(`/car/delete/${id}`)
    } catch (error) {
      const {
        data: { message },
      } = error.response
      toast.error(message)
      return
    }
    toast.info('Car deleted')
    const newCars = cars.filter(car => car.id !== id)
    setCars(newCars)
  }

  function handleOpenEditModal(car: Car): void {
    if (!user || (user && !user.is_Adm)) {
      toast.error('You dont have permission to edit a car')
      return
    }
    setCarToShow(car)
    setEditModalVisible(true)
  }

  function handleOpenAddModal(): void {
    if (!user || (user && !user.is_Adm)) {
      toast.error('You dont have permission to add a new car')
      return
    }
    setIsAdmModalVisible(true)
  }
  return (
    <>
      <Page
        onClick={() =>
          isMiniModalVisible ? setIsMiniModalVisible(false) : null
        }
      >
        <Header />

        <Container>
          <h2>Cars</h2>
          <div>
            <div className='title'>
              <h5>Choose one</h5>
              <Button onClick={handleOpenAddModal} color='#000000'>
                Add new
              </Button>
              {isAdmModalVisible ? (
                <AdmModal
                  to='Add'
                  OnClose={() => {
                    setIsAdmModalVisible(false)
                  }}
                ></AdmModal>
              ) : null}
            </div>
            <div className='line'></div>
          </div>
          {cars.map(car => (
            <CarContainer key={car.id}>
              <div className='content'>
                <div className='car'>
                  <img src={car.url} alt='carro' className='car-image' />
                  <div className='infocar'>
                    <h4>{car.model}</h4>
                    <p>
                      {car.category === 'padrao'
                        ? 'Default'
                        : car.category === 'executivo'
                        ? 'Executive'
                        : 'Vip'}
                    </p>
                    <button
                      className='invisible-button'
                      onClick={() => handleViewMoreModal(car)}
                    >
                      <span>View more</span>
                    </button>
                    {isViewMoreModalVisible ? (
                      <UserModal
                        car={carToShow}
                        OnClose={() => setIsViewMoreModalVisible(false)}
                      />
                    ) : null}
                  </div>
                </div>

                <button
                  className='dots'
                  onClick={() => handleOpenMiniModal(car.id)}
                >
                  <img src={ThreeDots} alt='3 pontos' />
                </button>
                {isMiniModalVisible && car.id === miniModalVisible ? (
                  <ModalOptions>
                    <li
                      onClick={() => {
                        handleViewMoreModal(car)
                        setIsMiniModalVisible(false)
                      }}
                    >
                      View
                    </li>
                    <li
                      onClick={() => {
                        handleOpenEditModal(car)
                        setIsMiniModalVisible(false)
                      }}
                    >
                      Edit
                    </li>

                    <li
                      onClick={() => {
                        handleDeleteCar(car.id, car.model)
                        setIsMiniModalVisible(false)
                      }}
                    >
                      Delete
                    </li>
                  </ModalOptions>
                ) : null}
                {isEditModalVisible ? (
                  <AdmModal
                    car={carToShow}
                    to='Edit'
                    OnClose={() => {
                      setEditModalVisible(false)
                    }}
                  ></AdmModal>
                ) : null}
              </div>
              <div className='linebottom'></div>
            </CarContainer>
          ))}
        </Container>
        <Footer />
      </Page>
    </>
  )
}

export default Dashboard
