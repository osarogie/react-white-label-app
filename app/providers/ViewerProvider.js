import React from 'react'

import { database } from '../lib/database'
import { get } from '../lib/request'
import { API } from '../services/ApiService'
import { useState, useEffect } from 'react'
import { AuthModal } from '../views/session/AuthModal'
import Modal from 'antd/lib/modal'
import Loading from '../components/Loading'

let defaultViewer = null

export function ViewerProvider({ expectViewer, children }) {
  if (typeof window !== 'undefined') defaultViewer = window.__VIEWER__

  const [viewer, setViewer] = useState(defaultViewer)
  const hasViewer = !!viewer
  const [refetched, setRefetched] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [, setLoading] = useState(!!defaultViewer)

  useEffect(() => {
    loadViewer()
  }, [1])

  async function loadViewer() {
    const session = await database.getSessionDetails()
    if (!session) return (location.href = '/login')
    const { userId, user } = session

    if (user) {
      setViewer(user)
      setLoading(false)
    }

    if (process.browser && !refetched) {
      const { response, error } = await get(`${API}/api/user/${userId}`)

      if (!error && response && response.status) {
        database.setSessionDetails({
          ...session,
          user: response.data
        })
        setViewer(response.data)
        window.__VIEWER__ = response.data
        setRefetched(true)
        setLoading(false)
      } else {
        // location.href = '/login'
      }
    } else {
      setViewer(window.__VIEWER__)
    }
  }

  // if (expectViewer && !hasViewer && !isLoading) return <LoginRequired />

  function onModalCancel() {
    setModalVisible(false)
  }

  function showModal(message) {
    setMessage(message)
    setModalVisible(true)
  }

  return (
    <ViewerContext.Provider value={{ expectViewer, viewer, showModal }}>
      <>
        {hasViewer ? children : <Loading />}
        <Modal
          centered
          footer={null}
          width={550}
          visible={modalVisible}
          onCancel={onModalCancel}
          destroyOnClose
        >
          <AuthModal message={message} />
        </Modal>
      </>
    </ViewerContext.Provider>
  )
}

export function provideViewer(Component, { requiresViewer = false } = {}) {
  return props => (
    <ViewerProvider expectViewer={requiresViewer}>
      <Component {...props} />
    </ViewerProvider>
  )
}
