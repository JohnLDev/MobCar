// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Page, Container, CarContainer, ModalUser, ModalAdm } from './styles'
import { Button } from '../../components/button'
import ThreeDots from '../../assets/ThreeDots.svg'
import DeleteLater from '../../assets/deletelater.png'
import ModalCar from '../../assets/ModalCar.svg'
import Modal from '../../components/modal'
import { FiX } from 'react-icons/fi'

const Dashboard: React.FC = () => {
  const [isViewMoreModalVisible, setIsViewMoreModalVisible] = useState(false)
  const [isAdmModalVisible, setIsAdmModalVisible] = useState(false)
  return (
    <>
      <Page>
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
                <Modal for='adm'>
                  <ModalAdm>
                    <div className='modal-title'>
                      <div className='title-title'>
                        <img src={ModalCar} alt='carro' />
                        <h3>Title</h3>
                      </div>
                      <button
                        className='invisible-button'
                        onClick={() => setIsAdmModalVisible(false)}
                      >
                        <FiX size={25} color='#000000' />
                      </button>
                    </div>
                  </ModalAdm>
                </Modal>
              ) : null}
            </div>
            <div className='line'></div>
          </div>
          <CarContainer>
            <div className='content'>
              <div className='car'>
                <img src={DeleteLater} alt='carro' className='car-image' />
                <div className='infocar'>
                  <h4>Title</h4>
                  <p>year</p>
                  <button
                    className='invisible-button'
                    onClick={() => setIsViewMoreModalVisible(true)}
                  >
                    <span>View more</span>
                  </button>
                  {isViewMoreModalVisible ? (
                    <Modal for='user'>
                      <ModalUser>
                        <div className='modal-title'>
                          <div className='title-title'>
                            <img src={ModalCar} alt='carro' />
                            <h3>Title</h3>
                          </div>
                          <button
                            className='invisible-button'
                            onClick={() => setIsViewMoreModalVisible(false)}
                          >
                            <FiX size={25} color='#000000' />
                          </button>
                        </div>
                        <img className='foto' src={DeleteLater} alt='carro' />
                        <div className='infos'>
                          <span>info one</span>
                          <span>info two</span>
                          <span>info three</span>
                          <span>info four</span>
                        </div>
                        <div className='buttons'>
                          <Button className='frist' color='#fff'>
                            Option 1
                          </Button>
                          <Button color='#000000'>Option 2</Button>
                        </div>
                      </ModalUser>
                    </Modal>
                  ) : null}
                </div>
              </div>

              <button className='dots'>
                <img src={ThreeDots} alt='3 pontos' />
              </button>
            </div>
            <div className='linebottom'></div>
          </CarContainer>
        </Container>
        <Footer />
      </Page>
    </>
  )
}

export default Dashboard
