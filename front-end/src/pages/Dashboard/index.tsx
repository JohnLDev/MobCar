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

const Dashboard: React.FC = () => {
  const [isViewMoreModalVisible, setIsViewMoreModalVisible] = useState(false)
  const [isAdmModalVisible, setIsAdmModalVisible] = useState(false)
  const [isMiniModalVisible, setIsMiniModalVisible] = useState(false)
  const [isEditModalVisible, setEditModalVisible] = useState(false)
  const [miniModalVisible, setMiniModalVisible] = useState(0)
  const [cars, setCars] = useState<Car[]>([])

  useEffect(() => {
    api.get('/car/index').then(response => {
      setCars(response.data)
    })
  }, [])

  function handleOpenMiniModal(id: number): void {
    setIsMiniModalVisible(true)
    setMiniModalVisible(id)
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
              <Button
                onClick={() => setIsAdmModalVisible(true)}
                color='#000000'
              >
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
                      onClick={() => setIsViewMoreModalVisible(true)}
                    >
                      <span>View more</span>
                    </button>
                    {isViewMoreModalVisible ? (
                      <UserModal
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
                        setIsViewMoreModalVisible(true)
                        setIsMiniModalVisible(false)
                      }}
                    >
                      View
                    </li>
                    <li
                      onClick={() => {
                        setEditModalVisible(true)
                        setIsMiniModalVisible(false)
                      }}
                    >
                      Edit
                    </li>

                    <li>Delete</li>
                  </ModalOptions>
                ) : null}
                {isEditModalVisible ? (
                  <AdmModal
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
